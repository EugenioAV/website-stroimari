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

function pdf_view(e) {
    let id = e.id;
    let url = './pdf/' + id + '.pdf';

    if (PDFObject.supportsPDFs) {
        PDFObject.embed(url, "#pdf_object");
    } else {
        let body = $('.project-modal-body');

        body.html('<p>Ваш браузер не поддерживает просмотр PDF-файлов, но вы можете скачать его, чтобы посмотреть' +
            ' готовые проекты нашей компании на Вашем устройстве.</p>' +
            '<a href=' + url + ' class="button" download><i class="fa fa-download"></i>Скачать PDF-файл с проектом</a>')
    }

    $('#project_view_modal').modal('show');
}
