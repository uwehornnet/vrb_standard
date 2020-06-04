<?php

class VRBShortcode
{
    protected $options;

    public function __construct()
    {
        add_shortcode('vabs_booking', array( $this, 'init' ));
    }


    /**
     * @param $atts
     * @return string
     */
    public function init($atts)
    {
        return '<div class="vrb" data-form="' . $atts['form'] . '" data-type="' . $atts['type'] . '" data-query="' . $atts['query'] . '" data-redirect="' . $atts['redirect'] . '" data-agb="' . $atts['agb'] . '" data-datenschutz="' . $atts['datenschutz'] . '"></div>';

    }

}