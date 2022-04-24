<?php

namespace App\DataFixtures\ORM;

use App\Entity\Idea;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Persistence\ObjectManager;

class IdeaFixtures extends Fixture implements FixtureGroupInterface
{
    public static function getGroups(): array
    {
        return ['ORM'];
    }

    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= 100; ++$i) {
            $idea = (new Idea())
                ->setTitle(sprintf('Идея #%d', $i))
            ;
            $manager->persist($idea);
        }
        $manager->flush();
    }
}
