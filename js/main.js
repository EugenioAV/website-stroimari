$(document).ready(function () {
    $(window).on('scroll', function () {
        let navidation_bar = $('#navigation_bar');
        let coord_navigation_bar = $('#header').height() + navidation_bar.height();
        let scrolltop = $(this).scrollTop();

        if (scrolltop >= coord_navigation_bar) {
            navidation_bar.addClass('navigation_bar_fixed');
        } else if (scrolltop < coord_navigation_bar) {
            navidation_bar.removeClass('navigation_bar_fixed');
        }
    });
});