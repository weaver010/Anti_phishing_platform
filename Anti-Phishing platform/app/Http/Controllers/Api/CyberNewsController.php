<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CyberNewsController extends Controller
{
    private function fetchNews()
    {
        try {
            $apiKey = env('NEWS_API_KEY');
            
            $response = Http::withOptions([
                'verify' => false,
            ])->get('https://newsapi.org/v2/everything', [
                'q' => '(cybersecurity OR "cyber security" OR phishing OR "phishing attack")',
                'searchIn' => 'title',
                'sortBy' => 'publishedAt',
                'language' => 'en',
                'pageSize' => 5,
                'apiKey' => $apiKey,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['articles']) && is_array($data['articles'])) {
                    return array_map(function ($article) {
                        return [
                            'title' => $article['title'] ?? 'No title',
                            'description' => $article['description'] ?? 'No description',
                            'url' => $article['url'] ?? '#',
                            'image' => $article['urlToImage'] ?? 'https://via.placeholder.com/150',
                            'publishedAt' => isset($article['publishedAt']) ? date('F j, Y', strtotime($article['publishedAt'])) : 'No date',
                        ];
                    }, array_slice($data['articles'], 0, 5));
                }
            }
            
            return [];
        } catch (\Exception $e) {
            Log::error('NewsAPI Error: ' . $e->getMessage());
            return [];
        }
    }

    public function getNews()
    {
        $news = $this->fetchNews();
        
        if (empty($news)) {
            return response()->json(['error' => 'Failed to fetch news'], 500);
        }
        
        return response()->json(['articles' => $news]);
    }
} 