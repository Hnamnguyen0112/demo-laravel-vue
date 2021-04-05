<?php

namespace App\Http\Controllers\Api;

use App\Common\Controllers\BaseController;
use App\Common\Controllers\Traits\HasCrudActions;
use App\Repositories\AdminRepository;
use Illuminate\Http\Request;

class AdminController extends BaseController
{
    use HasCrudActions;

    public function __construct(AdminRepository $repository)
    {
        $this->repository = $repository;
    }
}
