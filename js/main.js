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
            '<a href=' + url + ' class="button" download><i class="fa fa-download"></i>Скачать PDF-файл с проектом</a>');
    }

    $('#project_view_modal').modal('show');
}

function send_services_feedback() {
    let name = $('#services_contact_name').val();
    let phone = $('#services_contact_phone').val();
    let text = $('#services_question').val();
    let error = check_input_value(true, name, phone, text);

    if (!error)
        send_email(name, phone, text)
}

function send_main_feedback() {
    let name = $('#main_contact_name').val();
    let phone = $('#main_contact_phone').val();
    let text = $('#main_question').val();
    let error = check_input_value(false, name, phone, text);

    if (!error)
        send_email(name, phone, text)
}

function send_email(name, phone, text) {
    $('#main_feedback_button').attr("disabled", true);
    $('#services_feedback_button').attr("disabled", true);

    $.ajax({
        type: 'POST',
        url: 'send.php',
        data: {
            "name": name,
            "phone": phone,
            "text": text
        },
        beforeSend: function () {

        },
        success: function (data) {
            $("#report_modal_title").text("Сообщение отправлено");
            $("#report_modal_body").text("Спасибо, наши специалисты ответят Вам в течение 24 рабочих часов!");

            $('#report_modal').modal('show');

            $('input[type="text"]').val('');
            $('#services_question').val('');
            $('#main_question').val('');
        },
        complete: function (data) {
            $('#main_feedback_button').attr("disabled", false);
            $('#services_feedback_button').attr("disabled", false);
        },
        error: function (jqXHR, exception) {
            $("#report_modal_title").text("Сообщение не отправлено");
            $("#report_modal_body").text("Извините, по техническим причинам сообщение не отправлено. Вы можете попробовать отправить запрос позже или связаться с нами по телефону +7 (937) 111 70 50. Спасибо за понимание!");

            $('#report_modal').modal('show');
        }
    });
}

function check_input_value(is_services_feedback, name, phone, text) {
    let error = '';

    if (!name) {
        error = 'Введите пожалуйста Ваше имя';
    }

    if (ValidPhone(phone) !== true) {
        if (error) {
            error += ', корректный телефон';
        } else {
            error = 'Введите пожалуйста корректно Ваш телефон для связи';
        }
    }

    if (!text) {
        if (error) {
            if (is_services_feedback)
                error += ', вопрос';
            else
                error += ', комментарий';
        } else {
            error = 'Введите пожалуйста Ваш комментарий';
        }
    }

    if (error) {
        error += ', чтобы мы смогли оперативно и качественно ответить Вам.';

        $("#report_modal_title").text("Сообщение не отправлено");
        $("#report_modal_body").text(error);

        $('#report_modal').modal('show');
    }

    return error;
}

function ValidPhone(phone) {
    let re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    let result = re.test(phone);

    return result;
}