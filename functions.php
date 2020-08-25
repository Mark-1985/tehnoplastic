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
	$urls[] = '/dist/js/chunk-07c9d3c4.js';
	$urls[] = '/dist/js/chunk-0bf79c31.js';
	$urls[] = '/dist/js/chunk-0cda41aa.js';
	$urls[] = '/dist/js/chunk-100e0ca6.js';
	$urls[] = '/dist/js/chunk-15609e94.js';
	$urls[] = '/dist/js/chunk-1a450389.js';
	$urls[] = '/dist/js/chunk-2d0c8db9.js';
	$urls[] = '/dist/js/chunk-2d2094f4.js';
	$urls[] = '/dist/js/chunk-2d21b0fa.js';
	$urls[] = '/dist/js/chunk-396f5c22.js';
	$urls[] = '/dist/js/chunk-39e422af.js';
	$urls[] = '/dist/js/chunk-48a14841.js';
	$urls[] = '/dist/js/chunk-48cbf52c.js';
	$urls[] = '/dist/js/chunk-4bcaa815.js';
	$urls[] = '/dist/js/chunk-68312676.js';
	$urls[] = '/dist/js/chunk-6c859d32.js';
	$urls[] = '/dist/js/chunk-83ccad24.js';
	$urls[] = '/dist/js/chunk-874d3e88.js';
	$urls[] = '/dist/js/chunk-e933e7e2.js';
	$urls[] = '/dist/js/chunk-eb3dfd8c.js';
	$urls[] = '/dist/js/chunk-f57197c4.js';
	$urls[] = '/dist/css/chunk-07c9d3c4.css';
	$urls[] = '/dist/css/chunk-0cda41aa.css';
	$urls[] = '/dist/css/chunk-100e0ca6.css';
	$urls[] = '/dist/css/chunk-15609e94.css';
	$urls[] = '/dist/css/chunk-1a450389.css';
	$urls[] = '/dist/css/chunk-396f5c22.css';
	$urls[] = '/dist/css/chunk-39e422af.css';
	$urls[] = '/dist/css/chunk-48a14841.css';
	$urls[] = '/dist/css/chunk-4bcaa815.css';
	$urls[] = '/dist/css/chunk-68312676.css';
	$urls[] = '/dist/css/chunk-6c859d32.css';
	$urls[] = '/dist/css/chunk-83ccad24.css';
	$urls[] = '/dist/css/chunk-874d3e88.css';
	$urls[] = '/dist/css/chunk-eb3dfd8c.css';
	$urls[] = '/dist/css/chunk-f57197c4.css';	
};
	return $urls;
};


add_filter( 'vuejs-wordpress-theme-starter-app', 'mihdan_add_async_attribute', 100);

// Load scripts
function load_vue_scripts() {
wp_enqueue_script('vuejs-wordpress-theme-starter-app11', get_stylesheet_directory_uri() . '/dist/js/chunk-07c9d3c4.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app21', get_stylesheet_directory_uri() . '/dist/js/chunk-0bf79c31.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app31', get_stylesheet_directory_uri() . '/dist/js/chunk-0cda41aa.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app41', get_stylesheet_directory_uri() . '/dist/js/chunk-100e0ca6.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app51', get_stylesheet_directory_uri() . '/dist/js/chunk-15609e94.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app61', get_stylesheet_directory_uri() . '/dist/js/chunk-1a450389.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app71', get_stylesheet_directory_uri() . '/dist/js/chunk-2d0c8db9.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app81', get_stylesheet_directory_uri() . '/dist/js/chunk-2d2094f4.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app91', get_stylesheet_directory_uri() . '/dist/js/chunk-2d21b0fa.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app10', get_stylesheet_directory_uri() . '/dist/js/chunk-396f5c22.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app32', get_stylesheet_directory_uri() . '/dist/js/chunk-39e422af.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app12', get_stylesheet_directory_uri() . '/dist/js/chunk-48a14841.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app13', get_stylesheet_directory_uri() . '/dist/js/chunk-48cbf52c.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app14', get_stylesheet_directory_uri() . '/dist/js/chunk-4bcaa815.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app15', get_stylesheet_directory_uri() . '/dist/js/chunk-68312676.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app16', get_stylesheet_directory_uri() . '/dist/js/chunk-6c859d32.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app17', get_stylesheet_directory_uri() . '/dist/js/chunk-83ccad24.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app18', get_stylesheet_directory_uri() . '/dist/js/chunk-874d3e88.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app19', get_stylesheet_directory_uri() . '/dist/js/chunk-e933e7e2.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app20', get_stylesheet_directory_uri() . '/dist/js/chunk-eb3dfd8c.js',null);
wp_enqueue_script('vuejs-wordpress-theme-starter-app22', get_stylesheet_directory_uri() . '/dist/js/chunk-f57197c4.js',null);
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
	
wp_enqueue_style('vuejs-wordpress-theme-starter-css11', get_stylesheet_directory_uri() . '/dist/css/chunk-07c9d3c4.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css21', get_stylesheet_directory_uri() . '/dist/css/chunk-0cda41aa.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css31', get_stylesheet_directory_uri() . '/dist/css/chunk-100e0ca6.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css41', get_stylesheet_directory_uri() . '/dist/css/chunk-15609e94.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css51', get_stylesheet_directory_uri() . '/dist/css/chunk-1a450389.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css61', get_stylesheet_directory_uri() . '/dist/css/chunk-396f5c22.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css71', get_stylesheet_directory_uri() . '/dist/css/chunk-39e422af.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css81', get_stylesheet_directory_uri() . '/dist/css/chunk-48a14841.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css91', get_stylesheet_directory_uri() . '/dist/css/chunk-4bcaa815.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css10', get_stylesheet_directory_uri() . '/dist/css/chunk-68312676.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css16', get_stylesheet_directory_uri() . '/dist/css/chunk-6c859d32.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css12', get_stylesheet_directory_uri() . '/dist/css/chunk-83ccad24.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css13', get_stylesheet_directory_uri() . '/dist/css/chunk-874d3e88.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css14', get_stylesheet_directory_uri() . '/dist/css/chunk-eb3dfd8c.css', null);
wp_enqueue_style('vuejs-wordpress-theme-starter-css15', get_stylesheet_directory_uri() . '/dist/css/chunk-f57197c4.css', null);

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
