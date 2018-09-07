<?php 

/*
 *
 * This is for the meta box showing data 
 * 
 */

/* Meta box setup function. */
function tekstr_post_meta_boxes_setup() {

    /* Add meta boxes on the 'add_meta_boxes' hook. */
    add_action( 'add_meta_boxes', 'tekstr_add_post_meta_boxes' );
}

/* Fire our meta box setup function on the post editor screen. */
add_action( 'load-post.php', 'tekstr_post_meta_boxes_setup' );
add_action( 'load-post-new.php', 'tekstr_post_meta_boxes_setup' );

function tekstr_add_post_meta_boxes() {

    add_meta_box(
      'tekstr-post-class',      // Unique ID
      esc_html__( 'Læsbarhed', 'example' ),    // Title
      'tekstr_post_class_meta_box',   // Callback function
      'post',         // Admin page (or post type)
      'side',         // Context
      'high'         // Priority
    );
  }

  /* Display the post meta box. */
function tekstr_post_class_meta_box( $post ) { ?>

    <?php wp_nonce_field( basename( __FILE__ ), 'tekstr_post_class_nonce' ); ?>
    
    <p>LIX score er <span class="lix">xx</span></p>
    <div class="form-group">
        <div class="mt-radio-list">
            <label class="mt-radio" for="markerState1">
                <input id="markerState1" name="markerState" type="radio" value="markLongWord"> Marker
                <z class="longWordCount">?</z> lange ord
                <span></span>
            </label><br/>
            <label class="mt-radio">
                <input id="markerState2" name="markerState" type="radio" value="markLongSentence"> Marker
                <z class="longSentenceCounter">?</z> lange sætninger
                <span></span>
            </label><br/>
            <label class="mt-radio">
                <input id="markerState3" name="markerState" type="radio" value="markLongSentence"> Marker
                <z class="extremeLongSentenceCounter">?</z> meget lange sætninger
                <span></span>
            </label><br/>
            <label class="mt-radio">
                <input id="markerState0" name="markerState" type="radio" value="markNone" checked> Fjern alle markeringer
                <span></span>
            </label><br/>
        </div>
    </div>
  <?php }