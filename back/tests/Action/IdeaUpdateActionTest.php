<?php

namespace Tests\Action;

use App\Action\IdeaUpdate\IdeaUpdateAction;
use App\Action\IdeaUpdate\IdeaUpdateRequest;
use App\Entity\Idea;
use App\Exception\EntityNotFoundException;
use App\Repository\IdeaRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class IdeaUpdateActionTest extends KernelTestCase
{
    public function testSuccess()
    {
        $repository = $this->createMock(IdeaRepository::class);
        $repository->expects(self::once())
            ->method('find')
            ->with(3)
            ->willReturn($idea = new Idea('test title'))
        ;
        $repository->expects(self::once())
            ->method('add')
            ->with($idea)
        ;
        $action = new IdeaUpdateAction($repository);
        $request = new IdeaUpdateRequest(3, $title = 'test title2', true);

        $action->handle($request);

        $this->assertEquals($title, $idea->getTitle());
        $this->assertTrue($idea->getCompleted());
    }

    public function testEntityNotFound()
    {
        $repository = $this->createMock(IdeaRepository::class);
        $repository->expects(self::once())
            ->method('find')
            ->willThrowException($exception = new EntityNotFoundException())
        ;
        $action = new IdeaUpdateAction($repository);
        $request = new IdeaUpdateRequest(0, '', false);

        $this->expectExceptionObject($exception);

        $action->handle($request);
    }
}
