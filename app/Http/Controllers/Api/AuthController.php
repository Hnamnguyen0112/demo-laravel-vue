<?php

namespace App\Http\Controllers\Api;

use App\Common\Controllers\BaseController;
use App\Repositories\AdminRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
    protected $adminRepository;

    public function __construct(AdminRepository $adminRepository)
    {
        $this->adminRepository = $adminRepository;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return $this->response($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY, __('validation.failed'));
        }
        if (!$token = auth('api')->attempt($credentials, $request->get('remember', false))) {
            return $this->response(null, Response::HTTP_UNAUTHORIZED, __('validation.failed'));
        }

        $user = auth('api')->user() ??
            $this->adminRepository->findByField('email', $request->only('email'))->first();
        return $this->response(array_merge(['token' => $token], $user->toArray()), Response::HTTP_OK);
    }

    public function logout()
    {
        auth('api')->logout();

        return $this->response(null, Response::HTTP_OK);
    }
}
