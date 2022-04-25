<?php

namespace App\Action\IdeaPage;

use App\DTO\IdeaDTO;

class IdeaPageResponse
{
    /** @var IdeaDTO[] */
    private array $items;

    /** @param IdeaDTO[] $items */
    public function __construct(array $items)
    {
        $this->items = $items;
    }

    /** @return IdeaDTO[] */
    public function getItems(): array
    {
        return $this->items;
    }
}
