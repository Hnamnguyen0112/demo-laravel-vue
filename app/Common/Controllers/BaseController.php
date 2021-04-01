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

    public function response($data, $code = Response::HTTP_OK, $message = null)
    {
        return ResponseFacade::send($data, $code, $message);
    }
}
