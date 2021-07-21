<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class File extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'size', 'path'];

    // When model is being booted we can attach eloquent events
    public static function booted() {
        static::creating(function($file) {
            $file->uuid = Str::uuid();
        });
    }
}
