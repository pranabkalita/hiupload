<?php

namespace App\Models;

use App\Models\Plan;
use Laravel\Cashier\Billable;
use Laravel\Cashier\Subscription;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // MODEL METHODS

    public function usage()
    {
        return $this->files->sum('size');
    }

    public function canDowngradeToPlan(Plan $plan)
    {
        return $this->usage() <= $plan->storage;
    }

    // RELATIONSHIPS

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function plan()
    {
        // User has one plan via intermediate table subscriptions
        return $this->hasOneThrough(
            Plan::class, Subscription::class,
            'user_id', 'stripe_id', 'id', 'stripe_price'
        )
        ->whereNull('subscriptions.ends_at')
        ->withDefault(Plan::free()->toArray());
    }
}
