<?php

namespace App\Http\Controllers\Api;

use App\Common\Controllers\BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
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
        if (!$token = Auth::guard('api')->attempt($credentials, $request->get('remember', false))) {
            return $this->response(null, Response::HTTP_UNAUTHORIZED, __('validation.failed'));
        }

        return $this->response(['token' => $token], Response::HTTP_OK);
    }

    public function logout()
    {
        Auth::guard('api')->logout();

        return $this->response(null, Response::HTTP_OK);
    }
}
