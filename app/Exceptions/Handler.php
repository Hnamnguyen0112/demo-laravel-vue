<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable( function ( Throwable $e, $request ) {
            return $this->renderResponse($e, $request);
        } );
    }

    public function renderResponse($e, $request)
    {
        if ($request->is('api/*')) {
            $statusCode  = 400;
            $errors      = null;
            $message     = __('common.errors_unexpected');

            switch (true) {
                case $e instanceof ValidationException:
                    $message    = __('common.errors_input');
                    $errors     = $e->errors();
                    $statusCode = 422;
                    break;

                case $e instanceof NotFoundHttpException:
                case $e instanceof MethodNotAllowedHttpException:
                case $e instanceof AccessDeniedHttpException:
                case $e instanceof AuthorizationException:
                    $message     = __('common.errors_route');
                    $statusCode  = 404;
                    break;

                case $e instanceof ModelNotFoundException:
                    $message = __('common.errors_data');
                    $statusCode = 404;
                    break;

                // case $e instanceof JWTException:
                // case $e instanceof TokenInvalidException:
                // case $e instanceof TokenBlacklistedException:
                case $e instanceof AuthenticationException:
                    $message = __('common.errors_session');
                    $statusCode = 401;
                    break;

                case $e instanceof ThrottleRequestsException:
                    $message = __('common.errors_many_attempts');
                    //$messageCode = 'request.max_attemps';
                    break;

                case $e instanceof CustomException:
                    $message = $e->getMessage();
                    $statusCode = $e->getCode();
                    break;

                default:
                    break;
            }

            Log::error($e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $message,
                'errors'  => $errors,
                'data' => null,
            ], $statusCode);
        }
    }
}
