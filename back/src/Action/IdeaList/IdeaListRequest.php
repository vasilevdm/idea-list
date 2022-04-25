<?php

namespace App\Action\IdeaList;

use App\Action\ActionRequestInterface;

class IdeaListRequest implements ActionRequestInterface
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
