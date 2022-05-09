<?php 
namespace App\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class MainController extends AbstractController
{

    /**
     *@Route("/", name="article_list")
     */
    public function index()
    {
        return $this->render('index.html.twig');

    }
}