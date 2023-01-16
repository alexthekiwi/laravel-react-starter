<?php

namespace Tests\Feature;

use App\Actions\Auth\AddUserToGroup;
use App\Models\Group;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class GroupTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_add_regular_users_to_group()
    {
        $admin = User::query()->whereHas('roles', fn ($q) => Role::findByName('administrator'))->first();
        $this->actingAs($admin);

        $group = Group::factory()->create();
        $user = User::factory()->create();

        $res = $this->post('group-user', [
            'group_id' => $group->id,
            'user_id'  => $user->id,
        ]);

        $res->assertSessionHasNoErrors();
        $res->assertRedirect();

        $this->assertDatabaseHas('group_user', [
            'group_id' => $group->id,
            'user_id'  => $user->id,
            'is_owner' => false,
        ]);
    }

    public function test_admin_can_add_authors_to_group()
    {
        $admin = User::query()->whereHas('roles', fn ($q) => Role::findByName('administrator'))->first();
        $this->actingAs($admin);

        $role = Role::findOrCreate('example');
        Permission::create(['name' => 'do_something']);
        $role->givePermissionTo('do_something');

        $group = Group::factory()->create([
            'role_id' => $role->id,
        ]);

        $user = User::factory()->create();

        $this->assertFalse($user->hasPermissionTo('do_something'));

        $res = $this->post('group-user', [
            'group_id' => $group->id,
            'user_id'  => $user->id,
            'is_owner' => 1,
        ]);

        $user->refresh();

        $res->assertSessionHasNoErrors();
        $res->assertRedirect();

        $this->assertDatabaseHas('group_user', [
            'group_id' => $group->id,
            'user_id'  => $user->id,
            'is_owner' => true,
        ]);

        $this->assertTrue($user->hasPermissionTo('do_something'));
    }

    public function test_users_cannot_add_admins()
    {
        $admin = User::query()->whereHas('roles', fn ($q) => Role::findByName('administrator'))->first();

        // Create example group/role
        $group = Group::factory()->create([
            'role_id' => Role::findOrCreate('example')->id,
        ]);

        // Create example user
        $adminUser = User::factory()->create();
        (new AddUserToGroup)($group, $adminUser, true);

        // Create new user
        $user = User::factory()->create();

        // Post to group-user
        $res = $this->actingAs($adminUser)->post('group-user', [
            'group_id' => Group::where('role_id', Role::findByName('administrator')->id)->first()->id,
            'user_id'  => $user->id,
            'is_owner' => 1,
        ]);

        $res->assertStatus(403);
    }

    public function test_group_owners_can_add_users_to_their_own_group()
    {
        // Create group/role
        $role = Role::findOrCreate('example');
        $group = Group::factory()->create([
            'role_id' => $role->id,
        ]);

        // Create user
        $adminUser = User::factory()->create();
        (new AddUserToGroup)($group, $adminUser, true);

        // Create new user
        $user = User::factory()->create();

        // Post to group-user
        $res = $this->actingAs($adminUser)->post('group-user', [
            'group_id' => $group->id,
            'user_id'  => $user->id,
            'is_owner' => 1,
        ]);

        $res->assertStatus(302);
    }

    public function test_non_owners_cannot_add_users_to_their_own_group()
    {
        // Create group/role
        $role = Role::findOrCreate('example');
        $group = Group::factory()->create([
            'role_id' => $role->id,
        ]);

        // Create user
        $adminUser = User::factory()->create();
        (new AddUserToGroup)($group, $adminUser, false);

        // Create new user
        $user = User::factory()->create();

        // Post to group-user
        $res = $this->actingAs($adminUser)->post('group-user', [
            'group_id' => $group->id,
            'user_id'  => $user->id,
            'is_owner' => 1,
        ]);

        $res->assertStatus(403);
    }

    public function test_can_add_owners_to_group()
    {
        $group = Group::factory()->create();
        $user = User::factory()->create();

        (new AddUserToGroup)($group, $user, true);

        $this->assertDatabaseHas('group_user', [
            'group_id' => $group->id,
            'user_id'  => $user->id,
            'is_owner' => true,
        ]);
    }

    public function test_authenticated_user_has_group_in_session()
    {
        $user = User::first();
        $this->actingAs($user);

        // Hit any URL
        $res = $this->get('/');
        $res->assertStatus(200);

        // Check that the group is in the session
        $this->assertNotNull(session('current_group_id'));
    }
}
