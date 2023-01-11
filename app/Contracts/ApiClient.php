<?php

namespace App\Contracts;

/**
 * @property private string $apiUrl;
 * @property private Illuminate\Http\Client\PendingRequest $client;
 * @property private string $apiToken;
 */
interface ApiClient
{
    public function call(string $method, string $endpoint, array $data = []): mixed;

    public function get(string $endpoint, array $data = []): mixed;

    public function post(string $endpoint, array $data = []): mixed;

    public function put(string $endpoint, array $data = []): mixed;

    public function del(string $endpoint): mixed;
}
