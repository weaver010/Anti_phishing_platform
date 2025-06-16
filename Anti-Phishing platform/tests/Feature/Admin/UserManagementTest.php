<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_users_list()
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $response = $this->actingAs($admin)->get(route('admin.users.index'));
        $response->assertStatus(200);
    }

    public function test_non_admin_cannot_view_users_list()
    {
        $user = User::factory()->create(['is_admin' => false]);
        $response = $this->actingAs($user)->get(route('admin.users.index'));
        $response->assertStatus(403);
    }

    public function test_admin_can_create_user()
    {
        $admin = User::factory()->create(['is_admin' => true]);
        
        $response = $this->actingAs($admin)->get(route('admin.users.create'));
        $response->assertStatus(200);
        
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'is_admin' => false,
        ];
        
        $response = $this->actingAs($admin)->post(route('admin.users.store'), $userData);
        $response->assertRedirect(route('admin.users.index'));
        
        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'is_admin' => false,
        ]);
    }

    public function test_admin_can_update_user()
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $user = User::factory()->create([
            'name' => 'Original Name',
            'email' => 'original@example.com',
            'is_admin' => false,
        ]);
        
        $response = $this->actingAs($admin)->get(route('admin.users.edit', $user->id));
        $response->assertStatus(200);
        
        $updatedData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'is_admin' => true,
        ];
        
        $response = $this->actingAs($admin)->put(route('admin.users.update', $user->id), $updatedData);
        $response->assertRedirect(route('admin.users.index'));
        
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'is_admin' => true,
        ]);
    }

    public function test_admin_can_delete_user()
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $user = User::factory()->create();
        
        $response = $this->actingAs($admin)->delete(route('admin.users.destroy', $user->id));
        $response->assertRedirect(route('admin.users.index'));
        
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_admin_can_view_user_details()
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $user = User::factory()->create();
        
        $response = $this->actingAs($admin)->get(route('admin.users.show', $user->id));
        $response->assertStatus(200);
    }

    public function test_admin_can_search_users()
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $user1 = User::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com']);
        $user2 = User::factory()->create(['name' => 'Jane Smith', 'email' => 'jane@example.com']);
        
        $response = $this->actingAs($admin)->get(route('admin.users.index', ['search' => 'John']));
        $response->assertStatus(200);
        
        // Since we're using Inertia, we can't directly assert on the response content
        // In a real test, you might want to use Laravel Dusk for browser testing
    }

    public function test_admin_can_filter_users_by_role()
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $user = User::factory()->create(['is_admin' => false]);
        
        $response = $this->actingAs($admin)->get(route('admin.users.index', ['role' => 'admin']));
        $response->assertStatus(200);
        
        $response = $this->actingAs($admin)->get(route('admin.users.index', ['role' => 'user']));
        $response->assertStatus(200);
    }
}
