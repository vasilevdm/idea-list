<?php

namespace App\Action\IdeaDelete;

use App\Exception\EntityNotFoundException;
use App\Repository\IdeaRepository;

class IdeaDeleteAction
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
    public function handle(IdeaDeleteRequest $request): void
    {
        $idea = $this->repository->find($request->getId());
        if (!$idea) {
            throw new EntityNotFoundException();
        }

        $this->repository->remove($idea);
    }
}
