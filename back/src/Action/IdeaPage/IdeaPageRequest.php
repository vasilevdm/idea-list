<?php

namespace App\Action\IdeaPage;

use App\Action\ActionRequestInterface;

class IdeaPageRequest implements ActionRequestInterface
{
    private int $page;

    private int $perPage;

    public function __construct(int $page, int $perPage)
    {
        $this->page = $page;
        $this->perPage = $perPage;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getPerPage(): int
    {
        return $this->perPage;
    }
}
