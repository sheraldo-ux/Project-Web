<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SafetyTipsController;

Route::get('/', function () {
    return inertia('Home');
});

Route::get('/safety-tips', [SafetyTipsController::class, 'index'])->name('safetytips');

// Route::get('/safety-tips', function () {
//     return inertia('safety-tips');
// });