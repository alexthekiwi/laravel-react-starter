<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Make a dev user if specified in `.env`
        if (env('DEV_USER_EMAIL')) {
            User::factory()->create([
                'name' => env('DEV_USER_NAME' ?? 'Dev User'),
                'email' => env('DEV_USER_EMAIL'),
                'password' => bcrypt(env('DEV_USER_PASSWORD') ?? 'password'),
                'title' => 'Developer',
            ]);
        }

        // Make 100 random users
        User::factory()->count(100)->create();
    }
}
