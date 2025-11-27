<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Models\User;
use App\Models\Overtime;
use App\Models\Pengurangan;
use App\Observers\UserObserver;
use App\Observers\OvertimeObserver;
use App\Observers\PenguranganObserver;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use App\Listeners\LoginListener;
use App\Listeners\LogoutListener;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register model observers
        User::observe(UserObserver::class);
        Overtime::observe(OvertimeObserver::class);
        Pengurangan::observe(PenguranganObserver::class);

        // Register event listeners
        Event::listen(
            Login::class,
            LoginListener::class
        );

        Event::listen(
            Logout::class,
            LogoutListener::class
        );
    }
}
