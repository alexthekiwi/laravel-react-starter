<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class Group extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class, 'group_user', 'group_id', 'user_id');
    }

    public function owners()
    {
        return $this->belongsToMany(User::class, 'group_user', 'group_id', 'user_id')->wherePivot('is_owner', true);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function scopeSearch(Builder $query, string $search)
    {
        return $query
            ->where('id', '=', "{$search}")
            ->orWhere('name', 'like', "%{$search}%");
    }
}
