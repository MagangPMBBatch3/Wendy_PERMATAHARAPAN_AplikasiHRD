<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TasksController;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);
    Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [RegisterController::class, 'register']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Tasks routes
    Route::resource('tasks', TasksController::class);

    // UserProfile routes
    Route::resource('userprofile', \App\Http\Controllers\UserProfileController::class);

    // Permintaan routes
    Route::resource('permintaan', \App\Http\Controllers\PermintaanController::class);

    // Pengurangan routes
    Route::resource('pengurangan', \App\Http\Controllers\PenguranganController::class);

    // Tunjangan routes
    Route::resource('tunjangan', \App\Http\Controllers\TunjanganController::class);

    // Overtime routes
    Route::resource('overtime', \App\Http\Controllers\OvertimeController::class);

    // Detail Payroll routes
    Route::resource('detailpayroll', \App\Http\Controllers\DetailPayrollController::class);

    // Pengurangan Telat routes
    Route::resource('pengurangantelat', \App\Http\Controllers\PenguranganTelatController::class);
});
