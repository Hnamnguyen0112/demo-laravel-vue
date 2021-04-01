<?php


namespace App\Common\Services\Response\Src;


use Illuminate\Http\Response;

class ResponseService
{
    public function send($data, $code = Response::HTTP_OK, $message = null)
    {
        $result = [
            'success' => false,
            'message' => null,
            'data' => null,
            'errors' => null,
        ];

        if ($code == Response::HTTP_OK) {
            $result['success'] = true;
        }

        if ($code == Response::HTTP_OK) {
            if (is_string($data)) {
                $result['message'] = $data;
            } else {
                $result['data'] = $data;
            }
        } else {
            $code = empty($code) ? Response::HTTP_INTERNAL_SERVER_ERROR : $code;
            if ($data instanceof \Exception) {
                $result['message'] = $data->getMessage();
            } else {
                if (is_string($data)) {
                    $result['message'] = $data;
                } else {
                    $result['errors'] = $data;
                    $result['message'] = $message;
                }
            }
        }
        return response()->json($result, $code);
    }
}
