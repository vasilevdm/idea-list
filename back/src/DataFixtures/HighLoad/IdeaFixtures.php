<?php

namespace App\DataFixtures\HighLoad;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;

class IdeaFixtures extends Fixture implements FixtureGroupInterface
{
    public static function getGroups(): array
    {
        return ['HighLoad'];
    }

    public function load(ObjectManager $manager): void
    {
        /** @var EntityManagerInterface $em */
        $em = $manager;
        $em->getConnection()->getConfiguration()->setSQLLogger(null);

        $date = date('Y-m-d H:i:s');
        $rows = [];
        for ($i = 1; $i <= 10000000; ++$i) {
            $title = 'Идея #'.$i;
            $rows[] = "('$title', '$date', false)";

            if (0 === count($rows) % 100000) {
                $this->flush($em, $rows);
            }
        }
    }

    /**
     * @param string[] $rows
     *
     * @throws \Doctrine\DBAL\Exception
     */
    private function flush(EntityManagerInterface $em, array &$rows): void
    {
        $sql = 'insert into ideas (title, created_at, completed) values '.implode(',', $rows).';';
        $em->getConnection()->prepare($sql)->executeQuery();
        $rows = [];
    }
}
