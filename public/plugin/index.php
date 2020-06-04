<?php

class VRB_Connection_Plugin
{
    protected $dependencies;
    protected $adminpage;
    protected $bookingshortcode;

    public function __construct()
    {
        $this->dependencies = new VRBDependencies();
        $this->adminpage = new VRBAdminPage();
        $this->bookingshortcode = new VRBShortcode();
    }

}