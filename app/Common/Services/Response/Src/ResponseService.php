<?php


namespace App\Common\Services\Response\Src;


use Illuminate\Http\Response;

class ResponseService
{
    public function send($data, $status, $statusCode, $paging)
    {
        switch ($statusCode) {
            case Response::HTTP_UNAUTHORIZED:
                $message = __('common.invalid_login_credentials');
                break;
            default:
                $message = __('common.successfully');
        }

        if (!$paging) {
            return response()->json([
                'success' => $status,
                'message' => $message,
                'data' => $data,
                'errors' => null
            ], $statusCode);
        }
        $data = $data->toArray();

        return response()->json([
            'success' => $status,
            'message' => $message,
            'data' => $data['data'],
            'errors' => null,
            'links' => [
                "first" => $data['first_page_url'],
                "last"  => $data['last_page_url'],
                "prev"  => $data['prev_page_url'],
                "next"  => $data['next_page_url']
            ],
            'meta' => [
                "current_page" => $data['current_page'],
                "from" => $data['from'],
                "last_page" => $data['last_page'],
                "path" => $data['path'],
                "per_page" => $data['per_page'],
                "to" => $data['to'],
                "total" => $data['total']
            ]
        ]);
    }
}
