<?php

namespace App\Subscriber;

use App\DTO\ErrorResponse;
use App\Exception\ValidationException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ValidationExceptionSubscriber implements EventSubscriberInterface
{
    private NormalizerInterface $normalizer;

    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => ['onKernelException', 10],
        ];
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();

        if (!$exception instanceof ValidationException) {
            return;
        }

        $result = [];
        foreach ($exception->getErrors() as $error) {
            $result[$error->getPropertyPath()] = $error->getMessage();
        }

        $event->setResponse(new JsonResponse(
            $this->normalizer->normalize(new ErrorResponse($exception->getMessage(), $result)),
            Response::HTTP_BAD_REQUEST
        ));
    }
}
