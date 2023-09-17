<?php

namespace App\Service;

class Redis extends \Redis {
    public function __construct(string $host, int $port) {
        parent::__construct();
        $this->connect($host, $port);
    }
}