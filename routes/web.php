<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\GroupSwitchController;
use App\Http\Controllers\GroupUserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProxyController;
use App\Http\Middleware\HasGroup;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

// TODO: Delete this route, this is just an example of PDF generation
Route::get('/pdf', function () {
    $browsershot = (new \App\Actions\GeneratePdf)(view('pdf.sample')->render());

    return response($browsershot->pdf(), 200, [
        'Content-Type'        => 'application/pdf',
        'Content-Disposition' => 'inline; filename="sample.pdf"',
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('users', UserController::class)->middleware([HasGroup::class]);
    Route::resource('groups', GroupController::class)->middleware([HasGroup::class]);

    Route::post('/group-user', [GroupUserController::class, 'store'])->name('group-user.store');
    Route::delete('/group-user/{group}/{user}', [GroupUserController::class, 'destroy'])->name('group-user.destroy');

    Route::get('/group-switch', [GroupSwitchController::class, 'index'])->name('group-switch.index');
    Route::post('/group-switch', [GroupSwitchController::class, 'store'])->name('group-switch.store');

    Route::post('/user-proxy', [UserProxyController::class, 'store'])->name('user-proxy.store');
    Route::delete('/user-proxy', [UserProxyController::class, 'destroy'])->name('user-proxy.destroy');
});

require __DIR__.'/auth.php';
