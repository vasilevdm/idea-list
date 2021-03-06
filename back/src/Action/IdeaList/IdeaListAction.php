<?php

namespace App\Action\IdeaList;

use App\DTO\IdeaDTO;
use App\Entity\Idea;
use App\Repository\IdeaRepository;

class IdeaListAction
{
    private IdeaRepository $repository;

    public function __construct(IdeaRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @throws \Doctrine\ORM\NonUniqueResultException
     * @throws \Doctrine\ORM\NoResultException
     */
    public function handle(IdeaListRequest $request): IdeaListResponse
    {
        $ideas = $this->repository->paginateById($request->getIdeaId(), $request->getDirection(), $request->getPerPage());
        $result = array_map(
            fn (Idea $idea) => new IdeaDTO($idea->getId(), $idea->getTitle(), $idea->getCompleted()),
            $ideas
        );

        return new IdeaListResponse($result);
    }
}
