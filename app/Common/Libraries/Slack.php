<?php


namespace App\Common\Libraries;


use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client as ClientHttp;

class Slack
{
    /**
     * The Guzzle HTTP client instance
     *
     * @var \GuzzleHttp\Client
     */
    protected $guzzle;

    /**
     * The Slack incoming webhook endpoint
     *
     * @var string
     */
    protected $endpoint;

    /**
     * The Slack incoming encoded message
     *
     * @var string
     */
    protected $body;

    /**
     * Send message to slack
     * @param $endpoint
     * @param $options
     * @return bool|\Psr\Http\Message\ResponseInterface
     */
    public function callWebHook($endpoint, $options)
    {
        try {
            $body = json_encode($options, JSON_UNESCAPED_UNICODE);

            $this->guzzle = new ClientHttp();
            $this->body = $body;
            $this->endpoint = $endpoint;

            $response = $this->guzzle->post($this->endpoint, ['body' => $this->body]);
            return $response;
        } catch (\Throwable $throwable) {
            $logContext = [
                'fileName' => $throwable->getFile(),
                'lineNo' => $throwable->getLine(),
            ];
            Log::notice($throwable->getMessage(), $logContext);
            return false; // Skip error report if can't call web hook
        }
    }
}
