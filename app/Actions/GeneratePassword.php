<?php

namespace App\Actions;

class GeneratePassword
{
    public function __invoke()
    {
        $str = substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=', ceil(12 / strlen($x)) )), 1, 20);

        // Ensure it has numbers
        while(! preg_match('/[0-9]/', $str)) {
            $str = substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=', ceil(12 / strlen($x)) )), 1, 20);
        }

        // Ensure it has letters
        while(! preg_match('/[a-zA-Z]/', $str)) {
            $str = substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=', ceil(12 / strlen($x)) )), 1, 20);
        }

        return $str;

    }
}
