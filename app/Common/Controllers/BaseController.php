<?php


namespace App\Common\Controllers;

use App\Common\Services\Response\ResponseFacade;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class BaseController extends Controller
{
    public $repository;
    public $validator;
    public $validation;

    public function response($data, $status = true, $code = Response::HTTP_OK, $paging = false)
    {
        return ResponseFacade::send($data, $status, $code, $paging);
    }
}
