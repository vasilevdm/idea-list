<?php

namespace App\DTO;

class ErrorResponse
{
    private string $errorMsg;

    /** @var array<string,string> */
    private array $errors;

    /**
     * @param array<string,string> $errors
     */
    public function __construct(string $errorMsg, array $errors = [])
    {
        $this->errorMsg = $errorMsg;
        $this->errors = $errors;
    }

    public function getErrorMsg(): string
    {
        return $this->errorMsg;
    }

    /**
     * @return array<string,string>
     */
    public function getErrors(): array
    {
        return $this->errors;
    }
}
