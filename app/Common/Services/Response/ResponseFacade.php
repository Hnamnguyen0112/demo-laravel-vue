<?php


namespace App\Common\Services\Response;


use App\Common\Services\Response\Src\ResponseService;
use Illuminate\Support\Facades\Facade;

class ResponseFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return ResponseService::class;
    }
}
