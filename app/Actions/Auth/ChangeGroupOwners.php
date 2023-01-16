<?php

namespace App\Actions\Auth;

use App\Models\Group;

class ChangeGroupOwners
{
    public function __invoke(Group $group, array $userIds = [])
    {
        $users = $group->users()->get();

        foreach ($users as $user) {
            $group->users()->updateExistingPivot($user, ['is_owner' => in_array($user->id, $userIds)]);
        }
    }
}
