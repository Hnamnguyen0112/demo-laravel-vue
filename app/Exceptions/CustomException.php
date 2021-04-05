<?php


namespace App\Exceptions;


use Exception;
use Illuminate\Http\Response;

class CustomException extends Exception
{
    public function __construct($message = "", $code = Response::HTTP_BAD_REQUEST)
    {
        parent::__construct(__('messages.' . $message), $code);
        $this->setMessageCode($message);
    }

    /**
     * @var string
     */
    protected $messageCode = null;

    /**
     * Set the message code
     *
     * @param string $code
     * @return self
     */
    public function setMessageCode(string $code)
    {
        $this->messageCode = $code;

        return $this;
    }

    /**
     * Get the message code
     *
     * @return string
     */
    public function getMessageCode()
    {
        return $this->messageCode;
    }
}
