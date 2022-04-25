<?php

namespace App\Action\IdeaList;

use App\DTO\IdeaDTO;

class IdeaListResponse
{
    private int $page;

    private int $totalPages;

    /** @var IdeaDTO[] */
    private array $items;

    /** @param IdeaDTO[] $items */
    public function __construct(int $page, int $totalPages, array $items)
    {
        $this->page = $page;
        $this->totalPages = $totalPages;
        $this->items = $items;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getTotalPages(): int
    {
        return $this->totalPages;
    }

    /** @return IdeaDTO[] */
    public function getItems(): array
    {
        return $this->items;
    }
}
