<?php

namespace App\Actions;

use App\Models\Group;
use App\Models\User;

class AddUserToGroup
{
    public function __invoke(Group $group, User $user, bool $isOwner = false, bool $removeFromOtherGroups = true)
    {
        if ($removeFromOtherGroups) {
            $user->groups()->detach();
        }

        $group->users()->attach($user->id, ['is_owner' => $isOwner]);

        // Inerit the group role
        if ($group->role) {
            $user->assignRole($group->role);
        }
    }
}
