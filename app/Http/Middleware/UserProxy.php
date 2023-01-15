<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserProxy
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (! $request->user()) {
            return $next($request);
        }

        if ($request->user()->can('user-proxy')) {
            $id = $request->session()->get('user_proxy_id');

            if (! $id) {
                return $next($request);
            }

            $user = User::query()->findOrFail($id);

            Auth::setUser($user);
        }

        session()->forget('current_group_id');

        return $next($request);
    }
}
