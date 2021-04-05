<?php

namespace App\Http\Controllers\Api;

use App\Common\Controllers\BaseController;
use App\Repositories\AdminRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if (!$token = auth('api')->attempt($credentials, $request->get('remember', false))) {
            return $this->response(null, false, Response::HTTP_UNAUTHORIZED);
        }

        $user = auth('api')->user() ??
            $this->adminRepository->findByField('email', $request->only('email'))->first();
        return $this->response(array_merge(['token' => $token], $user->toArray()));
    }

    public function logout()
    {
        auth('api')->logout();

        return $this->response(null);
    }
}
