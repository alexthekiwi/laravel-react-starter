<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserProxyTest extends TestCase
{
    use RefreshDatabase;

    public function test_admins_can_impersonate_other_users()
    {
        $this->actingAs(User::query()->whereHas('roles', fn ($q) => Role::findByName('administrator'))->first());

        $otherUser = User::factory()->create();

        $res = $this->post('user-proxy', [
            'user_id' => $otherUser->id,
        ]);

        $res
            ->assertRedirectToRoute('dashboard')
            ->assertSessionHasNoErrors()
            ->assertSessionHas('user_proxy_id');
    }

    public function test_random_users_cannot_impersonate_other_users()
    {
        $this->actingAs(User::factory()->create());

        $otherUser = User::factory()->create();

        $res = $this->post('user-proxy', [
            'user_id' => $otherUser->id,
        ]);

        $res
            ->assertStatus(403)
            ->assertSessionMissing('user_proxy_id');
    }
}
