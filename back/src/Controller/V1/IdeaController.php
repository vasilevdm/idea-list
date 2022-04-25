<?php

namespace App\Controller\V1;

use App\Action\IdeaCreate\IdeaCreateAction;
use App\Action\IdeaCreate\IdeaCreateRequest;
use App\Action\IdeaList\IdeaListAction;
use App\Action\IdeaList\IdeaListRequest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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

    /**
     * @Route("/ideas", methods={"GET"}, name="app.v1.ideas.list")
     */
    public function list(Request $request, IdeaListAction $action): JsonResponse
    {
        $result = $action->handle(new IdeaListRequest(
            $request->query->getInt('page', 1),
            $request->query->getInt('per-page', 10)
        ));

        return new JsonResponse($this->normalizer->normalize($result));
    }
}
