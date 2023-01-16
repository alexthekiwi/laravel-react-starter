<?php

namespace Database\Seeders;

use App\Actions\Auth\AddUserToGroup;
use App\Models\Group;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (env('DEV_USER_EMAIL')) {
            $group = Group::query()->firstOrCreate([
                'name'    => 'Administrators',
                'role_id' => Role::findOrCreate('administrator')->id,
            ]);

            (new AddUserToGroup)($group, User::query()->where('email', env('DEV_USER_EMAIL'))->firstOrFail(), true);
        }

        $authors = Role::findOrCreate('authors')->id;

        // Create 20 groups
        Group::factory()->count(20)->create([
            'role_id' => $authors,
        ]);

        // Create 10 users for each group
        Group::query()->where('role_id', $authors)->with('role')->each(function (Group $group) {
            User::factory()->count(10)->create()->each(function (User $user) use ($group) {
                (new AddUserToGroup)($group, $user, rand(0, 1));
            });
        });
    }
}
