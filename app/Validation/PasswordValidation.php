<?php

namespace App\Validation;

use Illuminate\Validation\Rules;

class PasswordValidation
{
    public static function rules()
    {
        return ['required', 'confirmed', Rules\Password::defaults()->min(8)->mixedCase()->letters()->numbers()->uncompromised()];
    }
}
