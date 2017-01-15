
var search = {
    init: function () {
        $('#search').focus(this.onFocus);
        $('#search').blur(this.onBlur);
    },
    onFocus: function () {
        $(this).attr('data-default', $(this).width());
        $(this).animate({width: 150}, 'slow');
    },
    onBlur: function () {
        var defaultWidth = $(this).attr('data-default');
        $(this).animate({width: defaultWidth}, 'fast');
    }
}