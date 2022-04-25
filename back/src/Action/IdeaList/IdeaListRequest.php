<?php

namespace App\Action\IdeaList;

use App\Action\ActionRequestInterface;

class IdeaListRequest implements ActionRequestInterface
{
    private int $ideaId;

    private string $direction;

    private int $perPage;

    public function __construct(int $ideaId, string $direction, int $perPage)
    {
        $this->ideaId = $ideaId;
        $this->direction = $direction;
        $this->perPage = $perPage;
    }

    public function getIdeaId(): int
    {
        return $this->ideaId;
    }

    public function getDirection(): string
    {
        return $this->direction;
    }

    public function getPerPage(): int
    {
        return $this->perPage;
    }
}
