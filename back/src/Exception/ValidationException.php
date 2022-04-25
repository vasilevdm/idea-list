<?php

namespace App\Exception;

use Symfony\Component\Validator\ConstraintViolationListInterface;

class ValidationException extends DomainException
{
    private ConstraintViolationListInterface $errors;

    public function __construct(ConstraintViolationListInterface $errors)
    {
        parent::__construct('Validation error');
        $this->errors = $errors;
    }

    public function getErrors(): ConstraintViolationListInterface
    {
        return $this->errors;
    }
}
