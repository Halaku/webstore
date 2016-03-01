var reset = (function() {
    var reset = (function($this) {
        var container = $this.closest('.filter__item'),
            checkboxes = container.find('input:checkbox');
        checkboxes.each(function() {
            $(this).removeAttr("checked");
        });
    });
    return {
        init: function() {
            $('.filter__reset').on('click', function(e) {
                e.preventDefault();
                reset($(this));
            });
        }
    };
})();

var slider = (function() {
    var sendValues = function($this) {
        var container = $this.closest('.filter__slider'),
            from = $('.filter__slider-input_from'),
            to = $('.filter__slider-input_to'),
            values = $this.slider('option', 'values');
        from.val(values[0]);
        to.val(values[1]);
    };
    return {
        init: function() {
            $('.filter__slider-block').each(function() {
                var $this = $(this),
                    min = parseInt($this.data('min')),
                    max = parseInt($this.data('max'));
                $this.slider({
                    range: true,
                    min: min,
                    max: max,
                    values: [min, max],
                    slide: function() {
                        sendValues($this);
                    },
                    create: function() {
                        sendValues($this);
                    }
                });
            });
        }
    };
})();

var changeView = (function() {
    var changeView = (function($this) {
        var view = $this.data('view');
        $('.main-content')
            .removeClass('display-big display-small display-medium')
            .addClass('display-' + view);
    });
    return {
        init: function() {
            $('.options__display-link').on('click', function(e) {
                e.preventDefault();
                changeView($(this));
            });
        }
    };
})();

var slideshow = (function() {
    var slideshow = (function($this) {
        var thumbPath = $this.children('.products__gallery-thumb').attr('src'),
            image = $this.closest('.products__gallery').children('.products__gallery-img');
        $this.parent()
            .siblings('.products__gallery-item')
            .removeClass('products__gallery-item_active');
        $this.parent().addClass('products__gallery-item_active');

        image.fadeOut(function() {
            $(this).attr('src', thumbPath).fadeIn();
        });
    });

    return {
        init: function() {
            $('.products__gallery-link').on('click', function(e) {
                e.preventDefault();
                slideshow($(this));
            });

        }
    };
})();

var accordion = (function() {
    var accordion = (function($this) {
        var container = $this.closest('.filter__item'),
            allContainer = $this.closest('.filter').find('.filter__item'),
            allContent = $this.closest('.filter').find('.filter__content'),
            content = container.find('.filter__content');
        if (!container.hasClass('filter__item_active')) {
            allContainer.removeClass('filter__item_active');
            allContent.stop(true, true).slideUp();
            container.addClass('filter__item_active');
            content.slideDown();
        } else {
            allContainer.removeClass('filter__item_active');
            allContent.stop(true, true).slideUp();
        }



    });

    return {
        init: function() {
            $('.filter__header-link').on('click', function(e) {
                e.preventDefault();
                var $this = $(this);
                accordion($this);


            });
        }
    };
})();

$('.attention__text').columnize({ width: 500 });

$(document).ready(function() {
    if ($('.options__sorting-select').length) {
        $('.options__sorting-select').select2({
            minimumResultsForSearch: Infinity
        });
    }

    if ($('.filter__slider-block').length) {
        slider.init();
    }

    reset.init();
    changeView.init();
    slideshow.init();
    accordion.init();

});
