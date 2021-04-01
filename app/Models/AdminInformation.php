<?php

namespace App\Models;


use App\Common\Eloquent\Model;

class AdminInformation extends Model
{
    protected $fillable = [
        'admin_id',
        'description',
        'path',
        'facebook_url',
        'instagram_url',
        'linked_in_url'
    ];

    public function admin()
    {
        $this->belongsTo(Admin::class, 'admin_id', 'id');
    }
}
