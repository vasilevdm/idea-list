<?php

namespace App\Repository;

use App\Entity\Idea;
use App\Exception\DomainException;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Idea>
 *
 * @method Idea|null find($id, $lockMode = null, $lockVersion = null)
 * @method Idea|null findOneBy(array $criteria, array $orderBy = null)
 * @method Idea[]    findAll()
 * @method Idea[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IdeaRepository extends ServiceEntityRepository
{
    public const NEXT = 'next';
    public const PREV = 'prev';

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Idea::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(Idea $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(Idea $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @return Idea[]
     *
     * @throws \Exception
     */
    public function paginateById(int $ideaId, string $direction, int $perPage): array
    {
        if (!in_array($direction, [static::NEXT, static::PREV])) {
            throw new DomainException('Wrong parameter value');
        }

        $qb = $this->createQueryBuilder('i')
            ->orderBy('i.id', 'DESC')
            ->setParameter('ideaId', $ideaId)
            ->setMaxResults($perPage)
        ;

        if (static::NEXT === $direction) {
            /** @var Idea[] $result */
            $result = $qb->where('i.id < :ideaId')
                ->getQuery()
                ->getResult()
            ;
        } else {
            /** @var Idea[] $result */
            $result = $qb->where('i.id > :ideaId')
                ->orderBy('i.id', 'ASC')
                ->getQuery()
                ->getResult()
            ;
            $result = array_reverse($result);
        }

        return $result;
    }

    /** @return Idea[] */
    public function paginateByPage(int $pageNumber, int $perPage): array
    {
        $offset = $pageNumber * $perPage - $perPage;

        /** @var Idea[] $result */
        $result = $this->createQueryBuilder('i')
            ->orderBy('i.id', 'DESC')
            ->setMaxResults($perPage)
            ->setFirstResult($offset)
            ->getQuery()
            ->getResult()
        ;

        return $result;
    }
}
