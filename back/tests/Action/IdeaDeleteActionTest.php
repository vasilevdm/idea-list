<?php

namespace Tests\Action;

use App\Action\IdeaDelete\IdeaDeleteAction;
use App\Action\IdeaDelete\IdeaDeleteRequest;
use App\Entity\Idea;
use App\Exception\EntityNotFoundException;
use App\Repository\IdeaRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class IdeaDeleteActionTest extends KernelTestCase
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
            ->method('remove')
            ->with($idea)
        ;
        $action = new IdeaDeleteAction($repository);
        $request = new IdeaDeleteRequest(3);

        $action->handle($request);
    }

    public function testEntityNotFound()
    {
        $repository = $this->createMock(IdeaRepository::class);
        $repository->expects(self::once())
            ->method('find')
            ->willThrowException($exception = new EntityNotFoundException())
        ;
        $action = new IdeaDeleteAction($repository);
        $request = new IdeaDeleteRequest(0);

        $this->expectExceptionObject($exception);

        $action->handle($request);
    }
}
