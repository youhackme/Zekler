var ModalEffects = (function ($) {

    function init() {

        var overlay = $('.md-overlay');

        [].slice.call($('.md-trigger')).forEach(function (el, i) {

            var modal = document.querySelector('#' + el.getAttribute('data-modal'));
            var close = modal.querySelector('.md-close');

            function removeModal(hasPerspective) {

                $(modal).removeClass("md-show");


                if (hasPerspective) {
                    $(document.documentElement).removeClass("md-perspective");
                }
            }

            function removeModalHandler() {

                console.log("closing");
                removeModal($(el).hasClass("md-setperspective"));
            }

            el.addEventListener('click', function (ev) {

                $(modal).addClass("md-show");

                $(overlay).on("click", removeModalHandler);


                if ($(el).hasClass("md-setperspective")) {
                    setTimeout(function () {

                        $(document.documentElemen).addClass("md-perspective");

                        $("p").addClass("md-perspective");


                    }, 25);
                }
            });

            close.addEventListener('click', function (ev) {
                ev.stopPropagation();
                removeModalHandler();
            });

        });

    }

    init();

})(jQuery);