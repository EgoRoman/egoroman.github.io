//preloader
$(window).on('load', function () {
    var preloader_wrap = $('#preloader_wrap'),
        preloader = $('#preloader');
    preloader.fadeOut();
    preloader_wrap.delay(350).fadeOut('slow');
});

$(function () {
    // magnificPopup
    $('.image-link').magnificPopup({
        type: 'image'
    });
    $('.main-section a.btn').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            tPrev: 'Previous (Left arrow key)',
            tNext: 'Next (Right arrow key)'
        },
        items: [
            {
                src: '/img/graph-1.png'
            },
            {
                src: '/img/graph-2.png'
            },
            {
                src: '/img/graph-3.png'
            }
        ]
    });

    // Modal
    $('.modal .close').click(function () {
        $('.modal').fadeOut();
    });
    $(window).click(function (e) {
        if (e.target.className === 'modal') {
            $('.modal').fadeOut();
        }
    });
    $('footer .middle-col .btn').click(function (e) {
        e.preventDefault();
        $('#formModal').fadeIn();
    });

    // scrollReaveal animation
    if (window.matchMedia("(min-width: 970px)").matches) {
        window.sr = ScrollReveal();
        var sr_list = {
            origin: 'bottom',
            distance: '100px',
            easing: 'ease',
            duration: 1500
        };
        var sr_title = {
            origin: 'top',
            distance: '30px',
            scale: 1.1,
            duration: 1500

        };
        var sr_sub_title = {
            origin: 'bottom',
            distance: '60px',
            scale: 0.8,
            duration: 1500,
            delay: 50
        };
        var sr_left = {
            origin: 'left',
            distance: '120px',
            scale: 0.8,
            duration: 1500,
            delay: 50
        };
        if (sr.isSupported()) {
            sr.reveal('.section-2 .grid li', sr_list, 100);
            sr.reveal('.section-4 .grid li', sr_list, 100);
            sr.reveal('.main-caption', sr_title);
            sr.reveal('.sub-caption', sr_sub_title);
            sr.reveal('.description', sr_sub_title);
            sr.reveal('.sr_left', sr_left);
        }
    }


    $('#phone, #phoneModal').mask('+7 (000) 000-0000');
    // form
    $('form').submit(function (e) {
        e.preventDefault();
        var output = true,
            array = $(this).serialize();
        $('input.required', this).addClass('err');
        var name = this.name, phone = this.phone;
        $.trim(name.value).length >= 1 ? $(name).removeClass('err') : output = false;
        $.trim(phone.value).length >= 1 ? $(phone).removeClass('err') : output = false;
        if (output) {
            $.post('/form.php', array, function (data) {
                if (data == 1) {
                    $('input[type="text"], input[type="number"]').val('');
                    // $(".my-modal").hide();
                    $("#formModal").hide();
                    $("#resultModal").fadeIn();
                } else {
                    alert('Ошибка функции mail !')
                }
            })
        }
    });

    // navbar
    $('.btn-navbar').click(function (e) {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.navbar .nav').slideUp();
        } else {
            $(this).addClass('active');
            $('.navbar .nav').slideDown();
        }
        e.preventDefault();
    });

    $('.navbar nav li a.section-link').each(function () {
        $(this).click(function (e) {
            if ($(window).width() < 992) {
                $('.btn-navbar').removeClass('active');
                $('.navbar .nav').slideUp();
            }
            e.preventDefault();
            var href = $(this).attr('href');
            var pos = $(href).offset().top;
            $('html, body').animate({
                scrollTop: pos - 50
            }, 1000);
        })
    });

    if ($(window).width() > 991) {
        $(window).scroll(function () {
            var trigger = $('.main-section .title').offset().top;
            if ($(window).scrollTop() >= trigger) {
                $('header').addClass('fixed');
                $('.navbar .mail').fadeOut();
                $('.navbar .logo img').stop().animate({height: 30}, 300);
                $('header').stop().animate({'padding': '0'}, 300);
            } else {
                $('header').removeClass('fixed');
                $('.navbar .mail').fadeIn();
                $('.navbar .logo img').stop().animate({height: 45}, 300);
                $('header').stop().animate({'padding': '25px 0'}, 300);
            }
        })
    }
});

// Map
function initMap() {
    var kms = {lat: 55.79135383, lng: 37.65764594};
    var center = $(document).width() < 480 ? {lat: 55.79135383, lng: 37.65764594} : {
        lat: 55.79148653,
        lng: 37.65541434
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: center,
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
            {
                "stylers": [
                    {
                        "hue": "#ff1a00"
                    },
                    {
                        "invert_lightness": true
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 33
                    },
                    {
                        "gamma": 0.5
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2D333C"
                    }
                ]
            }
        ]
    });
    var marker_image = '/img/marker_image.png';
    var marker = new google.maps.Marker({
        position: kms,
        map: map,
        icon: marker_image
    });
}