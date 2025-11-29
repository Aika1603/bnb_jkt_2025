<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class ForceHttpsRedirects
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if(app()->environment('production')) {
            if ($response instanceof RedirectResponse) {
                $target = $response->getTargetUrl();

                $appHost = parse_url(config('app.url'), PHP_URL_HOST);
                $targetHost = parse_url($target, PHP_URL_HOST);
                $scheme = parse_url($target, PHP_URL_SCHEME);

                if ($appHost && $targetHost === $appHost && $scheme === 'http') {
                    $secure = preg_replace('#^http:#', 'https:', $target);
                    $response->setTargetUrl($secure);
                }
            }
        }

        return $response;
    }
}
