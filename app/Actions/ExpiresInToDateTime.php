<?php

namespace App\Actions;

class ExpiresInToDateTime
{
    public function __invoke(int $expiresIn)
    {
        return now()->addSeconds($expiresIn);
    }
}
