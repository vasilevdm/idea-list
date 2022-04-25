<?php

namespace App\Action\IdeaList;

use App\DTO\IdeaDTO;
use App\Entity\Idea;
use App\Repository\IdeaRepository;
use Knp\Component\Pager\PaginatorInterface;

class IdeaListAction
{
    private IdeaRepository $repository;

    private PaginatorInterface $paginator;

    public function __construct(IdeaRepository $repository, PaginatorInterface $paginator)
    {
        $this->repository = $repository;
        $this->paginator = $paginator;
    }

    public function handle(IdeaListRequest $request): IdeaListResponse
    {
        $pagination = $this->paginator->paginate(
            $this->repository->getListQuery(),
            $request->getPage(),
            $request->getPerPage()
        );

        $result = array_map(
            fn (Idea $idea) => new IdeaDTO($idea->getId(), $idea->getTitle(), $idea->getCompleted()),
            [...$pagination->getItems()]
        );

        return new IdeaListResponse(
            $pagination->getCurrentPageNumber(),
            (int) ceil($pagination->getTotalItemCount() / $pagination->getItemNumberPerPage()),
            $result
        );
    }
}
