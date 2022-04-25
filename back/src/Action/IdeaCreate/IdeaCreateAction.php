<?php

namespace App\Action\IdeaCreate;

use App\DTO\IdeaDTO;
use App\Entity\Idea;
use App\Repository\IdeaRepository;

class IdeaCreateAction
{
    private IdeaRepository $repository;

    public function __construct(IdeaRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Doctrine\ORM\ORMException
     */
    public function handle(IdeaCreateRequest $request): IdeaDTO
    {
        $idea = new Idea($request->getTitle());

        $this->repository->add($idea);

        return new IdeaDTO($idea->getId(), $idea->getTitle(), $idea->getCompleted());
    }
}
