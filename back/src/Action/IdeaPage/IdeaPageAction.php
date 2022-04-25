<?php

namespace App\Action\IdeaPage;

use App\DTO\IdeaDTO;
use App\Entity\Idea;
use App\Repository\IdeaRepository;

class IdeaPageAction
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
    public function handle(IdeaPageRequest $request): IdeaPageResponse
    {
        $ideas = $this->repository->paginateByPage($request->getPage(), $request->getPerPage());
        $result = array_map(
            fn (Idea $idea) => new IdeaDTO($idea->getId(), $idea->getTitle(), $idea->getCompleted()),
            $ideas
        );

        return new IdeaPageResponse($result);
    }
}
