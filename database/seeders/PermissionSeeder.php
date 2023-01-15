<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * Admin default permissions
         */
        Permission::create(['name' => 'admin']);

        $adminRole = Role::findOrCreate('administrator');
        $adminRole->givePermissionTo('admin');

        /**
         * Author default permissions
         */
        // $authorRole = Role::findOrCreate('author');

        // $permissions = [
        //     Permission::create(['name' => 'write_books']),
        // ];

        // foreach ($permissions as $permission) {
        //     $authorRole->givePermissionTo($permission);
        // }
    }
}
