<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        $response->headers->set('x-content-type-options', 'nosniff');
        $response->headers->set('x-xss-protection', '1; mode=block');
        $response->headers->set('strict-transport-security', 'max-age=63072000; always;');
        $response->headers->set('strict-transport-security', 'max-age=63072000; includeSubdomains;');
        $response->headers->set('x-frame-options', 'SAMEORIGIN');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $permissions = [
            'camera=()',          // Menonaktifkan akses kamera
            'microphone=()',      // Menonaktifkan akses mikrofon
            'geolocation=()',     // Menonaktifkan akses lokasi
            'payment=()',         // Menonaktifkan Payment Request API
            'usb=()',             // Menonaktifkan WebUSB API
            'fullscreen=(self)',  // Mengizinkan fullscreen hanya dari origin sendiri
        ];
        $response->headers->set('Permissions-Policy', implode(', ', $permissions));
        
        return $response;
    }
}
