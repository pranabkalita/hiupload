<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
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

        // Delete file from S3 when a file is deleted from database
        static::deleted(function($file) {
            Storage::disk('s3')->delete($file->path);
        });
    }
}
