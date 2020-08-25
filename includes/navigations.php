<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
register_nav_menus(array(
	'primary' => 'Основное',
	'secodary' => 'Вторичное'

));


// create custom function to return nav menu
function custom_wp_menu() {
   // Replace your menu name, slug or ID carefully
   return wp_get_nav_menu_items('ww');
}

// create new endpoint route
add_action( 'rest_api_init', function () {
   register_rest_route( 'wp/v2', 'menu', array(
       'methods' => 'GET',
       'callback' => 'custom_wp_menu',
   ) );
} );
