<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AddGroupToRequest
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
        if (($user = $request->user()) && $group = $user->group()) {
            // Surface the "is_owner" attribute on the group
            $group->setAttribute('is_owner', (bool) $group->getRelationValue('pivot')->is_owner);

            $request->merge([
                'currentGroup' => $group,
            ]);

            // If it's not in the session, add it
            if (! session('current_group_id')) {
                session(['current_group_id' => $group->id]);
            }
        }

        return $next($request);
    }
}
