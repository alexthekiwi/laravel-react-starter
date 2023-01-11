<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserProxyController extends Controller
{
    public function store(Request $request)
    {
        if ($request->user()->cannot('admin')) {
            abort(403);
        }

        $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
        ]);

        session(['user_proxy_id' => $request->input('user_id')]);

        return redirect()->route('dashboard');
    }

    public function destroy(Request $request)
    {
        $request->session()->forget('user_proxy_id');

        return redirect()->route('dashboard');
    }
}
