<?php

namespace App\Action\IdeaCreate;

use App\Action\ActionRequestInterface;
use Symfony\Component\Validator\Constraints as Assert;

class IdeaCreateRequest implements ActionRequestInterface
{
    /**
     * @Assert\NotBlank()
     */
    private string $title;

    public function __construct(string $title)
    {
        $this->title = $title;
    }

    public function getTitle(): string
    {
        return $this->title;
    }
}
