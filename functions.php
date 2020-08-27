<?php
// Remove all default WP template redirects/lookups
remove_action( 'template_redirect', 'redirect_canonical' );

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
	add_rewrite_rule( '^/(.+)/?', 'index.php', 'top' );
}
add_action( 'init', 'remove_redirects' );

//hooks
function mihdan_add_async_attribute( $tag, $handle ) {
	if ( 'my-js-handle' !== $handle ) {
		 return $tag;
	}

	return str_replace( ' src', ' async="async" src', $tag );
}

add_filter( 'wp_resource_hints', 'filter_function_name_2244', 10, 2 );
function filter_function_name_2244( $urls, $relation_type ){	
	if ( 'prerender' === $relation_type ){
	$urls[] = '/dist//js/chunk-0cda41aa.js';
	$urls[] = '/dist//js/chunk-100e0ca6.js';
	$urls[] = '/dist//js/chunk-126d4abe.js';
	$urls[] = '/dist//js/chunk-2d22dd1f.js';
	$urls[] = '/dist//js/chunk-39cfa046.js';
	$urls[] = '/dist//js/chunk-4bcaa815.js';
	$urls[] = '/dist//js/chunk-5fb36ec0.js';
	$urls[] = '/dist//js/chunk-7049252e.js';
	$urls[] = '/dist//js/chunk-7aac1130.js';
	$urls[] = '/dist//js/chunk-8f3711ba.js';
	$urls[] = '/dist//js/chunk-e933e7e2.js';
	$urls[] = '/dist/css/chunk-0cda41aa.css';
	$urls[] = '/dist/css/chunk-100e0ca6.css';
	$urls[] = '/dist/css/chunk-4bcaa815.css';
	$urls[] = '/dist/css/chunk-5fb36ec0.css';
	$urls[] = '/dist/css/chunk-7049252e.css';
	$urls[] = '/dist/css/chunk-7aac1130.css';
	$urls[] = '/dist/css/chunk-8f3711ba.css';
};
	return $urls;
};


add_filter( 'vuejs-wordpress-theme-starter-app', 'mihdan_add_async_attribute', 100);

// Load scripts
function load_vue_scripts() {
wp_enqueue_script('vuejs-wordpress-theme-starter-app11', get_stylesheet_directory_uri() . '/dist/js/chunk-0cda41aa.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app21', get_stylesheet_directory_uri() . '/dist/js/chunk-100e0ca6.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app31', get_stylesheet_directory_uri() . '/dist/js/chunk-126d4abe.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app41', get_stylesheet_directory_uri() . '/dist/js/chunk-2d22dd1f.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app51', get_stylesheet_directory_uri() . '/dist/js/chunk-39cfa046.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app61', get_stylesheet_directory_uri() . '/dist/js/chunk-4bcaa815.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app71', get_stylesheet_directory_uri() . '/dist/js/chunk-5fb36ec0.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app81', get_stylesheet_directory_uri() . '/dist/js/chunk-7049252e.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app91', get_stylesheet_directory_uri() . '/dist/js/chunk-7aac1130.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app10', get_stylesheet_directory_uri() . '/dist/js/chunk-8f3711ba.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app32', get_stylesheet_directory_uri() . '/dist/js/chunk-e933e7e2.js',null);
	wp_enqueue_script(
		'vuejs-wordpress-theme-starter-vandors-js',
		get_stylesheet_directory_uri() . '/dist/js/chunk-vendors.js',
		null,
		filemtime( get_stylesheet_directory() . '/dist/js/chunk-vendors.js' ),
		true
	);	
	wp_enqueue_script('vuejs-wordpress-theme-starter-app', get_stylesheet_directory_uri() . '/dist/js/app.js', null,
		filemtime( get_stylesheet_directory() . '/dist/js/app.js' ),
		true
	);	
	
wp_enqueue_style('vuejs-wordpress-theme-starter-css11', get_stylesheet_directory_uri() . '/dist/css/chunk-0cda41aa.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css21', get_stylesheet_directory_uri() . '/dist/css/chunk-100e0ca6.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css31', get_stylesheet_directory_uri() . '/dist/css/chunk-4bcaa815.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css41', get_stylesheet_directory_uri() . '/dist/css/chunk-5fb36ec0.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css51', get_stylesheet_directory_uri() . '/dist/css/chunk-7049252e.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css61', get_stylesheet_directory_uri() . '/dist/css/chunk-7aac1130.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css71', get_stylesheet_directory_uri() . '/dist/css/chunk-8f3711ba.css', null);

	wp_enqueue_style(
		'vuejs-wordpress-theme-starter-chunk-vendors',
		get_stylesheet_directory_uri() . '/dist/css/chunk-vendors.css',
		null,
		filemtime( get_stylesheet_directory() . '/dist/css/chunk-vendors.css' )
	); 
	wp_enqueue_style('vuejs-wordpress-theme-starter-css', get_stylesheet_directory_uri() . '/dist/css/app.css', null,
		filemtime( get_stylesheet_directory() . '/dist/css/app.css' )
	); 
}
add_action( 'wp_enqueue_scripts', 'load_vue_scripts', 100 );

/**
 * Customizer additions.
 */
require get_template_directory() . '/includes/navigations.php';


/* 
add_action ('wp_print_scripts','remove_javascript',100);
function remove_javascript () {
    wp_deregister_script ('jquery');
	 wp_deregister_script ('wp-embed');
	 wp_deregister_style('woocommercebulkdiscount-style');
	 wp_deregister_style('woocommerce');
	 wp_deregister_style('woocommerce-general');
	 wp_dequeue_style('woocommerce-layout');
	 wp_dequeue_style( 'woocommerce_frontend_styles' );
        wp_dequeue_style( 'woocommerce_fancybox_styles' );
        wp_dequeue_style( 'woocommerce_chosen_styles' );
        wp_dequeue_style( 'woocommerce_prettyPhoto_css' );
        wp_dequeue_script( 'wc_price_slider' );
        wp_dequeue_script( 'wc-single-product' );
        wp_dequeue_script( 'wc-add-to-cart' );
        wp_dequeue_script( 'wc-cart-fragments' );
        wp_dequeue_script( 'wc-checkout' );
        wp_dequeue_script( 'wc-add-to-cart-variation' );
        wp_dequeue_script( 'wc-single-product' );
        wp_dequeue_script( 'wc-cart' );
        wp_dequeue_script( 'wc-chosen' );
        wp_dequeue_script( 'woocommerce' );
        wp_dequeue_script( 'prettyPhoto' );
        wp_dequeue_script( 'prettyPhoto-init' );
        wp_dequeue_script( 'jquery-blockui' );
        wp_dequeue_script( 'jquery-placeholder' );
        wp_dequeue_script( 'fancybox' );
        wp_dequeue_script( 'jqueryui' );

} */

add_action(
	'wp_enqueue_scripts',
	function() {
		 // Если это НЕ страницы магазина.
			  // Отключаем стили магазина.
			  wp_dequeue_style( 'woocommerce_frontend_styles' );
			  wp_dequeue_style( 'woocommerce-general');
			  wp_dequeue_style( 'wc-block-vendors-style-css');
			  wp_dequeue_style( 'woocommerce-layout' );
			  wp_dequeue_style( 'woocommerce-smallscreen' );
			  wp_dequeue_style( 'woocommerce_fancybox_styles' );
			  wp_dequeue_style( 'woocommerce_chosen_styles' );
			  wp_dequeue_style( 'woocommerce_prettyPhoto_css' );
			  wp_dequeue_style( 'select2' );
				
			  // Отключаем скрипты магазина.
			  wp_dequeue_script( 'wc-add-payment-method' );
			  wp_dequeue_script( 'wc-lost-password' );
			  wp_dequeue_script( 'wc_price_slider' );
			  wp_dequeue_script( 'wc-single-product' );
			  wp_dequeue_script( 'wc-add-to-cart' );
			  wp_dequeue_script( 'wc-cart-fragments' );
			  wp_dequeue_script( 'wc-credit-card-form' );
			  wp_dequeue_script( 'wc-checkout' );
			  wp_dequeue_script( 'wc-add-to-cart-variation' );
			  wp_dequeue_script( 'wc-single-product' );
			  wp_dequeue_script( 'wc-cart' ); 
			  wp_dequeue_script( 'wc-chosen' );
			  wp_dequeue_script( 'woocommerce' );
			  wp_dequeue_script( 'prettyPhoto' );
			  wp_dequeue_script( 'prettyPhoto-init' );
			  wp_deregister_script ('jquery');
			  wp_dequeue_script( 'jquery-blockui' );
			  wp_dequeue_script( 'jquery-placeholder' );
			  wp_dequeue_script( 'jquery-payment' );
			  wp_dequeue_script( 'jqueryui' );
			  wp_dequeue_script( 'fancybox' );
			  wp_dequeue_script( 'wcqi-js' );
	},
	99
);
