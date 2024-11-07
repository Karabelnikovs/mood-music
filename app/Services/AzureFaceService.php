<?php
namespace App\Services;

use GuzzleHttp\Client;

class AzureFaceService
{
    protected $client;
    protected $endpoint;
    protected $subscriptionKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->endpoint = env('AZURE_FACE_API_ENDPOINT') . '/detect';
        $this->subscriptionKey = env('AZURE_FACE_API_KEY');
    }

    public function analyzeEmotions($imagePath)
    {
        $response = $this->client->post($this->endpoint, [
            'headers' => [
                'Ocp-Apim-Subscription-Key' => $this->subscriptionKey,
                'Content-Type' => 'application/octet-stream',
            ],
            'query' => [
                'returnFaceAttributes' => 'emotion',
            ],
            'body' => fopen($imagePath, 'r'),
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }
}
