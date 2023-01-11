<?php

namespace App\Http\Controllers;

use App\Actions\AddUserToGroup;
use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GroupUserController extends Controller
{
    protected $rules = [
            'group_id' => ['required', 'exists:groups,id'],
            'user_id' => ['required', 'exists:users,id'],
            'is_owner' => ['nullable', 'boolean'],
    ];

    public function store(Request $request, AddUserToGroup $addUserToGroup)
    {
        $request->validate($this->rules);

        if ($request->user()->cannot('update', Group::find($request->group_id))) {
            abort(403);
        }

        $addUserToGroup(
            group: Group::find($request->group_id),
            user: User::find($request->user_id),
            isOwner: $request->is_owner ?? false
        );

        return redirect()->back();
    }

    public function destroy(Request $request, Group $group, User $user)
    {
        if ($request->user()->cannot('update', $group)) {
            abort(403);
        }

        DB::table('group_user')
            ->where('group_id', $group->id)
            ->where('user_id', $user->id)
            ->delete();

        return redirect()->back();
    }
}
