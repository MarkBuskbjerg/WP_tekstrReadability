<?php
/*
Plugin Name: Tekstr Readability
Plugin URI: https://tekstr.dk
Description: The Tekstr plugin scores and helps to improve readability on your posts and pages in the WordPress text editor
Version: 0.1.0
Author: Mark Buskbjerg from Tekstr
Author URI: https://markbuskbjerg.dk
Text Domain: tekstr
*/

require plugin_dir_path( __FILE__ ) . 'lib/metaboxes.php';

add_editor_style( plugins_url('/css/tekstr-style.css', __FILE__) );

/**
 * Load scripts
 * Load scripts before and after TinyMCE to have everything working smoothly with the Tekstr Readability plugin
 * 
 */
function tekstr_load_scripts($hook) {
	if( $hook != 'post.php' ) { 
        return;
    }
    
    wp_enqueue_script('marker-js', 'https://cdn.jsdelivr.net/mark.js/8.6.0/mark.min.js');
}
add_action('admin_enqueue_scripts', 'tekstr_load_scripts');


function custom_after_wp_tiny_mce() {
    printf( '<script type="text/javascript" src="%s"></script>',  plugins_url('/js/tiny.js', __FILE__) );
    printf( '<script type="text/javascript" src="%s"></script>',  plugins_url('/js/stats.js', __FILE__) );
    printf( '<script type="text/javascript" src="%s"></script>',  plugins_url('/js/marktext.js', __FILE__) );
    printf( '<script type="text/javascript" src="%s"></script>',  plugins_url('/js/output.js', __FILE__) );
    printf( '<script type="text/javascript" src="%s"></script>',  plugins_url('/js/reset-marks.js', __FILE__) );
}

add_action( 'after_wp_tiny_mce', 'custom_after_wp_tiny_mce' );