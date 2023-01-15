<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Group;
use App\Models\User;
use App\Policies\GroupPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class  => UserPolicy::class,
        Group::class => GroupPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Allow admins to do anything
        Gate::before(function (User $user, $ability) {
            if ($user->hasPermissionTo('admin')) {
                return true;
            }
        });
    }
}
