<?php

namespace App\Http\Middleware;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return string|null
     * @throws AuthenticationException
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            if ($request->is('api/*')) {
                throw new AuthenticationException;
            } else {
                return route('admin.login');
            }
        }
    }
}
