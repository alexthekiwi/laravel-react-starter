<?php

namespace App\Http\Controllers;

use App\Actions\Auth\AddUserToGroup;
use App\Actions\Auth\GeneratePassword;
use App\Actions\Auth\IsOwner;
use App\Models\Group;
use App\Models\User;
use App\Notifications\EmailActivation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        abort_if($request->user()->cannot('admin'), 403);

        $sortParts = explode('_', $request->input('sort') ?? 'name_asc');
        $sort = $sortParts[0];
        $order = $sortParts[1] ?? 'asc';

        $users = User::query()
            ->when($request->input('search'), fn ($q) => $q->search($request->input('search')))
            ->orderBy($sort, $order)
            ->paginate($request->input('limit', 10))
            ->withQueryString();

        return inertia('Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        abort_if(! $request->currentGroup->is_owner, 403);

        return inertia('Users/Create', [
            'groups'  => $this->getGroups(),
            'groupId' => $request->groupId ? (int) $request->groupId : null,
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
        abort_if(! $request->currentGroup->is_owner, 403);

        $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|string|email|max:255|unique:'.User::class,
            'title'       => 'nullable|string|max:255',
            'password'    => ['nullable', Rules\Password::defaults()->min(8)->mixedCase()->letters()->numbers()->uncompromised()],
            'group_ids'   => 'nullable|array',
            'group_ids.*' => 'nullable|integer|exists:groups,id',
        ]);

        // Generate a password if one wasn't provided
        $password = $request->password ?: (new GeneratePassword)();

        // Create the user
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($password),
        ]);

        // Send the user a welcome email
        $user->notify(new EmailActivation($password));

        if ($request->user()->can('admin')) {
            // Add the user to the selected groups
            $user->groups()->sync($request->group_ids);
            $groupId = null;
        } elseif ($request->currentGroup) {
            // Add the user to the current group if we have one
            $groupId = $request->currentGroup->id;
            $group = Group::findOrFail($groupId);
            (new AddUserToGroup)(group: $group, user: $user, isOwner: false);
        }

        if (! $groupId) {
            return redirect()->route('users.index');
        }

        return redirect()->route('groups.show', $request->currentGroup);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, User $user)
    {
        abort_if(! $request->currentGroup->is_owner, 403);

        return redirect()->route('users.edit', $user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, User $user, IsOwner $isOwner)
    {
        abort_if($request->user()->cannot('update', $user), 403);

        $userIsGroupOwner = $isOwner($user, $request->currentGroup);

        $user->load('groups');

        return inertia('Users/Edit', [
            'user'             => $user,
            'groups'           => $this->getGroups(),
            'userIsGroupOwner' => $userIsGroupOwner,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        abort_if($request->user()->cannot('update', $user), 403);

        $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|string|email|max:255',
            'title'       => 'nullable|string|max:255',
            'password'    => ['nullable', Rules\Password::defaults()->min(8)->mixedCase()->letters()->numbers()->uncompromised()],
            'group_ids'   => 'nullable|array',
            'group_ids.*' => 'nullable|integer|exists:groups,id',
        ]);

        $user->name = $request->name;
        $user->title = $request->title;

        if ($user->email !== $request->email) {
            // Check for other users with the same email
            $otherUser = User::where('email', $request->email)->first();

            if ($otherUser) {
                throw ValidationException::withMessages([
                    'email' => 'The email has already been taken.',
                ]);
            }

            $user->email = $request->email;
            $user->email_verified_at = null;
        }

        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        if ($request->user()->can('admin')) {
            $user->groups()->sync($request->group_ids);

            return redirect()->route('users.index');
        }

        return redirect()->route('groups.show', $request->currentGroup);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, User $user)
    {
        abort_if($request->user()->cannot('delete', $user), 403);

        $user->delete();

        return redirect()->back();
    }

    public function getGroups()
    {
        // Attach all groups if the authenticated user is an admin
        return auth()->user()->can('admin')
            ? Group::query()
                ->select(['id', 'name', 'role_id'])
                ->with('role')
                ->orderBy('name', 'asc')
                ->get()
            : null;
    }
}
