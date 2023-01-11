<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'group_user', 'user_id', 'group_id');
    }

    public function ownedGroups()
    {
        return $this->belongsToMany(Group::class, 'group_user', 'user_id', 'group_id')->wherePivot('is_owner', true);
    }

    public function group()
    {
        if ($groupId = session('current_group_id')) {
            $group = $this->groups()
                ->where('group_id', $groupId)
                ->with(['role', 'role.permissions'])
                ->withPivot('is_owner')
                ->first();

            if ($group) {
                return $group;
            }
        }

        return $this->groups()->with(['role', 'role.permissions'])->withPivot('is_owner')->first();
    }

    public function scopeSearch(Builder $query, string $search)
    {
        return $query
            ->where('id', '=', "{$search}")
            ->orWhere('name', 'like', "{$search}%")
            ->orWhere('email', 'like', "{$search}%");
    }

    public function isInGroup(Group $group): bool
    {
        return $this->groups()->where('group_id', $group->id)->exists();
    }
}
