<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title') | Secura</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/assets/Eye.png" />
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Kanit', 'sans-serif'],
                    },
                },
            },
        }
    </script>
    
    <style>
        body {
            font-family: 'Kanit', sans-serif;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        }
    </style>
</head>
<body class="antialiased">
    <div class="flex flex-col min-h-screen bg-gray-100">
        <!-- Navigation -->
        <nav class="bg-white">
            <div class="container flex items-center justify-between px-4 py-4 mx-auto">
                <a href="/" class="flex items-center">
                    <img src="/assets/dark logo.png" alt="Secura Logo" class="h-12 w-auto">
                </a>
                <div class="hidden space-x-8 md:flex">
                    <a href="/" class="text-gray-700 hover:text-cyan-500 transition-colors duration-200">Home</a>
                    <a href="/#services" class="text-gray-700 hover:text-cyan-500 transition-colors duration-200">Services</a>
                    <a href="/#about" class="text-gray-700 hover:text-cyan-500 transition-colors duration-200">About</a>
                    <a href="/#contact" class="text-gray-700 hover:text-cyan-500 transition-colors duration-200">Contact</a>
                </div>
            </div>
        </nav>
        
        <!-- Main Content -->
        <main class="flex-grow">
            <div class="container flex flex-col items-center justify-center px-4 py-16 mx-auto text-center">
                <div class="mb-8">
                    <img src="/assets/Eye.png" alt="Secura Eye" class="w-32 h-32 mx-auto mb-4">
                </div>
                
                <h1 class="mb-4 text-6xl font-bold text-gray-800">@yield('code')</h1>
                <h2 class="mb-8 text-2xl font-medium text-gray-600">@yield('title')</h2>
                
                <p class="max-w-md mb-8 text-gray-500">
                    @yield('message')
                </p>
                
                <div class="space-y-4 md:space-y-0 md:space-x-4 md:flex">
                    <a href="/" class="inline-block px-6 py-3 text-white transition-colors duration-200 rounded-md gradient-bg hover:opacity-90">
                        Return Home
                    </a>
                    <a href="/contact" class="inline-block px-6 py-3 text-gray-700 transition-colors duration-200 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        Contact Support
                    </a>
                </div>
            </div>
        </main>
        
        <!-- Footer -->
        <footer class="py-6 text-sm text-white bg-gray-800 shadow-inner">
            <div class="container flex flex-col items-center justify-between px-4 mx-auto lg:flex-row">
                <!-- Logo + Copyright -->
                <div class="items-center hidden mb-4 space-x-4 lg:flex lg:mb-0">
                    <img src="/assets/SecuraLogo.png" alt="Secura Logo" class="h-12 w-auto">
                    <p class="text-gray-300">
                        © {{ date('Y') }} Secura. All rights reserved.
                    </p>
                </div>
                
                <!-- Mobile Logo -->
                <div class="flex mb-4 lg:hidden">
                    <img src="/assets/SecuraLogo.png" alt="Secura Logo" class="h-12 w-auto">
                </div>
                
                <!-- Navigation Links -->
                <nav class="flex flex-wrap justify-center mb-4 space-x-6 lg:mb-0">
                    <a href="/" class="text-gray-300 transition-colors duration-200 hover:text-cyan-400">Home</a>
                    <a href="/about" class="text-gray-300 transition-colors duration-200 hover:text-cyan-400">About</a>
                    <a href="/services" class="text-gray-300 transition-colors duration-200 hover:text-cyan-400">Services</a>
                    <a href="/contact" class="text-gray-300 transition-colors duration-200 hover:text-cyan-400">Contact</a>
                </nav>
                
                <!-- Mobile Copyright -->
                <div class="flex flex-col items-center mb-4 space-y-2 lg:hidden">
                    <p class="text-gray-300">
                        © {{ date('Y') }} Secura. All rights reserved.
                    </p>
                </div>
                
                <!-- Privacy and Terms -->
                <div class="hidden space-x-4 lg:flex">
                    <a href="/privacy" class="text-gray-300 transition-colors duration-200 hover:text-cyan-400">Privacy Policy</a>
                    <span class="text-gray-500">|</span>
                    <a href="/terms" class="text-gray-300 transition-colors duration-200 hover:text-cyan-400">Terms of Service</a>
                </div>
            </div>
        </footer>
    </div>
</body>
</html>