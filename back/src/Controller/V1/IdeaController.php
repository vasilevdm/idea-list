<?php

namespace App\Controller\V1;

use App\Action\IdeaCreate\IdeaCreateAction;
use App\Action\IdeaCreate\IdeaCreateRequest;
use App\Action\IdeaDelete\IdeaDeleteAction;
use App\Action\IdeaDelete\IdeaDeleteRequest;
use App\Action\IdeaList\IdeaListAction;
use App\Action\IdeaList\IdeaListRequest;
use App\Action\IdeaPage\IdeaPageAction;
use App\Action\IdeaPage\IdeaPageRequest;
use App\Action\IdeaUpdate\IdeaUpdateAction;
use App\Action\IdeaUpdate\IdeaUpdateRequest;
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
     * @Route("/ideas/page", methods={"GET"}, name="app.v1.ideas.page")
     */
    public function page(Request $request, IdeaPageAction $action): JsonResponse
    {
        $result = $action->handle(new IdeaPageRequest(
            $request->query->getInt('page', 1),
            $request->query->getInt('perPage', 10)
        ));

        return new JsonResponse($this->normalizer->normalize($result));
    }

    /**
     * @Route("/ideas/list", methods={"GET"}, name="app.v1.ideas.list")
     */
    public function list(Request $request, IdeaListAction $action): JsonResponse
    {
        $result = $action->handle(new IdeaListRequest(
            $request->query->getInt('ideaId', 0),
            $request->query->getAlpha('direction', 'next'),
            $request->query->getInt('perPage', 10)
        ));

        return new JsonResponse($this->normalizer->normalize($result));
    }

    /**
     * @Route("/ideas/{id}", methods={"PATCH"}, name="app.v1.ideas.update", requirements={"id"="\d+"})
     */
    public function update(IdeaUpdateRequest $request, IdeaUpdateAction $action): JsonResponse
    {
        $action->handle($request);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * @Route("/ideas/{id}", methods={"DELETE"}, name="app.v1.ideas.delete", requirements={"id"="\d+"})
     */
    public function delete(IdeaDeleteRequest $request, IdeaDeleteAction $action): JsonResponse
    {
        $action->handle($request);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
