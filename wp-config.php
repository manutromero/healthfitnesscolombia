<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress_v2' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ' x/_>IVHHQ`7{S#TE+aWTh0<r6pKoXX{:lZfe1SOXNZ/%zZXLZ`2dta#Bu:W=K :' );
define( 'SECURE_AUTH_KEY',  '-8^t+kZGR@i`]ii:fA].i.+k_}o|AwqHRAp^A~UWl&*Y-5JHCO:LP3YFe?iDY|Qh' );
define( 'LOGGED_IN_KEY',    'V+{@G%gQtDf[dQ=-)(@Ar~?UehQ[Rot-gg:W?##E(2C1r$qZS6;8^Bp8C)qZuB}n' );
define( 'NONCE_KEY',        'q/](:r/2.FY2XgLFt~Q11x,N2w@_HIQtlYL0gnw? 3K7Vyq&?|g:?!yrm&aMV^~F' );
define( 'AUTH_SALT',        '[Ip~icYU@a`SQ_h^__lV{0Ke55l%7A ;XQv83$tcu6.KVk^Ur&DMRV+F4Z>>B:}y' );
define( 'SECURE_AUTH_SALT', 'av5wO3xXQIhPsNs@0y?|r6rI}t^t#(Hmjy<|8kqlw>j&x%qKrh<Y{[p>}V)#XOI9' );
define( 'LOGGED_IN_SALT',   'Ya=v!~o5Xp)N&PW-9F%9_?Ry,MTbI.VL$6z#&+6!~s`2y|l<p-]Ne~hmYxHk b|V' );
define( 'NONCE_SALT',       'w$de++.P^~9d7h&8Uu8!jZZjM&qJ N{%?~}<<}se4$w`vlSPSfZlJ7{_H$K6K:t}' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
