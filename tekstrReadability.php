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

function tekstr_load_scripts($hook) {
 
	if( $hook != 'post.php' ) 
		return;
 
        wp_enqueue_script('marker-js', 'https://cdn.jsdelivr.net/mark.js/8.6.0/mark.min.js');
        wp_enqueue_script( 'app-js', plugins_url( '/js/app.js' , __FILE__ ) );
        
}
add_action('admin_enqueue_scripts', 'tekstr_load_scripts');


function custom_after_wp_tiny_mce() {
    printf( '<script type="text/javascript" src="%s"></script>',  plugins_url('/js/tiny.js', __FILE__) );
    printf( '<script type="text/javascript" src="%s"></script>',  plugins_url('/js/marktext.js', __FILE__) );
    //wp_enqueue_script( 'marktext-js', plugins_url( '/js/marktext.js' , __FILE__ ) );
    //wp_enqueue_script( 'tiny-js', plugins_url( 'js/tiny.js' , __FILE__ ) );
}

add_action( 'after_wp_tiny_mce', 'custom_after_wp_tiny_mce' );