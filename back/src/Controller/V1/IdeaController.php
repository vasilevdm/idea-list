<?php

namespace App\Controller\V1;

use App\Action\IdeaCreate\IdeaCreateAction;
use App\Action\IdeaCreate\IdeaCreateRequest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * @Route("/api/v1")
 */
class IdeaController extends AbstractController
{
    private NormalizerInterface $normalizer;

    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }

    /**
     * @Route("/ideas", methods={"POST"}, name="app.v1.idea.create")
     */
    public function create(IdeaCreateRequest $dto, IdeaCreateAction $action): JsonResponse
    {
        $result = $action->handle($dto);

        return new JsonResponse($this->normalizer->normalize($result), Response::HTTP_CREATED);
    }
}
