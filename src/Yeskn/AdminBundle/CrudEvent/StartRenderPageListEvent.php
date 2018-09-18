<?php

/**
 * This file is part of project wpcraft.
 *
 * Author: Jake
 * Create: 2018-09-17 22:28:17
 */

namespace Yeskn\AdminBundle\CrudEvent;

use Symfony\Component\Routing\RouterInterface;
use Yeskn\MainBundle\Entity\Page;
use Yeskn\MainBundle\Twig\GlobalValue;

class StartRenderPageListEvent implements CrudEventInterface
{
    private $entityName = '页面';

    /** @var Page[] */
    private $list;

    private $globalValue;

    private $router;

    public function __construct($list, GlobalValue $globalValue, RouterInterface $router)
    {
        $this->list = $list;
        $this->globalValue = $globalValue;
        $this->router = $router;
    }

    public function execute()
    {
        $result = [];
        $ids = [];

        foreach ($this->list as $item) {
            $ids[] = $item->getId();

            $result[] = [
                $item->getId(),
                sprintf("<a href='%s'>%s</a>", $item->getUri(), $item->getTitle()),
                $item->getStatus() ? '启用' : '未启用',
                $this->globalValue->ago($item->getCreatedAt())
            ];
        }

        return [
            'columns' => ['ID', '标题', '状态', '创建时间'],
            'entityName' => $this->entityName,
            'list' => $result,
            'ids' => $ids
        ];
    }
}