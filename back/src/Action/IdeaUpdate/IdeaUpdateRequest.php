<?php

namespace App\Action\IdeaUpdate;

use App\Action\ActionRequestInterface;
use Symfony\Component\Validator\Constraints as Assert;

class IdeaUpdateRequest implements ActionRequestInterface
{
    /**
     * @Assert\Positive()
     */
    private int $id;

    /**
     * @Assert\NotBlank()
     */
    private string $title;

    private bool $completed;

    public function __construct(int $id, string $title, bool $completed)
    {
        $this->id = $id;
        $this->title = $title;
        $this->completed = $completed;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function isCompleted(): bool
    {
        return $this->completed;
    }
}
