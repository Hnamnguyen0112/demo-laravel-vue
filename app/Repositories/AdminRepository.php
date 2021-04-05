<?php


namespace App\Repositories;


use App\Common\Repositories\BaseRepository;
use App\Models\Admin;

class AdminRepository extends BaseRepository
{
    public function model()
    {
        return Admin::class;
    }
}
