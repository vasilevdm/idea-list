<?php

namespace Tests\Action;

use App\Action\IdeaList\IdeaListAction;
use App\Action\IdeaList\IdeaListRequest;
use App\Action\IdeaList\IdeaListResponse;
use App\Entity\Idea;
use App\Repository\IdeaRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class IdeaListActionTest extends KernelTestCase
{
    public function testSuccess()
    {
        $repository = $this->createMock(IdeaRepository::class);
        $repository->expects(self::once())
            ->method('paginateById')
            ->willReturn([new Idea('test title')])
        ;
        $action = new IdeaListAction($repository);
        $request = new IdeaListRequest(3, 'prev', 11);

        $result = $action->handle($request);

        $this->assertInstanceOf(IdeaListResponse::class, $result);
        $this->assertCount(1, $result->getItems());
    }
}
