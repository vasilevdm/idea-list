<?php

namespace App\Action\IdeaList;

use App\DTO\IdeaDTO;

class IdeaListResponse
{
    /** @var IdeaDTO[] */
    private array $items;

    /**
     * @param IdeaDTO[] $items
     */
    public function __construct(array $items)
    {
        $this->items = $items;
    }

    /**
     * @return IdeaDTO[]
     */
    public function getItems(): array
    {
        return $this->items;
    }
}
