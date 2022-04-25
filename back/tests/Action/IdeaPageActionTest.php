<?php

namespace Tests\Action;

use App\Action\IdeaPage\IdeaPageAction;
use App\Action\IdeaPage\IdeaPageRequest;
use App\Action\IdeaPage\IdeaPageResponse;
use App\Entity\Idea;
use App\Repository\IdeaRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class IdeaPageActionTest extends KernelTestCase
{
    public function testSuccess()
    {
        $repository = $this->createMock(IdeaRepository::class);
        $repository->expects(self::once())
            ->method('paginateByPage')
            ->willReturn([new Idea('test title')])
        ;
        $action = new IdeaPageAction($repository);
        $request = new IdeaPageRequest(3, 10);

        $result = $action->handle($request);

        $this->assertInstanceOf(IdeaPageResponse::class, $result);
        $this->assertCount(1, $result->getItems());
    }
}
