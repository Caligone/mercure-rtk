<?php

namespace App\Controller;

use App\Service\Redis;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/api/number')]
    public function getNumber(Redis $redis, HubInterface $hub): Response
    {
        $number = $redis->get('number');
        return $this->json($number);
    }

    #[Route('/api/inc')]
    public function increment(Redis $redis, HubInterface $hub): Response
    {
        $number = $redis->incr('number');
        $update = new Update(
            'https://example.com/number',
            json_encode($number)
        );
        $hub->publish($update);
        return $this->json($number);
    }

    #[Route('/')]
    public function home(): Response
    {
        return $this->render('home.html.twig');
    }
}