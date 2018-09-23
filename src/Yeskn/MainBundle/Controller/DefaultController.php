<?php

/**
 * This file is part of project yeskn-studio/wpcraft.
 *
 * Author: Jaggle
 * Create: 2018-09-12 14:30:12
 */

namespace Yeskn\MainBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $tab = $request->get('tab');
        $page = $request->get('page', 1);

        $blogRepo = $this->getDoctrine()->getRepository('YesknMainBundle:Blog');

        $blogList = $blogRepo->findBy([], ['createdAt' => 'DESC']);

        return $this->forward('YesknMainBundle:Common:homeList', [
            'tab' => $tab,
            'page' => $page,
            'scope' => 'home',
            'blogList' => $blogList
        ]);
    }

    /**
     * @Route("/about", name="about")
     */
    public function aboutAction()
    {
        return $this->render('@YesknMain/about.html.twig');
    }

    /**
     * @Route("/contribute", name="contribute")
     */
    public function contributeAction()
    {
        return new Response();
    }
}
