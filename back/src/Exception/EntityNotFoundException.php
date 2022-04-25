<?php

namespace App\Exception;

class EntityNotFoundException extends DomainException
{
    public function __construct()
    {
        parent::__construct('Entity not found');
    }
}
