<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GroupSwitchController extends Controller
{
    public function index(Request $request)
    {
        return inertia('GroupSwitch/Index', [
            'groups' => $request->user()->groups,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'group_id' => ['required', 'exists:groups,id'],
        ]);

        $group = $request->user()->groups()->findOrFail($request->input('group_id'));

        if (! $request->user()->isInGroup($group)) {
            abort(403);
        }

        $request->session()->put('current_group_id', $group->id);

        return redirect()->route('dashboard');
    }
}
