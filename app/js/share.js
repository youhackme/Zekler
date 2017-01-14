var shareBlock = {
    config: {
        offset: 120,
        appearWhenScrolledTo: {//%
            start: 5,
            stop: 93
        }
    },
    init: function( config ) {
        $.extend( this.config, config );
        this.hide();
        var browserWindow = this.browserWidth();
        var containerWidth = this.contentWidth();
        this.placement( browserWindow, containerWidth );
        $( window ).on( "resize", this.OnResize );
        $( window ).scroll( this.OnScroll );
    },
    browserWidth: function() {
        return $( document ).width();
    },
    browserHeight: function() {
        return $( document ).height();
    },
    contentWidth: function() {
        return $( ".container-small" ).width();
    }, contentHeight: function() {
        return $( ".container-small" ).height();
    },
    placement: function( browserWindow, containerWidth ) {
        var ShareBlockPosition = ( browserWindow - containerWidth ) / 2 - this.config.offset;
        $( ".share-block" ).css( "left", ShareBlockPosition );
    },
    show: function() {
        $( ".share-block" ).fadeIn();
    },
    hide: function() {
        $( ".share-block" ).fadeOut();
    },
    OnResize: function() {
        var window = $( this ); //this = window
        if ( window.width() >= 1280 ) {
            shareBlock.show();
        } else {
            shareBlock.hide();
        }
    },
    OnScroll: function() {
        var heightScrolled = $( window ).scrollTop();
        var shareBlockPositionActive = ( heightScrolled ) / shareBlock.contentHeight() * 100;

        //By default, appear when > than 20%
        if ( shareBlockPositionActive >= shareBlock.config.appearWhenScrolledTo.start &&
             shareBlockPositionActive <= shareBlock.config.appearWhenScrolledTo.stop ) {
            shareBlock.show();
        } else {
            shareBlock.hide();
        }
    }
};
