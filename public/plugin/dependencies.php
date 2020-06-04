<?php

class VRBDependencies
{
    protected $options;

    public function __construct()
    {
        add_action( 'admin_enqueue_scripts', array($this, 'enqueue_admin') );
        add_action( 'wp_enqueue_scripts', array($this, 'enqueue') );
    }

    public function enqueue_admin()
    {
        wp_enqueue_style('vrb_plugin_admin_style', plugins_url( 'vrb_standard/assets/css/vrbadmin.css'));
        wp_enqueue_script('vrb_plugin_admin_script', plugins_url( 'vrb_standard/assets/js/vrbadmin.js'), '', '', true);
        wp_localize_script('vrb_plugin_admin_script', 'vabs_obj', array(
            'url' => plugins_url( 'vrb_standard/public/ajax/handler.php')
        ));
    }

    public function enqueue()
    {
        wp_enqueue_style('vrb_plugin_style', plugins_url( 'vrb_standard/assets/css/vrb.css'));
        wp_enqueue_script('vrb_plugin_script', plugins_url( 'vrb_standard/assets/js/vrb.js'), '', '', true);
        wp_localize_script('vrb_plugin_script', 'vabs_obj', array(
            'ajax_url' => plugins_url( 'vrb_standard/public/ajax/handler.php')
        ));
    }
}