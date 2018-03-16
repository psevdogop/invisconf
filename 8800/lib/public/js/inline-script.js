/**
 * Created by trodionov on 24.04.17.
 */
$(function() {
    // Инициализация плагинов
    $(document).ready(function() {
        setTimeout(function() {
                //$('#link-style').remove();
                $('.ability').plugin('ability');
                $('.tariff-table-new').plugin('tariff-table-new');
                $('.theme').plugin('theme');
                $('.ability__list__item.tariff-table-8800--background').height($('.ability__list__item.tariff-table-8800--background').width());
                // $('.examples').plugin('examples');
                // $('.footer-sticky').plugin('footer-sticky');
                // $('.header').plugin('header');

                $('a[href^="#"]').click(function () {
                    elementClick = $(this).attr("href");
                    destination = $(elementClick).offset().top;

                    $('html, body').stop().animate( { scrollTop: destination }, 1100 );

                    return false;
                });
            },
            1000);
    });

    // $(document).on('click', '.request-body-8800__menu-filter__select', function(e){
    //     //console.log(e, this);
    //     //
    //     if ($(this).hasClass('js-editing')) {
    //        // $(this).addClass('js-editing');
    //     } else {
    //         $(this).addClass('js-editing');
    //         // closeEditField.call(this);
    //     }
    //
    //     function closeEditField(obj) {
    //         var self = this;
    //             self.$el = $(obj);
    //
    //             debugger
    //         $(document).bind('mouseup', function(event) {
    //             if (self.$el.has(event.target).length === 0) {
    //
    //                 self.$el.removeClass('js-editing');
    //             }
    //         });
    //     }
    //
    // });

    // $(document).on({
    //     mouseenter: function() {
    //         $('.selector').show();
    //     },
    //     '.request-body-8800__menu-filter__select');

    // var el = document.querySelectorAll(".request-body-8800__menu-filter__select");
    // el.addEventListener("click", modifyText, false);
    //
    // function modifyText() {
    //     console.log(this);
    //     // var t2 = document.getElementById("t2");
    //     // if (t2.firstChild.nodeValue == "три") {
    //     //     t2.firstChild.nodeValue = "два";
    //     // } else {
    //     //     t2.firstChild.nodeValue = "три";
    //     // }
    // }
});
