<?php

namespace App\ArgumentResolver;

use App\Action\ActionRequestInterface;
use App\Exception\DomainException;
use App\Exception\ValidationException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ArgumentValueResolverInterface;
use Symfony\Component\HttpKernel\ControllerMetadata\ArgumentMetadata;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ActionRequestResolver implements ArgumentValueResolverInterface
{
    private SerializerInterface $serializer;

    private ValidatorInterface $validator;

    public function __construct(SerializerInterface $serializer, ValidatorInterface $validator)
    {
        $this->serializer = $serializer;
        $this->validator = $validator;
    }

    public function supports(Request $request, ArgumentMetadata $argument): bool
    {
        $className = $argument->getType();

        if (!$className || !class_exists($className)) {
            return false;
        }

        return (new \ReflectionClass($className))->implementsInterface(ActionRequestInterface::class);
    }

    public function resolve(Request $request, ArgumentMetadata $argument): \Generator
    {
        if (!$argument->getType()) {
            return;
        }

        try {
            $dto = $this->serializer->deserialize($request->getContent(), $argument->getType(), 'json');
        } catch (\Throwable $exception) {
            throw new DomainException($exception->getMessage());
        }

        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            throw new ValidationException($errors);
        }

        yield $dto;
    }
}
