<?php

namespace App\Action\IdeaUpdate;

use App\Exception\EntityNotFoundException;
use App\Repository\IdeaRepository;

class IdeaUpdateAction
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
    public function handle(IdeaUpdateRequest $request): void
    {
        $idea = $this->repository->find($request->getId());
        if (!$idea) {
            throw new EntityNotFoundException();
        }

        $idea->setTitle($request->getTitle())
            ->setCompleted($request->isCompleted())
        ;
        $this->repository->add($idea);
    }
}
