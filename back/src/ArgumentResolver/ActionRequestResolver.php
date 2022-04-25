<?php

namespace App\ArgumentResolver;

use App\Action\ActionRequestInterface;
use App\Exception\DomainException;
use App\Exception\ValidationException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ArgumentValueResolverInterface;
use Symfony\Component\HttpKernel\ControllerMetadata\ArgumentMetadata;
use Symfony\Component\Serializer\Encoder\DecoderInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ActionRequestResolver implements ArgumentValueResolverInterface
{
    private DecoderInterface $decoder;

    private DenormalizerInterface $denormalizer;

    private ValidatorInterface $validator;

    public function __construct(
        DecoderInterface $decoder,
        DenormalizerInterface $denormalizer,
        ValidatorInterface $validator
    ) {
        $this->decoder = $decoder;
        $this->denormalizer = $denormalizer;
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
            /** @var array<string,string|bool> $requestArray */
            $requestArray = $this->decoder->decode($request->getContent(), 'json');
        } catch (\Throwable $exception) {
            throw new DomainException($exception->getMessage());
        }

        if ($request->attributes->has('id')) {
            $requestArray = array_merge($requestArray, ['id' => $request->attributes->getInt('id')]);
        }

        try {
            $dto = $this->denormalizer->denormalize($requestArray, $argument->getType());
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
