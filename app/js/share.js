var share = {
    config: {
        offset: 120,
        appearWhenScrolledTo: {//%
            start: 5,
            stop: 93
        }
    },
    init: function (config) {
        $.extend(this.config, config);
        this.hide();
        var browserWindow = this.browserWidth();
        var containerWidth = this.contentWidth();
        this.placement(browserWindow, containerWidth);
        $(window).on("resize", this.OnResize);
        $(window).scroll(this.OnScroll);
    },
    browserWidth: function () {
        return $(document).width();
    },
    browserHeight: function () {
        return $(document).height();
    },
    contentWidth: function () {
        return $(".share-widget").width();
    }, contentHeight: function () {
        return $(".share-widget").height();
    },
    placement: function (browserWindow, containerWidth) {
        var sharePosition = ( browserWindow - containerWidth ) / 2 - this.config.offset;
        $(".share-block").css("left", sharePosition);
    },
    show: function () {
        $(".share-block").fadeIn();
    },
    hide: function () {
        $(".share-block").fadeOut();
    },
    OnResize: function () {
        var window = $(this); //this = window
        share.placement(share.browserWidth(), share.contentWidth());
        if (window.width() >= 1280) {
            share.show();
        } else {
            share.hide();
        }
    },
    OnScroll: function () {
        var heightScrolled = $(window).scrollTop();
        var sharePositionActive = ( heightScrolled ) / share.contentHeight() * 100;

        //By default, appear when > than 20%
        if (sharePositionActive >= share.config.appearWhenScrolledTo.start &&
            sharePositionActive <= share.config.appearWhenScrolledTo.stop &&
            $(this).width() >= 1280) {
            share.show();
        } else {
            share.hide();
        }


    }
};
