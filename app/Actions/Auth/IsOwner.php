<?php

namespace App\Actions\Auth;

use App\Models\Group;
use App\Models\User;

class IsOwner
{
    public function __invoke(User $user, ?Group $group = null): bool
    {
        // If a group was passed in, that's the one to check
        if ($group) {
            return $user->ownedGroups()->where('groups.id', $group->id)->exists();
        }

        // If the user is only in one group, we'll only check that one
        if ($user->ownedGroups()->count() === 1) {
            return $user->ownedGroups()->exists();
        }

        // Otherwise assume false
        return false;
    }
}
