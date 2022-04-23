<?php

namespace Tests\Controller\V1;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class IdeaControllerTest extends WebTestCase
{
    public function testSuccess()
    {
        $client = static::createClient();

        $client->request('GET', '/api/v1/idea');

        $this->assertResponseIsSuccessful();
    }
}