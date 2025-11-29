<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::redirect('/', '/dashboard')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'hiarcs' => \App\Models\Hiarc::with('potentialDangers')->get(),
        ]);
    })->name('dashboard');

    Route::get('dashboard/generate-ai-recommendation', [\App\Http\Controllers\Dashboard\GenerateAiRecommendationController::class, 'generate'])
        ->name('dashboard.generate-ai-recommendation');
});

require __DIR__.'/settings.php';
