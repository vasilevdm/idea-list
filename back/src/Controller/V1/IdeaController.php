<?php

namespace App\Controller\V1;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IdeaController extends AbstractController
{
    /**
     * @Route("/api/v1/idea", name="api.v1.idea")
     */
    public function index(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/IdeaController.php',
        ]);
    }
}
