<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class RandomForestUrlService
{
    protected $endpoint;

    public function __construct()
    {
        $this->endpoint = env('RF_URL_MODEL_ENDPOINT', 'http://127.0.0.1:5001/predict');
    }

    public function predict($url)
    {
        $response = Http::post($this->endpoint, ['url' => $url]);
        if ($response->successful()) {
            return $response->json();
        }
        return ['is_phishing' => null, 'probability' => null];
    }
}