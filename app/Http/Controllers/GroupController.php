<?php

namespace App\Http\Controllers;

use App\Actions\Auth\ChangeGroupOwners;
use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('admin');

        $sortParts = explode('_', $request->input('sort') ?? 'name_asc');
        $sort = $sortParts[0];
        $order = $sortParts[1] ?? 'asc';

        $groups = Group::query()
            ->select(['id', 'name', 'role_id'])
            ->with('role')
            ->when($request->input('search'), fn ($q) => $q->search($request->input('search')))
            ->orderBy($sort, $order)
            ->paginate($request->input('limit', 10))
            ->withQueryString();

        return inertia('Groups/Index', [
            'groups' => $groups,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->authorize('create', Group::class);

        return inertia('Groups/Create', [
            'roles' => Role::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Group::class);

        $fields = $request->validate([
            'name'    => ['required', 'string', 'max:255', 'unique:groups,name'],
            'role_id' => ['required', 'exists:roles,id'],
        ]);

        $group = Group::create($fields);

        return redirect()->route('groups.show', $group);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Group $group)
    {
        $this->authorize('view', $group);

        $sortParts = explode('_', $request->input('sort') ?? 'name_asc');
        $sort = $sortParts[0];
        $order = $sortParts[1] ?? 'asc';

        $users = User::query()
            ->whereHas('groups', fn ($query) => $query->where('group_id', $group->id))
            ->when($request->input('search'), fn ($q) => $q->search($request->input('search')))
            ->orderBy($sort, $order)
            ->paginate($request->input('limit', 10))
            ->withQueryString();

        return inertia('Groups/Show', [
            'group' => $group,
            'users' => $users,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function edit(Group $group)
    {
        $this->authorize('update', $group);

        $group->load('users');
        $group->load('owners');

        return inertia('Groups/Edit', [
            'group' => $group,
            'roles' => Role::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Group $group, ChangeGroupOwners $changeGroupOwners)
    {
        $this->authorize('update', $group);

        $request->validate([
            'name'    => ['required', 'string', 'max:255'],
            'role_id' => ['nullable', 'integer', 'exists:roles,id'],
        ]);

        $group->name = $request->input('name');

        // Handle the user has added another owner or removed one
        if ($ownerIds = $request->input('owner_ids')) {
            $changeGroupOwners($group, $ownerIds);
        }

        // Only update the role_id if it's an admin making this change
        if ($request->user()->can('admin') && $request->role_id !== $group->role_id) {
            $group->role_id = $request->input('role_id');

            // If the group is being assigned a role, need to sync this with the group's users
            if ($group->role_id) {
                $group->users->each(function ($user) use ($group) {
                    // Detach all existing
                    $user->roles()->detach();

                    // Assign the new one
                    $user->assignRole($group->role_id);
                });
            }
        }

        $group->save();

        return redirect()->route('groups.show', $group);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function destroy(Group $group, Request $request)
    {
        $this->authorize('delete', $group);

        if ($request->has('withUsers')) {
            $group->users()->get()->each(function (User $user) {
                $user->delete();
            });
        }

        $group->delete();

        return redirect()->route('groups.index');
    }
}
