$(function () {
    $(".drop_down").on("click", function () {
        $(this).find(".arrow-btn-bar").toggleClass("open");
    });
    $('.drop_down > .caption').on('click', function () {
        $(this).parent().toggleClass('open');
    });

    $('.drop_down > .list > .dishes-item').on('click', function () {
        $('.drop_down > .list > .dishes-item').removeClass('selected');
        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').text($(this).text());
    });

    $(document).on('keyup', function (evt) {
        if ((evt.keyCode || evt.which) === 27) {
            $('.drop_down').removeClass('open');
        }
    });

    $(document).on('click', function (evt) {
        if ($(evt.target).closest(".drop_down > .caption").length === 0) {
            $('.drop_down').removeClass('open');
        }
    });

});


$(document).on('click', '.dishes-item', function () {
    let show = $(this).data('show');
    $(show).removeClass("hide").siblings().addClass("hide");
});

$(document).on("click", ".remove-btn", function () {
    $(this).closest(".box").hide();
});


$(document).on("click", ".heart-btn", function () {
    $(this).find(".fa").toggleClass("fa-heart-o").toggleClass("fa-heart");
});

$('.print-btn').on("click",function () {
    window.print();
    return false;
});

$(document).on('click', '.ingredient-category-btn', function () {
    let show = $(this).data('show');
    let c = $(this);
    $(show).removeClass("hide").siblings().addClass("hide");
    $(c).removeClass("hide").addClass("active_ingredient-category").siblings().removeClass("active_ingredient-category");
});

$(document).on('click', '.custom-recipe-item', function () {
    $(".meal-plan-dashboard-body .aside-left").addClass("daily-meal-schedule-hide");
    let show = $(this).data('show');
    let c = $(this);
    $(show).removeClass("hide").siblings().addClass("hide");
    $(".custom-recipe-item").addClass("recipe-item-non-active")
    $(c).removeClass("hide").addClass("active_custom-recipe-item").siblings().removeClass("active_custom-recipe-item");
});
