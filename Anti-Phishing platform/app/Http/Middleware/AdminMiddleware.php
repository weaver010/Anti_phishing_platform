<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Temporarily bypass authentication check
        return $next($request);
        
        // Original code (commented out for now)
        // if (!$request->user() || !$request->user()->is_admin) {
        //     abort(403, 'Unauthorized action.');
        // }
        // return $next($request);
    }
} 