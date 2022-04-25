<?php

namespace Tests\Controller\V1;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class IdeaControllerTest extends WebTestCase
{
    private string $url = '/api/v1/ideas';

    private KernelBrowser $client;

    public function testCreateSuccess()
    {
        $data = '{"title": "test title"}';

        $this->client->request(Request::METHOD_POST, $this->url, [], [], [], $data);

        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(Response::HTTP_CREATED);
    }

    public function testCreateValidationFail()
    {
        $data = '{"title": ""}';

        $this->client->request(Request::METHOD_POST, $this->url, [], [], [], $data);

        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
    }

    public function testListSuccess()
    {
        $this->client->request(Request::METHOD_GET, $this->url.'/page');
        $this->assertResponseIsSuccessful();

        $this->client->request(Request::METHOD_GET, $this->url.'/list');
        $this->assertResponseIsSuccessful();
    }

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }
}
