<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\ProyekController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\KinerjaController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\UserController;

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

    // HR Management routes
    Route::resource('staff', StaffController::class);
    Route::resource('level', LevelController::class);
    Route::resource('user', UserController::class);
    Route::resource('userprofile', \App\Http\Controllers\UserProfileController::class);

    // Projects routes
    Route::resource('proyek', ProyekController::class);
    Route::resource('tasks', TasksController::class);
    Route::resource('kinerja', KinerjaController::class);

    // Attendance routes
    Route::resource('absensi', AbsensiController::class);
    Route::resource('overtime', \App\Http\Controllers\OvertimeController::class);

    // Payroll routes
    Route::resource('payroll', PayrollController::class);
    Route::resource('detailpayroll', \App\Http\Controllers\DetailPayrollController::class);
    Route::resource('tunjangan', \App\Http\Controllers\TunjanganController::class);
    Route::resource('pengurangan', \App\Http\Controllers\PenguranganController::class);
    Route::resource('pengurangantelat', \App\Http\Controllers\PenguranganTelatController::class);

    // Requests & Communications routes
    Route::resource('permintaan', \App\Http\Controllers\PermintaanController::class);
    Route::resource('pengumuman', PengumumanController::class);
    Route::resource('activitylog', ActivityLogController::class)->only(['index', 'show']);
});
