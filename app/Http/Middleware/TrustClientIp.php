<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrustClientIp
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (app()->environment('production')) {
            $xForwardedFor = $request->header('X-Forwarded-For');

            if ($xForwardedFor) {
                $ipArray = explode(',', $xForwardedFor);
                $ipArray = array_map('trim', $ipArray);
                $clientIp = $ipArray[0] ?? $request->ip();
                $request->server->set('REMOTE_ADDR', $clientIp);
            }

            return $next($request);
        }

        return $next($request);
    }
}
