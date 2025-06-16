<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Exception;

class GoogleController extends Controller
{
    /**
     * Redirect to Google OAuth
     */
    public function redirectToGoogle(): RedirectResponse
    {
        try {
            \Log::info('Google OAuth redirect initiated');
            \Log::info('Google Client ID: ' . config('services.google.client_id'));
            \Log::info('Google Redirect URI: ' . config('services.google.redirect'));

            return Socialite::driver('google')
                ->scopes(['email', 'profile'])
                ->redirect();
        } catch (Exception $e) {
            \Log::error('Google OAuth redirect failed: ' . $e->getMessage());
            return redirect()->route('login')->with('error', 'Google OAuth configuration error: ' . $e->getMessage());
        }
    }

    /**
     * Handle Google OAuth callback
     */
    public function handleGoogleCallback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            // Check if user already exists with this Google ID
            $user = User::where('google_id', $googleUser->id)->first();
            
            if ($user) {
                // User exists with Google ID, log them in
                Auth::login($user);
                return redirect()->intended(route('dashboard'));
            }
            
            // Check if user exists with this email
            $existingUser = User::where('email', $googleUser->email)->first();
            
            if ($existingUser) {
                // User exists with email, link Google account
                // Clean avatar URL by removing size parameters that can cause image loading issues
                $cleanedAvatar = $googleUser->avatar ? preg_replace('/=s[0-9]+-c$/', '', $googleUser->avatar) : null;
                
                $existingUser->update([
                    'google_id' => $googleUser->id,
                    'avatar' => $cleanedAvatar,
                    'provider' => 'google',
                ]);
                
                Auth::login($existingUser);
                return redirect()->intended(route('dashboard'));
            }
            
            // Create new user
            // Clean avatar URL by removing size parameters that can cause image loading issues
            $cleanedAvatar = $googleUser->avatar ? preg_replace('/=s[0-9]+-c$/', '', $googleUser->avatar) : null;
            
            $newUser = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'google_id' => $googleUser->id,
                'avatar' => $cleanedAvatar,
                'provider' => 'google',
                'email_verified_at' => now(), // Google emails are verified
                'password' => Hash::make(Str::random(24)), // Random password
            ]);
            
            Auth::login($newUser);
            return redirect()->intended(route('dashboard'));
            
        } catch (Exception $e) {
            // Log the error for debugging
            \Log::error('Google OAuth Error: ' . $e->getMessage());
            
            return redirect()->route('login')->with('error', 'Unable to login with Google. Please try again.');
        }
    }
}
