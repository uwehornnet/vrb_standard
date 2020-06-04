<?php

/**
 * Plugin Name: VRB with React and Redux
 * Description: VRB Plugin to book courses directly - standard VABS UI with React and Redux
 * Version: 1.0
 * Author: Uwe Horn
 * Author URI http://uwe-horn.net
 * License: GPLv2 or later
 * Text Domain: vrb
 */

defined('ABSPATH') or die('You can not access this file.');

define('VABS_STANDARD_PLUGINPATH', plugin_dir_path( __FILE__ ));


include_once('public/plugin/dependencies.php');
include_once('public/plugin/adminpage.php');
include_once('public/plugin/shortcode.php');
include_once('public/plugin/index.php');


function init_vrb()
{
    $plugin = new VRB_Connection_Plugin();
}

init_vrb();


