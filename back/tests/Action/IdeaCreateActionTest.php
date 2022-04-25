<?php

namespace Tests\Action;

use App\Action\IdeaCreate\IdeaCreateAction;
use App\Action\IdeaCreate\IdeaCreateRequest;
use App\DTO\IdeaDTO;
use App\Repository\IdeaRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class IdeaCreateActionTest extends KernelTestCase
{
    public function testSuccess()
    {
        $repository = $this->createMock(IdeaRepository::class);
        $repository->expects(self::once())
            ->method('add')
        ;
        $action = new IdeaCreateAction($repository);
        $request = new IdeaCreateRequest('test title');

        $result = $action->handle($request);

        $this->assertInstanceOf(IdeaDTO::class, $result);
    }
}
