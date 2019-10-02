(function ($) {
    "use strict";
    
    var getElementSettings = function ($element) {
		var elementSettings  = {},
			modelCID         = $element.data('model-cid');

		if ( isEditMode && modelCID ) {
			var settings 		= elementorFrontend.config.elements.data[ modelCID ],
				settingsKeys 	= elementorFrontend.config.elements.keys[ settings.attributes.widgetType || settings.attributes.elType ];

			jQuery.each( settings.getActiveControls(), function( controlKey ) {
				if ( -1 !== settingsKeys.indexOf( controlKey ) ) {
					elementSettings[ controlKey ] = settings.attributes[ controlKey ];
				}
			} );
		} else {
			elementSettings = $element.data('settings') || {};
		}

		return elementSettings;
	};

    var isEditMode = false;

	 var PPVideo = {

		/**
		 * Auto Play Video
		 */

		_play: function( $selector ) {

			var $iframe 		= $( "<iframe/>" );
	        var $vid_src 		= $selector.data( 'src' );

	        if ( 0 == $selector.find( 'iframe' ).length ) {

				$iframe.attr( 'src', $vid_src );
				$iframe.attr( 'frameborder', '0' );
				$iframe.attr( 'allowfullscreen', '1' );
				$iframe.attr( 'allow', 'autoplay;encrypted-media;' );

				$selector.html( $iframe );
	        }
		}
	}
	
	var DeviceHandler = function ($scope, $) {
		var device_elem				= $scope.find('.pp-device-container').eq(0),
            elementSettings         = getElementSettings( $scope ),
			$selector           	= $scope.find( '.pp-video' ).eq(0),
			$video_obj				= $scope.find( '.pp-video-player-source' ),
			video					= $video_obj[0],
			playbtn					= $scope.find( '.pp-player-controls-play' ),
			rewindbtn				= $scope.find( '.pp-player-controls-rewind'),
			controls				= $scope.find( '.pp-video-player-controls'),
			control_bar				= $scope.find( '.pp-player-controls-bar'),
			fs_control				= $scope.find( '.pp-player-controls-fs'),
			restart_on_pause		= elementSettings.restart_on_pause,
			stop_others				= elementSettings.stop_others,
			auto_play				= elementSettings.autoplay,
			playback_speed			= elementSettings.playback_speed,
			end_at_last_frame		= elementSettings.end_at_last_frame,
            settings            	= $selector.data('settings'),
            $video_play         	= $scope.find( '.pp-video-play' ),
            $orientation_control	= $scope.find( '.pp-device-orientation .fas.fa-mobile' );
        
            $video_play.off( 'click' ).on( 'click', function( e ) {

                e.preventDefault();
                
                var $selector 	= $( this ).find( '.pp-video-player' );

                PPVideo._play( $selector );

            });

            if ( $video_play.data( 'autoplay' ) == '1' ) {

                PPVideo._play( $scope.find( '.pp-video-player' ) );
                
            };
		
		//var isBuilderActive = <?php echo ( FLBuilderModel::is_builder_active() ) ? 'true' : 'false'; ?>;
		//var restart_on_pause = false;
		/*if( ! isBuilderActive ){
			$(nodeclass + ' .pp-player-controls-rewind.pp-video-button').hide();
		}*/
		
		$orientation_control.click(function(e){
			if( $(this).hasClass( 'pp-mobile-icon-portrait' ) ){
				$scope.find( '.pp-device-container' ).removeClass( 'pp-device-orientation-portrait' );
				$scope.find( '.pp-device-container' ).addClass( 'pp-device-orientation-landscape' );
				$(this).removeClass( 'pp-mobile-icon-portrait' );
				$(this).addClass( 'pp-mobile-icon-landscape' );
			}
			else if( $(this).hasClass( 'pp-mobile-icon-landscape' ) ){
				$scope.find( '.pp-device-container' ).removeClass( 'pp-device-orientation-landscape' );
				$scope.find( '.pp-device-container' ).addClass( 'pp-device-orientation-portrait' );
				$(this).addClass( 'pp-mobile-icon-portrait' );
				$(this).removeClass( 'pp-mobile-icon-landscape' );
			}
		});
		
		if ( 'yes' === restart_on_pause ) {
			restart_on_pause = true;
		}
		
		if ( 'yes' === stop_others ) {
			$("video").on("play", function() {
				$("video").not(this).each(function(index, video) {
					plybtn = $(video).parent().find('.pp-player-controls-play');
					plybtn.removeClass('fa-pause');
					plybtn.addClass('fa-play');
					video.pause();
				});
			});
		}
		
		/*<?php
		if ( ! empty( $settings->hover_controls_color ) ) {
			?>
				$(nodeclass + ' .pp-player-controls-bar').on("hover", function() {
					$(nodeclass + ' .pp-player-control-progress').children().css('background', '<?php echo pp_get_color_value( $settings->hover_controls_color ); ?>');
				});
				<?php
		}
		?>*/

		//get HTML5 video time duration
		$video_obj.on('loadedmetadata', function() {
			if ( 'yes' === auto_play ) {
				playbtn.first().trigger('click');
			}

			//playback speed.
			video.playbackRate = playback_speed.size;
			var date = new Date(null);
			date.setSeconds(video.duration); // specify value for SECONDS here
			var timeString = date.toISOString().substr(11, 8);
			$scope.find( '.pp-player-controls-duration' ).text(timeString);
		});

		//update HTML5 video current play time
		$video_obj.on('timeupdate', function() {
			var currentPos = video.currentTime; //Get currenttime
			var maxduration = video.duration; //Get video duration
			var percentage = 100 * currentPos / maxduration; //in %
			$scope.find( '.pp-player-controls-progress-time.pp-player-control-progress-inner' ).css('width', percentage+'%');
			var date = new Date(null);
			date.setSeconds(video.currentTime); // specify value for SECONDS here
			var timeString = date.toISOString().substr(11, 8);
			$scope.find( '.pp-player-controls-time' ).text(timeString);
		});

		//on video play
		$video_obj.on('play', function() {
			controls.fadeOut();
			control_bar.fadeOut();
			$scope.find( '.pp-video-player-cover.pp-player-cover' ).css('opacity', '0');
		});

		//on video pause
		$video_obj.on('pause', function() {
			$scope.find( '.pp-player-controls-rewind.pp-video-button' ).show();
		});


		if( ! isEditMode ){

			$scope.find( '.pp-device-media' ).hover(function(){
				controls.fadeIn();
				control_bar.fadeIn();
				$scope.find( '.pp-video-player-cover.pp-player-cover' ).css('opacity', '');
			},
			function(){
				controls.fadeOut();
				control_bar.fadeOut();
				$scope.find( '.pp-video-player-cover.pp-player-cover').css('opacity', '0');
			});
		}

		//mute
		$scope.find( '.pp-player-controls-volume-icon' ).click(function() {
			if( $(this).hasClass('fa-volume-up') ){
				$(this).removeClass('fa-volume-up');
				$(this).addClass('fa-volume-mute');
			}
			else if( $(this).hasClass('fa-volume-mute') ){
				$(this).removeClass('fa-volume-mute');
				$(this).addClass('fa-volume-up');
			}
			video.muted = !video.muted;
			return false;
		});

		//volume bar

		var volumeDrag = false;   /* Drag status */
		$scope.find( '.pp-player-controls-volume-bar' ).mousedown(function(e) {
			volumeDrag = true;
			updateVolumeBar(e.pageX);
		});
		$scope.find( '.pp-player-controls-volume-bar' ).mouseup(function(e) {
			if(volumeDrag) {
				volumeDrag = false;
				updateVolumeBar(e.pageX);
			}
		});
		$scope.find( '.pp-player-controls-volume-bar' ).mousemove(function(e) {
			if(volumeDrag) {
				updateVolumeBar(e.pageX);
			}
		});

		//Update Volume Bar control
		var updateVolumeBar = function(x) {
			var volumebar = $scope.find( '.pp-player-controls-volume-bar' );

			var position = x - volumebar.offset().left; //Click pos
			var volume = position / volumebar.width();
			var percentage = 100 * volume; //in %
			//Check within range
			if(volume > 1) {
				volume = 1;
				percentage = 100;
			}
			if(volume < 0) {
				volume = 0;
				percentage = 0;
			}

			//Update volume 
			video.volume = volume;
			$scope.find( '.pp-player-controls-volume-bar-amount.pp-player-control-progress-inner' ).css('width', percentage+'%');
		};


		//Rewind control
		rewindbtn.on('click', function() {
			video.currentTime = 0;
			return false;
		});

		//Full screen control
		fs_control.on('click', function() {
			if ( video.requestFullscreen ) {
			    video.requestFullscreen();
			} else if ( video.webkitRequestFullscreen ) {
			    video.webkitRequestFullscreen();
			} else if ( video.webkitEnterFullscreen ) {
				video.webkitEnterFullscreen();
			} else if ( video.mozRequestFullScreen ) {
			    video.mozRequestFullScreen();
			} else if ( video.msRequestFullscreen ) {
			    video.msRequestFullscreen();
			} else {
				alert('Your browser doesn\'t support fullscreen');
			}
		});

		var timeDrag = false;   /* Drag status */
		$scope.find( '.pp-player-controls-progress' ).mousedown(function(e) {
			timeDrag = true;
			updatebar(e.pageX);
		});
		$scope.find( '.pp-player-controls-progress' ).mouseup(function(e) {
			if(timeDrag) {
				timeDrag = false;
				updatebar(e.pageX);
			}
		});
		$scope.find( '.pp-player-controls-progress' ).mousemove(function(e) {
			if(timeDrag) {
				updatebar(e.pageX);
			}
		});

		//Update Progress Bar control
		var updatebar = function(x) {
			var progress = $scope.find( '.pp-player-controls-progress' );
			var maxduration = video.duration; //Video duraiton
			var position = x - progress.offset().left; //Click pos
			var percentage = 100 * position / progress.width();

			//Check within range
			if(percentage > 100) {
				percentage = 100;
			}
			if(percentage < 0) {
				percentage = 0;
			}

			//Update progress bar and video currenttime
			video.currentTime = maxduration * percentage / 100;
			$scope.find( '.pp-player-controls-progress-time.pp-player-control-progress-inner' ).css('width', percentage+'%');


			if ( 'yes' === end_at_last_frame && 'yes' !== loop ) {
				if( 100 === percentage ){
					plybtn = $scope.find( ' .pp-player-controls-play');
					plybtn.removeClass('fa-pause');
					plybtn.addClass('fa-play');
				}
			}
		};


		playbtn.on("click", function (e) {
			if( $(this).hasClass('fa-play') ) {
				video.play();
				playbtn.removeClass('fa-play');
				playbtn.addClass('fa-pause');
			}
			else if( $(this).hasClass('fa-pause') ){
				video.pause();
				playbtn.removeClass('fa-pause');
				playbtn.addClass('fa-play');
				if ( restart_on_pause ) {
					video.currentTime = 0;
				}

			}
			return false;
		});
	};
    
    $(window).on('elementor/frontend/init', function () {
        if ( elementorFrontend.isEditMode() ) {
			isEditMode = true;
		}
        
        elementorFrontend.hooks.addAction('frontend/element_ready/pp-devices.default', DeviceHandler);
    });
    
}(jQuery));