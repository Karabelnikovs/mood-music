<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmotionController;
use App\Http\Controllers\SpotifyController;



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/emotions', function () {
//     return Inertia::render('EmotionCapture');
// })->middleware(['auth', 'verified'])->name('emotions');
// Route::post('/emotion/analyze', [EmotionController::class, 'analyzeEmotion'])->name('profile.update');



Route::middleware('auth')->group(function () {
    Route::get('/', [SpotifyController::class, 'index'])->name('index');

    Route::post('/generate-playlist', [SpotifyController::class, 'generatePlaylist']);
    Route::get('/playlist', [SpotifyController::class, 'showPlaylist'])->name('playlist');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {


});



require __DIR__ . '/auth.php';
