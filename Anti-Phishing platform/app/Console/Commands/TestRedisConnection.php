<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Cache;

class TestRedisConnection extends Command
{
    protected $signature = 'redis:test';
    protected $description = 'Test Redis connection and functionality';

    public function handle()
    {
        $this->info('Testing direct Redis connection...');
        
        try {
            // Display Redis configuration
            $this->info('Redis Configuration:');
            $this->info('Client: ' . config('database.redis.client'));
            $this->info('Host: ' . config('database.redis.default.host'));
            $this->info('Port: ' . config('database.redis.default.port'));
            $this->info('DB: ' . config('database.redis.default.database'));
            
            // Test direct Redis connection
            $this->info('Attempting to connect to Redis...');
            Redis::set('test_key', 'Hello from Redis!');
            $value = Redis::get('test_key');
            
            $this->info("Direct Redis Test: " . $value);
            
            // Test Redis via Cache facade
            $this->info('Testing Redis via Cache facade...');
            
            Cache::put('cache_test_key', 'Hello from Cache!', 60);
            $cacheValue = Cache::get('cache_test_key');
            
            $this->info("Cache Test: " . $cacheValue);
            
            // Show all cache drivers
            $this->info('Cache Driver: ' . config('cache.default'));
            $this->info('Session Driver: ' . config('session.driver'));
            
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Redis connection failed: ' . $e->getMessage());
            $this->error('Error trace: ' . $e->getTraceAsString());
            
            // Try to ping Redis directly to see if it's running
            $this->info('Trying to check if Redis is running...');
            
            try {
                $result = exec('redis-cli -h ' . config('database.redis.default.host') . ' -p ' . config('database.redis.default.port') . ' ping');
                $this->info('Redis ping result: ' . $result);
            } catch (\Exception $pingError) {
                $this->error('Could not ping Redis: ' . $pingError->getMessage());
            }
            
            return Command::FAILURE;
        }
    }
} 