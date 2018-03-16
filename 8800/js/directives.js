(function(){
    'use strict';

    /* Directives */

    var module = angular.module('8800.directives', ['ng']);

    module.directive('uiLoading', function ($compile) {

        var loadingSpinner ='<div class="spinner"></div>';

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (element.hasClass('js_spinner')) {
                   // element.removeClass('js_spinner');
                }
                scope.$watch(attrs.uiLoading, function (val) {
                    if(val) {
                        element.removeClass('js_spinner');
                        // element.html(originalContent);
                        // $compile(element.contents())(scope);
                    } else {
                        element.addClass('js_spinner');
                        // element.html(loadingSpinner);
                    }
                });

                // var originalContent = element.html();
                // element.html(loadingSpinner);
                // scope.$watch(attrs.uiLoading, function (val) {debugger
                //     if(val) {
                //         element.html(originalContent);
                //         $compile(element.contents())(scope);
                //     } else {
                //         element.html(loadingSpinner);
                //     }
                // });
            }
        };
    });

    module.directive('uiSticky', function () {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var $footer = $(element);

                var $footerSticky = $footer.find('.footer-sticky');
                var footerYBottom = $footer.height()*5;

                var checSticky = function () {
                    var scrollBotCurrent = $(document).height() - $(window).height() - $(window).scrollTop();

                    if ((scrollBotCurrent > footerYBottom)) {
                        $footer.addClass('footer-sticky_sticky_show');
                        $footer.removeClass('hide-sticky');
                    } else {
                        $footer.removeClass('footer-sticky_sticky_show');
                        $footer.addClass('hide-sticky');
                    }
                };

                checSticky();
                $(window).on('scroll.top', checSticky);
            }
        };
    });

    app.directive('uiEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {

                    scope.$apply(function (){
                        scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

    module.directive('uiInitTable', function () {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var $block = $(element);
                var $table = $block.find('.tariff-table-new'),
                    resTab1 = $block.find('.resize_table-1'),
                    resTab2 = $block.find('.resize_table-2'),
                    phone = 610;
                var resizeTable = function () {
                     //console.log('Table - ', $table);

                    if (app.sizes.width <= phone) {
                        // console.log(app.sizes.width, '<');
                        resTab1.addClass('hide');
                        resTab2.removeClass('hide');
                    } else {
                        // console.log(app.sizes.width, '>');
                        resTab1.removeClass('hide');
                        resTab2.addClass('hide');
                    }
                };


                $(window).on('load resize', resizeTable);
                resizeTable();
            }
        };
    });

    module.directive('uiInitHeader', function () {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var preventDefault = function(e){
                    e.preventDefault();
                };

                function enable(namespace){
                    $(document).off('touchmove.' + namespace);
                    $(window).off('mousewheel.' + namespace);
                }

                function disable(namespace){
                    $(document).on('touchmove.' + namespace, preventDefault);
                    $(window).on('mousewheel.' + namespace, preventDefault);
                }

                function get(){
                    return (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
                }

                var $header = $(element);

                var headerYBottom = $header.offset().top + $header.height();
                var $pageInner = app.dom.$root.find('.page__inner');

                var $hamburger = $header.find('.hamburger');
                var $menu = $header.find('.header-menu');
                var $mobileMenu = app.dom.$root.find('.mobile-menu');
                var $menuList = $header.find('.header-menu__list');
                var mobileMenuOpened = false;

                var $headerSticky = $('.header.header_sticky');

                // var $headerSticky = $header.clone().prependTo(app.dom.$root).addClass('header_sticky');
                var $hamburgerSticky = $headerSticky.find('.hamburger');
                var $menuSticky = $headerSticky.find('.header-menu');
                var headerSearchSticky = $headerSticky.find('.header-search').addClass('header-search_sticky');
                var stickyOpened = false;

                var $headerSearch = app.dom.$root.find('.header-search');

                var checkPos = function () {
                    var scrollTopCurrent = app.dom.$window.scrollTop();
                    if ((scrollTopCurrent > headerYBottom*2+100) && !mobileMenuOpened) {
                        $headerSticky.addClass('header_sticky_show');
                    } else {
                        $headerSticky.removeClass('header_sticky_show');
                    }
                };

                var openMobileMenu = function (fromSticky) {
                    var top = app.dom.$window.scrollTop() - $pageInner.offset().top;
                    $pageInner.addClass('page__inner_menu');
                    $headerSticky.addClass('header_sticky_menu');
                    $mobileMenu.css('top', fromSticky ? top :0);
                    if (fromSticky) {
                        $hamburgerSticky.addClass('hamburger_open');
                    } else {
                        $hamburger.addClass('hamburger_open');
                    }
                    mobileMenuOpened = true;
                    disable('menu');
                    setTimeout(function (argument) {
                        $mobileMenu.on('clickoutside.citySearch', function () {
                            if (mobileMenuOpened) closeMobileMenu();
                        });
                    }, 0);
                };

                var closeMobileMenu = function () {
                    $pageInner.removeClass('page__inner_menu');
                    $headerSticky.removeClass('header_sticky_menu');
                    $hamburgerSticky.removeClass('hamburger_open');
                    $hamburger.removeClass('hamburger_open');
                    mobileMenuOpened = false;
                    enable('menu');
                    $mobileMenu.off('clickoutside.citySearch');
                };

                var toggleMobileMenu = function (fromSticky) {
                    if (mobileMenuOpened) {
                        closeMobileMenu();
                    } else {
                        openMobileMenu(fromSticky);
                    }
                };

                var closeStickyMenu = function () {
                    $menuSticky.removeClass('header-menu_show');
                    $hamburgerSticky.removeClass('hamburger_open');
                    stickyOpened = false;
                };

                var openStickyMenu = function () {
                    $menuSticky.addClass('header-menu_show');
                    $hamburgerSticky.addClass('hamburger_open');
                    stickyOpened = true;
                };

                var toggleStickyMenu = function () {
                    if (app.sizes.width >= app.config.breakpoints['tablet']) {
                        if (stickyOpened) {
                            closeStickyMenu();
                        } else {
                            openStickyMenu();
                        }
                    } else {
                        toggleMobileMenu(true);
                    }
                };

                checkPos();
                $(window).on('scroll.top', checkPos);

                $headerSearch.plugin('header-search');

                $(window).on('resize.header', function () {
                    if (mobileMenuOpened) closeMobileMenu();
                    if (stickyOpened) closeStickyMenu();
                });

                $hamburgerSticky.on('click', function () {
                    toggleStickyMenu();
                });

                $hamburger.on('click', function () {
                    toggleMobileMenu();
                });

            }
        };
    });

    module.directive('uiInitAbility', function () {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {

                var $block = $(element);
                var $list = $block.find('.ability__slider');
                // var phone = app.config.breakpoints.phone;
                var inited = false;
                var vartical = $('.ability_vertical');
                var vertClass = $('.ability_color-d');
                var slider = null;

                function initSlider() {
                    if (app.sizes.width <= 734) {
                        if (!inited) {
                            vertClass.removeClass('ability_color-d');
                            vartical.removeClass('ability_vertical');
                            slider = $list.swiper({
                                slidesPerView: 1,
                                slidesPerColumn: 2,
                                spaceBetween: 20,
                                slideClass: 'ability__list__item',
                                wrapperClass: 'ability__list',
                                nextButton: '.ability__button_next',
                                prevButton: '.ability__button_prev',
                                buttonDisabledClass: 'action_disable',
                                pagination: '.ability__pagination',
                                paginationClickable: true,
                                uniqueNavElements: true
                            });
                            inited = true;
                        }
                    } else {
                        if (inited) {
                            inited = false;
                            slider.destroy(true,true);
                            vartical.addClass('ability_vertical');
                            vertClass.addClass('ability_color-d');
                        }
                    }
                }

                initSlider();
                app.dom.$window.on('resize', initSlider);


                $('.ability__list__item.tariff-table-8800--background').height($('.ability__list__item.tariff-table-8800--background').width());
                $(window).resize(function() {
                    $('.ability__list__item.tariff-table-8800--background').height($('.ability__list__item.tariff-table-8800--background').width());
                });
            }
        };
    });

    module.directive('uiInitTheme', function () {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var $theme = $(element),
                    $headline = $theme.find('.theme__headline'),
                    $content = $theme.find('.theme__content'),
                    $questions = $('body').find('.questions'),
                    countShow = $questions.data('countShow'),
                    duration = 350,
                    opened = false;


                var api = {
                    open: function () {
                        opened = true;
                        $content.slideDown(duration / 2);
                        $theme.addClass('theme_open');
                    },
                    close: function () {
                        opened = false;
                        $content.slideUp(duration / 2);
                        $theme.removeClass('theme_open');
                    }
                };

                var handlerClick = function(event) {
                    if (opened) {
                        api.close();
                        if ($questions.length) {
                            try {
                                countShow(false);
                            }
                            catch (e) {

                            }
                        }
                    }
                    else {
                        api.open();
                        if ($questions.length) {
                            try {
                                countShow(true);
                            }
                            catch (e) {

                            }
                        }
                    }
                };

                $headline.on('click', handlerClick);
                $theme.data('api', api);
            }
        };
    });

    module.directive('uiInitCompAuth', function () {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                setTimeout(function() {
                        $('.header.header_sticky').remove();
                    },
                    1000);
            }
        };
    });

    module.directive('uiInitCompReserv', function () {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                setTimeout(function() {
                        $('.header.header_sticky').remove();
                    },
                    1000);
            }
        };
    });

    module.directive('uiResizeReq', function () {
        return {
            restrict: 'A',
            scope: {
                renderTemplate: '=uiResizeReq',
            },
            compile: function (scope, element, attrs) {
                var sizeSetka = 12;
                var sizeElements = 36;
                scope.renderTemplate = {};
                scope.renderTemplate.startNum = [];

                function windowSize() {
                    if ($(window).width() > '1024') {
                        scope.renderTemplate.colDOM = 2;
                        scope.renderTemplate.colSize = 6;
                        var colColumns = sizeSetka / scope.renderTemplate.colDOM;
                        calcStartSize(colColumns);
                        // $scope.renderTemplate.startNum = [0, 5, 11, 17, 23, 29];
                        // console.log($(window).width(), '<');
                    } else {
                        scope.renderTemplate.colDOM = 3;
                        scope.renderTemplate.colSize = 9;
                        var colColumns = sizeSetka / scope.renderTemplate.colDOM;
                        calcStartSize(colColumns);
                    }
                }

                function calcStartSize(colColumns) {
                    for (var i = 0; i < colColumns; i++) {
                        if (i === 0) {
                            scope.renderTemplate.startNum[i] = scope.renderTemplate.colSize - 1;
                        } else {
                            scope.renderTemplate.startNum[i] = scope.renderTemplate.startNum[i-1] + scope.renderTemplate.colSize;
                        }
                    }
                }

                $(window).on('load resize',windowSize);
            }
        };
    });

    // сравнение паролей
    module.directive("uiCompareTo", function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=uiCompareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    });

    // произвольная валидация
    // http://angular-ui.github.io/
    module.directive('uiValidate', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                var validateFn, validators = {},
                    validateExpr = scope.$eval(attrs.uiValidate);

                if (!validateExpr){ return;}

                if (angular.isString(validateExpr)) {
                    validateExpr = { validator: validateExpr };
                }

                angular.forEach(validateExpr, function (exprssn, key) {
                    validateFn = function (valueToValidate) {
                        var expression = scope.$eval(exprssn, { '$value' : valueToValidate });
                        if (angular.isObject(expression) && angular.isFunction(expression.then)) {
                            // expression is a promise
                            expression.then(function(){
                                ctrl.$setValidity(key, true);
                            }, function(){
                                ctrl.$setValidity(key, false);
                            });
                            return valueToValidate;
                        } else if (expression) {
                            // expression is true
                            ctrl.$setValidity(key, true);
                            return valueToValidate;
                        } else {
                            // expression is false
                            ctrl.$setValidity(key, false);
                            return valueToValidate;
                        }
                    };
                    validators[key] = validateFn;
                    ctrl.$formatters.push(validateFn);
                    ctrl.$parsers.push(validateFn);
                });

                function apply_watch(watch)
                {
                    //string - update all validators on expression change
                    if (angular.isString(watch))
                    {
                        scope.$watch(watch, function(){
                            angular.forEach(validators, function(validatorFn){
                                validatorFn(ctrl.$modelValue);
                            });
                        });
                        return;
                    }

                    //array - update all validators on change of any expression
                    if (angular.isArray(watch))
                    {
                        angular.forEach(watch, function(expression){
                            scope.$watch(expression, function()
                            {
                                angular.forEach(validators, function(validatorFn){
                                    validatorFn(ctrl.$modelValue);
                                });
                            });
                        });
                        return;
                    }

                    //object - update appropriate validator
                    if (angular.isObject(watch))
                    {
                        angular.forEach(watch, function(expression, validatorKey)
                        {
                            //value is string - look after one expression
                            if (angular.isString(expression))
                            {
                                scope.$watch(expression, function(){
                                    validators[validatorKey](ctrl.$modelValue);
                                });
                            }

                            //value is array - look after all expressions in array
                            if (angular.isArray(expression))
                            {
                                angular.forEach(expression, function(intExpression)
                                {
                                    scope.$watch(intExpression, function(){
                                        validators[validatorKey](ctrl.$modelValue);
                                    });
                                });
                            }
                        });
                    }
                }
                // Support for ui-validate-watch
                if (attrs.uiValidateWatch){
                    apply_watch( scope.$eval(attrs.uiValidateWatch) );
                }
            }
        };
    });

    // обязательный елемент
    module.directive('uiValid', [function() {
        return {
            require: '^ngModel',
            restrict: 'A',
            scope: false,
            link: function ($scope, element, attr, ngModel) {

                var valid = false;

                // разрешаем невалидной модели иметь значение
                if(ngModel.$options) {
                    ngModel.$options.allowInvalid = true;
                }
                else {
                    ngModel.$options = { allowInvalid: true };
                }

                ngModel.$validators.uiValid = function(modelValue, viewValue) {
                    return valid;
                };

                $scope.$watch(attr.uiValid, function(value) {
                    valid = value;
                    ngModel.$validate();
                });
            }
        };
    }]);

    // обязательный елемент
    module.directive('uiRequired', [function() {
        return {
            require: '^ngModel',
            restrict: 'A',
            scope: false,
            link: function ($scope, element, attr, ngModel) {

                var required = false;

                ngModel.$validators.uiRequired = function(modelValue, viewValue) {
                    return required ? (modelValue || viewValue) : true;
                };

                $scope.$watch(attr.uiRequired, function(value) {
                    required = value;
                    ngModel.$validate();
                });
            }
        };
    }]);

    // минимальная длина
    module.directive('uiMinlength', ['$parse', function($parse) {
        return {
            require: '^ngModel',
            restrict: 'A',
            scope: false,
            link: function ($scope, element, attr, ngModel) {

                var minlength = $parse(attr.uiMinlength)($scope);

                // разрешаем невалидной модели иметь значение
                if(ngModel.$options) {
                    ngModel.$options.allowInvalid = true;
                }
                else {
                    ngModel.$options = { allowInvalid: true };
                }

                // валидатор
                ngModel.$validators.uiMinlength = function(modelValue, viewValue) {
                    return !minlength || ngModel.$isEmpty(viewValue) || viewValue.length >= minlength;
                };

                // наблюжаем за идменением minlength аттрибута
                $scope.$watch(attr.uiMinlength, function(value) {
                    if(minlength != value) {
                        minlength = value;
                        ngModel.$validate();
                    }
                });
            }
        };
    }]);

    // максимальная длина
    module.directive('uiMaxlength', ['$parse', function($parse) {
        return {
            require: '^ngModel',
            restrict: 'A',
            scope: false,
            link: function ($scope, element, attr, ngModel) {

                var maxlength = $parse(attr.uiMaxlength)($scope);

                // разрешаем невалидной модели иметь значение
                if(ngModel.$options) {
                    ngModel.$options.allowInvalid = true;
                }
                else {
                    ngModel.$options = { allowInvalid: true };
                }

                // валидатор
                ngModel.$validators.uiMaxlength = function(modelValue, viewValue) {
                    return !maxlength || viewValue.length <= maxlength;
                };

                // наблюжаем за изменением maxlength аттрибута
                $scope.$watch(attr.uiMaxlength, function(value) {
                    if(maxlength != value) {
                        maxlength = value;
                        ngModel.$validate();
                    }
                });
            }
        };
    }]);

    // сложность пароля
    module.directive('uiStrength', function() {
        return {
            restrict: 'A',
            replace: true,
            template: '<div ng-class="strength.state"><div style="width: {{strength.pct}}%;"></div></div>',
            scope: {
                strength: '=uiStrength',
                pwd: '=uiModel'
            },
            link: function($scope) {

                function mesureStrength(a) {

                    var c = 0;

                    // длина пароля
                    if(a.length < 5) {
                        c = c + 7;
                    }
                    else if(a.length > 4 && a.length < 8) {
                        c = c + 14;
                    }
                    else if(a.length > 7 && a.length < 16) {
                        c = c + 17;
                    }
                    else if(a.length > 15) {
                        c = c + 23;
                    }

                    // символы и последовательности
                    if(a.match(/[a-z]/)){
                        c = c + 9;
                    }
                    if(a.match(/[A-Z]/)) {
                        c = c + 10;
                    }
                    if(a.match(/\d+/)){
                        c = c + 10;
                    }
                    if(a.match(/(.*[0-9].*[0-9].*[0-9])/)) {
                        c = c + 10;
                    }
                    if(a.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)){
                        c = c + 10;
                    }
                    if(a.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) {
                        c = c + 10;
                    }
                    if(a.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                        c = c + 7;
                    }
                    if(a.match(/([a-zA-Z])/) && a.match(/([0-9])/)) {
                        c = c + 7;
                    }
                    if(a.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)){
                        c = c + 15;
                    }

                    return c > 100 ? 100 : c;
                }

                function getState(s) {
                    switch (Math.round(s / 33)) {
                        case 0:
                        case 1:
                            return 'danger';
                        case 2:
                            return 'warning';
                        case 3:
                            return 'success';
                    }
                }

                $scope.strength = {};

                $scope.$watch('pwd', function() {
                    var value = mesureStrength($scope.pwd || '');
                    $scope.strength.pct = value;
                    $scope.strength.state = getState(value);

                });

            }
        };
    });

    // присваивает innerHtml элемента в переменную
    module.directive('uiHtml', ['$compile', '$timeout', function($compile, $timeout) {
        return {
            restrict: 'AE',
            link: function ($scope, element, attr) {
                if(element.html()) {
                    $timeout(function(){
                        $scope.$apply(function() {
                            $scope[attr.uiHtml] = element.html().replace(/^\s+|\s+$/gm,'');
                        });
                    }, 0);
                }
            }
        };
    }]);

    // изолированая вложенная форма
    module.directive('isolatedForm', function(){
        return {
            restrict: 'A',
            require: 'form',
            link: function(scope, formElement, attrs, formController) {

                var parentFormCtrl = formElement.parent().controller('form'),
                    core$setValidity = formController.$setValidity;

                formController.$setValidity = function(validationToken, isValid, control) {
                    core$setValidity(validationToken, isValid, control);
                    if (!isValid && parentFormCtrl) {
                        parentFormCtrl.$setValidity(validationToken, true, formController);
                    }
                };
            }
        };
    });

    // применяется для группировки строк таблиц
    module.directive('uiRowGroup', [function() {
        return {
            restrict: 'AE',
            link: function ($scope, element, attr) {

                var length = 0;

                function getLength() {
                    return length || element.children().length - 1;
                }

                element.addClass('group');

                $scope.groupToggle = function(e) {
                    if(e && e.preventDefault) {
                        e.preventDefault();
                    }

                    if(getLength()>0) {
                        element.toggleClass('opened');
                    }
                };

                if(attr.uiRowGroup) {
                    $scope.$watch(attr.uiRowGroup, function(val) {

                        if(val && !angular.isUndefined(val.length)){
                            length = val.length;
                        }
                        if(getLength()<1) {
                            element.removeClass('opened');
                        }
                    });
                }
                else {
                    if(getLength()<1) {
                        element.removeClass('opened');
                    }
                }
            }
        };
    }]);

    module.directive('uiScrollBar', function() {
        return {
            restrict: 'A',
            link: function ($scope, element) {
                //element.
            }
        };
    });

    module.directive('uiBusy', ['$timeout', function($timeout) {
        return {
            restrict: 'AE', //attribute or element
            replace: false,
            //template: '<div class="ui-busy"></div>',
            scope: {
                value: '=uiBusy'
            },
            link: function ($scope, element) {

                var loader = angular.element('<div class="ui-busy"><i class="icon-spinner3"></i></div>'),
                    position = element.css('position'),
                    timer;

                function showLoader() {
                    element.addClass('static-element');
                    element.append(loader);
                }

                function hideLoader() {
                    element.removeClass('static-element');
                    loader.remove();
                }

                function thenLoader(){
                    $timeout.cancel(timer);
                    hideLoader();
                }

                $scope.$watch('value', function(value){
                    if(value) {
                        if(value.$promise) {
                            timer = $timeout(showLoader, 400);
                            value.$promise.then(thenLoader);
                        }
                        else if(value.then) {
                            timer = $timeout(showLoader, 400);
                            value.then(thenLoader);
                        }
                    }
                });
            }
        };
    }]);

    // module.directive('uiLoading', function (Session, $compile) {
    //     debugger
    //     var loadingSpinner ='<div class="spinner"></div>';
    //
    //     return {
    //         restrict: 'A',
    //         link: function (scope, element, attrs) {debugger
    //             var originalContent = element.html();
    //             element.html(loadingSpinner);
    //             scope.$watch(attrs.ngLoading, function (val) {
    //                 if(val) {
    //                     element.html(originalContent);
    //                     $compile(element.contents())(scope);
    //                 } else {
    //                     element.html(loadingSpinner);
    //                 }
    //             });
    //         }
    //     };
    // });

    module.directive('uiNotify', ['$timeout', function($timeout) {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div ng-class="{\'show\': isShow}" class="ui-notify"><i ng-click="hide()" class="ui-notify-close icon-close"></i>{{text}}</div>',
            scope: {
                config: '=uiNotify',
                notify: '=uiModel'
            },
            link: function($scope, element) {

                var timer;

                $scope.hide = function() {
                    element.hide();
                    $scope.isShow = false;
                };

                $scope.config = angular.extend({
                    autohide: 0
                }, $scope.config);

                $scope.$watch('notify', function(notify){

                    if (notify!==null && !angular.isUndefined(notify)) {

                        $scope.hide();

                        $scope.notify = null;
                        $scope.text = notify;

                        // блочный элемент
                        element.show();

                        // выравниваем по середине через $timeout и $apply так-как это нужно делать после вставки текста в шаблон
                        $timeout(function () {
                            $scope.$apply(function() {
                                element.css('margin-left', -parseInt(element.innerWidth()/2));
                                $scope.isShow = true;
                            });
                        }, 0);

                        // если таймер закрытия был создан, удаляем его
                        if (timer) {
                            $timeout.cancel(timer);
                            timer = false;
                        }

                        // если нужно автозакрытие
                        if ($scope.config.autohide) {
                            timer = $timeout($scope.hide, $scope.config.autohide);
                        }
                    }
                });
            }
        };
    }]);

    module.directive('uiModal', ['$document', function($document) {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div class="modal-overlay"><div class="modal" ng-transclude ></div></div>',
            transclude: true,
            link: function ($scope, element, attr) {

                var modal = element.children(),
                    width = modal.outerWidth(),
                    height = modal.outerHeight();

                setTimeout(function() {
                    modal.css({
                        'width':        width,
                        //'height':       height,
                        'left': '50%',
                        'top': '30px',
                        'margin-left':  -parseInt(width / 2) + 'px'
                        //'margin-top':   -parseInt(height / 2) - 30 + 'px'
                    });
                }, 500);

//
//                $document.on('scroll', function(e){
//                    e.preventDefault();
//                    console.log(123);
//                });
//
//                $scope.$on('$destroy', function() {
//                    console.log('$destroy');
//                    //$document.off('scroll');
//                });
            }
        };
    }]);

    module.directive('uiConfirm', ['$document', '$compile', '$sce', function($document, $compile, $sce) {

        function Confirm(scope) {

            var self = this;

            // создаем
            this.$scope = scope.$new();

            // отмена
            this.$scope.cancel = function() {
                if(angular.isFunction(self.onCancel)) self.onCancel();
                self.hide();
            };

            // подтверждение
            this.$scope.success = function() {
                if(angular.isFunction(self.onSuccess)) self.onSuccess();
                self.hide();
            };

            // свойства
            this.title = '';
            this.content = '';
            this.success = null;
        }

        Confirm.prototype = {

            // шаблон
            template: (
                '<div class="modal-overlay"><div class="modal ui-confirm">' +
                    '<header>' +
                        '<h3>{{title | translate}}</h3>' +
                        '<i ng-click="cancel()" class="icon-close"></i>' +
                    '</header>' +
                    '<section>{{content | translate}}</section>' +
                    '<footer class="text-right">' +
                        '<button ng-click="cancel()" class="button" translate>CANCEL</button>' +
                        '<button ng-click="success()" class="button active ml1" translate>OK</button>' +
                    '</footer>' +
                '</div></div>'
            ),

            // показать
            show: function() {

                // задаем переменные
                this.$scope.title = this.title;
                this.$scope.content = this.content;

                // создаем и добавляем в DOM
                this.$confirm = $compile(this.template)(this.$scope);
                this.$confirm.appendTo($document.find('body'));
            },

            // скрыть
            hide: function() {
                this.$confirm.remove();
            }

        };

        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, element, attr) {

                var uiConfirm = new Confirm($scope);

                element.on('click', function() {
                    uiConfirm.show();
                });

                $scope.$watch(attr.uiConfirm, function(value) {
                    angular.extend(uiConfirm, value);
                });

            }
        };
    }]);

    module.directive('uiCaptcha', [function() {

        // класс капчи
        function Captcha() {
            this.getToken();
            this.reload();
        }

        // перезагрузить картинку
        Captcha.prototype.reload = function reload() {
            this.code = '';
            this.url = '?token=' + this.token + '&time=' + new Date().getTime();
        };

        // получить токен
        Captcha.prototype.getToken = function getToken() {

            var result  = '',
                words   = '0123456789abcdef',
                position = 0,
                max_position = words.length - 1;

            for(var i = 0; i < 16; ++i ) {
                position = Math.floor(Math.random() * max_position);
                result = result + words.substring(position, position + 1);
            }

            this.token = result;

            return result;
        };

        return {
            restrict: 'AE',
            replace: true,
            template: (
                '<div class="ui-captcha ui-captcha--fix form-block__field form-block__field--fix" ng-class="{update: update}">' +
                    '<input type="text" name="captchaCode" ng-model="captcha.code" class="form-block__input" placeholder="Код" />' +
                    '<img ng-src="{{src+captcha.url}}" height="44px"/>' +
                    '<a href="#" ng-click="captcha.reload(); $event.preventDefault()">Получить код повторно<i class="icon-spinner6"></i></a>' +
                '</div>'
            ),
            scope: {
                model: '=uiModel'
            },
            link: function($scope, element, attr) {

                $scope.captcha = new Captcha();
                $scope.src = attr.src || '';

                if(attr.uiModel && attr.uiModel.charAt(0)!='{') {
                    $scope.model = $scope.captcha;
                }

                $scope.$watch('captcha.url', function() {
                    $scope.update = true;
                });

                element.find('img').load(function(){
                    $scope.$apply(function(){
                        $scope.update = false;
                    });
                });
            }
        };
    }]);

    module.directive('uiTooltip', ['$window', '$document', '$compile', '$parse', '$timeout', '$sce', function($window, $document, $compile, $parse, $timeout, $sce) {

        var $win = angular.element($window);

        // конструктор
        function TooltipObject(scope, element) {
            this.$element = element;
            this.$scope = scope.$new();
        }

        TooltipObject.prototype = {

            // задержка перед скрытием
            delay: 100,

            // отключение подсказки
            disabled: false,

            // позиция
            location: 'right',

            // приоритеты размещений
            locations: ['top', 'bottom', 'left', 'right'],

            // подключить шаблон
            include: false,

            // содержимое
            content: '',

            // шаблон
            template: (
                '<div class="ui-tooltip">' +
                    '<span></span>' +
                    '<section ng-if="include" ng-include="include"></section>' +
                    '<section ng-if="!include" ng-bind-html="content"></section>' +
                '</div>'
            ),

            setContent: function(content, apply) {

                // задаем конткнт
                if(content.charAt(0)=='#') {
                    this.$scope.include = content.substr(1);
                    this.$scope.content = false;
                }
                else {
                    this.$scope.include = false;
                    this.$scope.content = $sce.trustAsHtml(content);
                }

                if(apply) this.$scope.$apply();

                // позиционируем если нужно
                if(angular.isElement(this.$tooltip)) {
                    $timeout(angular.bind(this, this.reposition), 0);
                }
            },

            // показываем подсказку
            show: function(content, apply) {

                // подсказка отключена
                if(this.disabled) {
                    return false;
                }

                // если контент не передан в функцию
                if(!content) content = this.content;

                // если таймер существует то удаляем его и ничего не делаем
                if(this.delayTimer) {
                    $timeout.cancel(this.delayTimer);
                    delete this.delayTimer;
                    return true;
                }

                // создаем тултип из шаблона
                if(!angular.isElement(this.$tooltip)) {

                    // создаем и добавляем в DOM
                    this.$tooltip = $compile(this.template)(this.$scope);
                    this.$tooltip.appendTo($document.find('body'));

                    // события наведения на тултип, нужны предотвращения скрытия при переходе мышкой на самого себя
                    this.$tooltip.on('mouseover', angular.bind(this, function(){
                        this.hover = true;
                        this.show(content, apply);
                    }));
                    this.$tooltip.on('mouseout', angular.bind(this, function(){
                        this.hover = false;
                        this.hide();
                    }));
                }

                // задаем содержимое тултипа
                if(content) {
                    this.setContent(content, apply);
                }
                // или позиционируем
                else {
                    $timeout(angular.bind(this, this.reposition), 0);
                }
            },

            // скрываем подсказку
            hide: function() {
                if(angular.isElement(this.$tooltip) && !this.hover) {
                    this.delayTimer = $timeout(angular.bind(this, function(){
                        this.$tooltip.css({top: 0, left: -1000}).remove();
                        delete this.$tooltip;
                        delete this.delayTimer;
                    }), this.delay);
                }
            },

            // позиционирование тултипа
            reposition: function() {

                var location = this.location,
                    offset = this.$element.offset(),
                    cantBe,
                    pos = {};

                // удаляем все классы позиционирования
                this.$tooltip.removeClass('bottom right top left');

                // верхнее положение
                this.$tooltip.addClass("top");
                pos.top = {
                    'top': offset.top - this.$tooltip.outerHeight(true),
                    'left': offset.left + this.$element.outerWidth()/2 - this.$tooltip.outerWidth(true)/2
                };
                pos.top.right = pos.top.left + this.$tooltip.outerWidth();
                this.$tooltip.removeClass("top");

                // нижнее положение
                this.$tooltip.addClass("bottom");
                pos.bottom = {
                    'top': offset.top + this.$element.outerHeight(),
                    'left': offset.left + this.$element.outerWidth()/2 - this.$tooltip.outerWidth(true)/2
                };
                pos.bottom.bottom = pos.bottom.top + this.$tooltip.outerHeight(true);
                pos.bottom.right = pos.bottom.left + this.$tooltip.outerWidth(true);
                this.$tooltip.removeClass("bottom");

                // подожение слева
                this.$tooltip.addClass("left");
                pos.left = {
                    'top': offset.top + this.$element.outerHeight()/2 - this.$tooltip.outerHeight(true)/2,
                    'left': offset.left - this.$tooltip.outerWidth(true)
                };
                pos.left.bottom = pos.left.top + this.$tooltip.outerHeight(true);
                this.$tooltip.removeClass("left");

                // положение справа
                this.$tooltip.addClass("right");
                pos.right = {
                    'top': offset.top + this.$element.outerHeight()/2 - this.$tooltip.outerHeight(true)/2,
                    'left': offset.left + this.$element.outerWidth()
                };
                pos.right.bottom = pos.right.top + this.$tooltip.outerHeight(true);
                pos.right.right = pos.right.left + this.$tooltip.outerWidth(true);
                this.$tooltip.removeClass("right");

                // массив флагов
                cantBe = {
                    // флаг "не может быть сверху"
                    'top': (pos.top.top < $document.scrollTop() || pos.top.left < 0 || pos.top.right > ($document.scrollLeft() + $win.width())),
                    // флаг "не может быть снизу"
                    'bottom': (pos.bottom.bottom > ($document.scrollTop() + $win.height()) || pos.bottom.left < 0 || pos.bottom.right > ($document.scrollLeft() + $win.width())),
                    // флаг "не может быть слева"
                    'left': (pos.left.left < 0 || pos.left.top < $document.scrollTop() || pos.left.bottom > ($document.scrollTop() + $win.height())),
                    // флаг "не может быть справа"
                    'right': (pos.right.right > ($document.scrollLeft() + $win.width()) || pos.right.top < $document.scrollTop() || pos.right.bottom > ($document.scrollTop() + $win.height()))
                };

                // ищем подходящее для тултипа размещение
                var i = location.indexOf(this.locations),
                    maxIters = 0;

                while (cantBe[location] && maxIters != this.locations.length) {
                    maxIters++;
                    i = ++i % this.locations.length;
                    location = this.locations[i];
                }

                // навешиваем на тултип класс для размещения его в выбранном положении
                this.$tooltip.addClass(location + " show");

                // позиционируем
                this.$tooltip.css({
                    left: Math.round(pos[location].left),
                    top: Math.round(pos[location].top)
                });
            }
        };

        return {
            restrict: 'A',
            controller: ['$scope', '$element', TooltipObject],
            link: function (scope, element, attr, ctrl) {

                var config = {}, defConfig = {disabled: false, delay: 100, location: 'right', include: false, content: ''};

                // передан конфиг или текст
                if(attr.uiTooltip.charAt(0)=='{') {
                    config = $parse(attr.uiTooltip)(scope);
                }
                else {
                    config.content = attr.uiTooltip;
                }

                // расширяем конфиг тултипа
                for(var key in defConfig) {
                    if(config[key]) {
                        ctrl[key] = config[key];
                    }
                    else if (attr['uiTooltip' + key.substring(0, 1).toUpperCase() + key.substring(1, key.length)]){
                        ctrl[key] = attr['uiTooltip' + key.substring(0, 1).toUpperCase() + key.substring(1, key.length)];
                    }
                    else {
                        ctrl[key] = defConfig[key];
                    }
                }

                // вставляем или прячем елемент
                element
                    .on('mouseout', function() {
                        ctrl.hide();
                    })
                    .on('mouseover', function() {
                        ctrl.show(null, true);
                    });
            }
        };
    }]);

    module.directive('uiFormError', ['$document', '$parse', '$compile', '$translate', 'uiTooltipDirective', function($document, $parse, $compile, $translate, d) {
        return angular.extend({}, d[0], {
            priority: 0,
            require: ['^form', '^?ngModel', 'uiTooltip'],
            compile: function () {
                return function ($scope, element, attr, ctrls) {

                    var ngForm = ctrls.shift(), ngModel = ctrls.shift(), uiTooltip = ctrls.shift(),
                        parts = 0,
                        config = {field: '', location: 'right', template: ''},
                        path;

                    // если переданы настройки
                    if(attr.uiFormError) {

                        if(attr.uiFormError.charAt(0)=='{') {
                            angular.extend(config, $parse(attr.uiFormError)($scope));
                        }
                        else {
                            config.field = attr.uiFormError;
                        }

                        // считаем длинну пути до поля
                        if(config.field) {
                            parts = config.field.split('.').length;
                        }
                    }

                    // если путь передан в параметре директивы
                    if(parts>1) {
                        path = config.field;
                    }
                    // если неполный путь или не передан
                    else {
                        if(!ngForm || (parts==1 && !ngModel)) throw new Error();
                        path = ngForm.$name + '.' + (parts==1 ? config.field : ngModel.$name);
                    }

                    // если пути не существует
                    if(!$parse(path)($scope)) {
                        throw new Error();
                    }

                    // конфигурируем подсказку
                    uiTooltip.location = config.location;

                    function show($error) {

                        if($translate && !config.template) {

                            var tKeys = [],
                                tPath = ['ERRORS'].concat(path.split('.')),
                                tLength = tPath.length;

                            for (var errKey in $error) {
                                for (var i = 0; i < tLength; i++) {
                                    tKeys.push(tPath.concat([errKey.replace(/^ui([A-Z].+)/, '$1')]).join('.').toUpperCase());
                                    tPath.pop();
                                }
                            }

                            $translate(tKeys).then(function(translations) {
                                for(var i=0; i<tKeys.length; i++) {
                                    if(translations[tKeys[i]]!=tKeys[i]) {
                                        uiTooltip.show(translations[tKeys[i]]);
                                        break;
                                    }
                                }
                            });
                        }
                        else {
                            uiTooltip.show(config.template || path, true);
                        }
                    }

                    // наблюдаем за ошибками
                    $scope.$watch(path + '.$error', function($error) {

                        if(!angular.equals($error, {})) {

                            if(element.filter(":focus").length) {
                                show($error);
                            }

                            element.on('mouseout', function() {
                                uiTooltip.hide();
                            });

                            element.on('mouseover', function() {
                                show($error);
                            });
                        }
                        else {
                            element.off('mouseout mouseover');
                            uiTooltip.hide();
                        }
                    }, true);
                };
            }
        });
    }]);

    module.directive('uiList', ['$parse', function($parse) {
        return {
            require: '^ngModel',
            restrict: 'AE',
            replace: true,
            template: (
                '<ul class="list-box">' +
                    '<li>' +
                    '</li>' +
                '</ul>'
            ),
            scope: true,
            compile: function(tElement, tAttrs) {

                var contents = angular.element(tElement.context.innerHTML);

                // если в контенте 1 элемент и он li, то нужно итерировать его
                if(contents.length==1 && contents[0].tagName && contents[0].tagName.toLowerCase()=='li') {
                    tElement.contents().remove();
                    tElement.append(contents);
                }
                else {
                    tElement.contents().append(tElement.context.innerHTML);
                }


                // назначаем репитер и фильтры
                tElement.contents().attr('ng-repeat', 'node in nodes' + (tAttrs.filter ? ' | ' + tAttrs.filter : ''));

                return function ($scope, element, attrs, ngModel) {
                    ngModel.$render = function () {
                        $scope.nodes = ngModel.$viewValue;
                    };

                    $scope.$watchCollection('nodes', function() {
                        ngModel.$validate();
                    });
                };
            }
        };
    }]);

    module.directive('uiCombo', ['$document', function($document) {
        return {
            restrict: 'AE',
            scope: {
                value: '=uiModel'
            },
            link: function($scope, element, attrs) {

                var variable = element.children('var');

                $scope.setValue = function(value) {

                    if(!value) {
                        return true;
                    }

                    element.find("[data-value]").each(function() {
                        var $this = $(this);
                        if($this.data('value')==value) {

                            $this.addClass('active');
                            variable.html($this.html());

                            // изменяем модель только если данные изменились
                            if(typeof $scope.value != 'undefined' && $scope.value!=value) {

                                $scope.$apply(function() {
                                    $scope.value = value;
                                });
                            }
                        }
                        else {
                            $this.removeClass('active');
                        }
                    });
                };

                $scope.$watch('value', $scope.setValue);

                element.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if($scope.disabled) return false;
                    $scope.setValue($(e.target).data('value'));
                    element.toggleClass('open');
                    $document.triggerHandler('click', this);
                });

                $document.on('click', function(e, el) {
                    if(el!=element[0] && element.hasClass('open')) {
                        element.removeClass('open');
                    }
                });

                // отключение
                attrs.$observe('disabled', function(disabled) {
                    $scope.disabled = disabled;
                });
            }
        };
    }]);

    module.directive('uiCheckbox', function () {
        return {
            priority: 0,
            require: '^ngModel',
            restrict: 'EA',
            replace: true,
            transclude: true,
            template: (
                '<div class="ui-checkbox" ng-click="toggle()">' +
                    '<i ng-if="type==\'checkbox\'" ng-class="{\'icon-checkbox-partial\': !checked && marked, \'icon-checkbox-unchecked\': !checked && !marked, \'icon-checkbox-checked\': checked}"></i>' +
                    '<i ng-if="type==\'radio\'" ng-class="{\'icon-radio-unchecked\': !checked && !marked, \'icon-radio-checked\': checked}"></i>' +
                    '<span ng-transclude></span>' +
                '</div>'
            ),
            scope: {
                value: '=',
                marked: '=uiMarked'
            },
            link: function ($scope, element, attrs, ngModel) {

                $scope.checked = false;
                $scope.type = (attrs.uiType && ['checkbox', 'radio'].indexOf(attrs.uiType)>=0) ? attrs.uiType : 'checkbox' ;

                ngModel.$render = function () {
                    $scope.checked = angular.isUndefined($scope.value) ? ngModel.$viewValue : $scope.value == ngModel.$viewValue;
                };

                $scope.toggle = function() {

                    if(attrs.disabled) {
                        return false;
                    }

                    if(angular.isUndefined($scope.value)) {
                        $scope.checked = !$scope.checked;
                        }
                        else {
                        $scope.checked = $scope.value == ngModel.$viewValue ? '' : $scope.value;
                    }

                    ngModel.$setViewValue($scope.checked);
                };
            }
        };
    });

    module.directive('uiSwitcher', ['$timeout', function($timeout) {
        return {
            require: 'ngModel',
            restrict: 'AE',
            replace: true,
            scope: {},
            template: (
                '<div class="switch" ng-class="{\'switch-init\': init,\'switch-left\': !model, \'switch-right\': model}" ng-click="toggle()">' +
                    '<div class="switch-button icon-list">&nbsp;</div>' +
                '</div>'
            ),
            link: function(scope, element, attrs, ngModel) {
                var updateModel;
                updateModel = function() {
                    scope.model = ngModel.$viewValue;
                    return scope.model;
                };
                scope.toggle = function() {
                    ngModel.$setViewValue(!ngModel.$viewValue);
                    return updateModel();
                };
                ngModel.$render = function() {
                    return updateModel();
                };
                $timeout(function(){
                    scope.init = true;
                }, 1000);
                return ngModel.$render;
            }
        };
    }]);

    module.directive('uiTime', ['$filter', function($filter) {
        return {
            require: 'ngModel',
            restrict: 'AE',
            replace: true,
            template: (
                '<div class="ui-time">' +
                    '<input type="text" ng-model="value" ng-pattern="pattern" placeholder="00:00" />' +
                '</div>'
            ),
            scope: true,
            link: function ($scope, element, attrs, ngModel) {

                // маска для поля
                $scope.pattern = "(2[0-3]|[0-1][0-9]):([0-5][0-9])";

                // следим за значением внутри компонента
                $scope.$watch('value', function(val) {

                    var time = String(val).split(":"),
                        newValue,
                        oldValue;

                    // если время вбито правильно
                    if(time.length==2) {

                        // получаем старую дату
                        if(ngModel.$viewValue) {
                            oldValue = new Date(ngModel.$viewValue);
                        }
                        else {
                            oldValue = new Date();
                            oldValue.setHours(0, 0);
                        }

                        // формируем новую дату
                        newValue = new Date(oldValue);
                        newValue.setHours(parseInt(time[0]), parseInt(time[1]));

                        // если задана новая дата то передаем ее в родительскую модель
                        if(newValue.getTime() != oldValue.getTime()) {
                            ngModel.$setViewValue(newValue);
                        }
                    }
                    // если время не вбили вообще
                    else if (val==='') {
                        ngModel.$setViewValue(null);
                    }
                });

                // заполняем значение внутреннего поля
                ngModel.$render = function () {
                    $scope.value = $filter('date')(new Date(ngModel.$viewValue), 'HH:mm');
                };
            }
        };
    }]);

    var datePickerTemplate = [ // Template for the date picker, no CSS, pure HTML. The date-picker tag will be replaced by this
        '<div class="date-picker">',
            '<i ng-click="selectDate()" class="icon-calendar-alt-fill"></i>',
            '<ul>',
                '<li ng-repeat="s in selected">{{s|date:"dd.MM.yyyy"}}<span ng-if="!$last">, </span></li>',
            '</ul>',
            '<div ng-show="selecting">',
                '<table>',
                    '<thead>',
                        '<tr>',
                            '<td class="currentDate" colspan="7">{{month[date.getMonth()] + " " + ((!config.daysOfYear)?date.getFullYear():"")}}</td>',
                        '</tr>',
                        '<tr class="navigation">',
                            '<td ng-click="prevYear()" ng-class="{disabled: !isPrevYear}">&lt;&lt;</td>',
                            '<td ng-click="prev()" ng-class="{disabled: !isPrev}">&lt;</td>',
                            '<td colspan="3" ng-click="today()">Сегодня</td>',
                            '<td ng-click="next()" ng-class="{disabled: !isNext}">&gt;</td>',
                            '<td ng-click="nextYear()" ng-class="{disabled: !isNextYear}">&gt;&gt;</td>',
                        '</tr>',
                        '<tr>',
                            '<td ng-repeat="day in days" ng-bind="day"></td>',
                        '</tr>',
                    '</thead>',
                    '<tbody>',
                        '<tr ng-repeat="week in weeks" class="week">',
                            '<td ng-repeat="d in week" ng-click="selectDay(d)" ng-class="{active: d.selected, otherMonth: d.notCurrentMonth, disabled: d.disabled}">{{d.day|date:"d"}}</td>',
                        '</tr>',
                    '</tbody>',
                '</table>',
            '</div>',
        '</div>'
    ].join('\n');

    module.directive('uiDatepicker', ['$document', function($document) {
        return {
            restrict: "AE",
            templateUrl: "datePicker.tmpl",
            transclude: true,
            replace: true,
            scope: {
                value: '=uiModel',
                cfg: '=uiDatepicker',
                opt: '=uiOptions'
            },
            controller: function($scope) {

                var config = $scope.cfg || $scope.opt;

                // параметры по умолчанию
                $scope.config = {
                    empty: false,
                    daysOfYear: false,
                    isoDate: false,
                    limitFrom: null,
                    limitTo: null
                };

                // объеденяем настройки
                if(angular.isObject(config)) {
                    for(var key in $scope.config) {
                        if(config[key]) {
                            $scope.config[key] = (key=='limitFrom' || key=='limitTo') ? new Date(config[key]) : config[key];
                        }
                    }
                }

                // включаем навигацию
                $scope.isPrev = true;
                $scope.isNext = true;
                $scope.isPrevYear = true;
                $scope.isNextYear = true;

                // навигация по датам
                $scope.prev = function prevMonth() {
                    if($scope.isPrev) $scope.buildCalendar($scope.date.setMonth($scope.date.getMonth() - 1));
                    if(!$scope.isNext) $scope.isNext = true;
                };
                $scope.prevYear = function prevYear() {
                    if($scope.isPrevYear) $scope.buildCalendar($scope.date.setYear($scope.date.getFullYear() - 1));
                };
                $scope.next = function nextMonth() {
                    if($scope.isNext) $scope.buildCalendar($scope.date.setMonth($scope.date.getMonth() + 1));
                    if(!$scope.isPrev) $scope.isPrev = true;
                };
                $scope.nextYear = function nextYear() {
                    if($scope.isNextYear) $scope.buildCalendar($scope.date.setYear($scope.date.getFullYear() + 1));
                };
                $scope.today = function today() {
                    $scope.isNext = true;
                    $scope.isPrev = true;
                    $scope.buildCalendar();
                };

                // конвертация дней в году и наоборот
                $scope.getDayOfYear = function getDayOfYear(date, days) {
                    date = new Date(date);
                    if(!angular.isUndefined(days)) {
                        return days * 86400000 + new Date(date.getFullYear(), 0, 0).getTime();
                    }
                    else {
                        return parseInt((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
                    }
                };

                $scope.getIsoDate = function getIsoDate(date) {
                    date = new Date(date);
                    var mm = (date.getMonth() + 1).toString();
                    var dd = ''+date.getDate().toString();

                    mm = ((mm.length < 2)?'0':'') + mm;
                    dd = ((dd.length < 2)?'0':'') + dd;
                    return [date.getFullYear(), mm, dd].join('-');
                };

                // конструктор календаря
                $scope.buildCalendar = function buildCalendar(value) {

                    var date = value ? new Date(value) : new Date(),
                        startDate = new Date(date),
                        startMonth = startDate.getMonth(),
                        startYear = startDate.getYear(),
                        weeks = [];

                    // строим календарь начиная от первого дня месяца
                    startDate.setDate(1);

                    // строим календарь с отсчетом от 0 времени
                    startDate.setHours(0, 0, 0, 0);

                    // если выдаем дни года
                    if($scope.config.daysOfYear) {

                        // отключаем навигацию по годам
                        $scope.isPrevYear = false;
                        $scope.isNextYear = false;

                        // отключаем навигацию по месяцу если это первый месяц года
                        $scope.isPrev = (new Date(date.getFullYear(), date.getMonth() - 1).getFullYear() == date.getFullYear());

                        // отключаем навигацию по месяцу если это последний месяц года
                        $scope.isNext = (new Date(date.getFullYear(), date.getMonth() + 1).getFullYear() == date.getFullYear());
                    }

                    if (startDate.getDay() === 0) {
                        startDate.setDate(-6);
                    } else {
                        startDate.setDate(startDate.getDate() - startDate.getDay());
                    }
                    if (startDate.getDate() === 1) {
                        startDate.setDate(-6);
                    }

                    function selectDay(item) {
                        return new Date(item).setHours(0, 0, 0, 0) == startDate.getTime();
                    }

                    while (weeks.length < 6) { // creates weeks and each day
                        if (date.getYear() === startYear && date.getMonth() > startMonth) break;
                        var week = [];
                        for (var i = 0; i < 7; i++) {
                            week.push({
                                day: startDate.getTime(),
                                selected: $scope.selected.some(selectDay),
                                disabled: ($scope.config.daysOfYear && startDate.getYear() != startYear) || ($scope.config.limitFrom && startDate.getTime() < $scope.config.limitFrom.getTime()) || ($scope.config.limitTo && startDate.getTime() > $scope.config.limitTo.getTime()),
                                notCurrentMonth: startDate.getMonth() != startMonth,
                                notCurrentYear: startDate.getYear() != startYear
                            });
                            startDate.setDate(startDate.getDate() + 1);
                        }
                        weeks.push(week);
                    }

                    // значение в инпуте
                    $scope.date = date;
                    $scope.weeks = weeks; // Week Array
                };

                $scope.getConverted = function(value) {
                    if ($scope.config.isoDate) {
                        return $scope.getIsoDate(value);
                    } else if ($scope.config.daysOfYear) {
                        return $scope.getDayOfYear(value);
                    } else {
                        return value;
                    }
                };

                // выбор дня
                $scope.selectDay = function selectDay(date) {

                    // дата блокирована
                    if(date.disabled) {
                        return false;
                    }

                    if(!angular.isArray($scope.value)) {

                        // конвертируем даты в дни года, если нужно и задаем значание
                        if($scope.config.daysOfYear) {
                            $scope.value = $scope.getDayOfYear(date.day);
                        }
                        // конвертируем в ISO формат
                        else if ($scope.config.isoDate) {
                            $scope.value = $scope.getIsoDate(date.day);
                        }
                        // залаем новую дату, сохраняя при этом часы, минуты, секунды
                        else if($scope.value) {
                            var oldVal = new Date($scope.value);
                            $scope.value = new Date(date.day).setHours(oldVal.getHours(), oldVal.getMinutes(), oldVal.getSeconds(), oldVal.getMilliseconds());
                        }
                        else {
                            $scope.value = date.day;
                        }

                        // задаем список выбраных
                        $scope.selected.splice(0, $scope.selected.length, $scope.value);

                        // скрываем календарь
                        $scope.selecting = !$scope.selecting;

                        // перестраиваем календарь
                        $scope.buildCalendar($scope.value);
                    }
                    else {
                        date.converted = $scope.getConverted(date.day);
                        var index = $scope.selected.indexOf(date.converted);

                        // дата выбрана
                        date.selected = index<0;

                        // добавляем значение в список выбраных
                        if(date.selected) {
                            $scope.selected.push(date.converted);
                        } else {
                            $scope.selected.splice(index, 1);
                        }

                        // конвертируем даты в дни года или в ISO формат, если нужно и задаем значание
                        if($scope.config.daysOfYear || $scope.config.isoDate) {
                            $scope.value.splice(0, $scope.value.length);
                            for(var i=0; i<$scope.selected.length; i++) {
                                $scope.value.push($scope.selected[i]);
                            }
                        } else {
                            $scope.value = angular.copy($scope.selected);
                        }
                    }
                };
                $scope.days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
                $scope.weeks = [];
                $scope.month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь",
                "Октябрь", "Ноябрь", "Декабрь"];
            },
            link: function($scope, element, attrs) {

                if(angular.isArray($scope.value) && $scope.value.length) {
                    $scope.selected = angular.copy($scope.value);
                }
                else if(!angular.isArray($scope.value) && $scope.value) {
                    $scope.selected = [angular.copy($scope.value)];
                }
                else {
                    $scope.selected = [];
                }

                // конвертируем дни года в даты, если нужно
                if($scope.config.daysOfYear) {
                    var date = new Date();
                    for(var i=0; i<$scope.selected.length; i++) {
                        $scope.selected[i] = $scope.getDayOfYear(date, $scope.selected[i]);
                    }
                }
                else if ($scope.config.isoDate) {
                    for(var i=0; i<$scope.selected.length; i++) {
                        $scope.selected[i] = $scope.getIsoDate($scope.selected[i]);
                    }
                }

                // если пустой и сконфигурирован как не пустой
                if(!$scope.selected.length && !$scope.config.empty) {
                    $scope.selected.push($scope.config.daysOfYear || $scope.config.isoDate ? new Date().setHours(0) : new Date().getTime());
                }

                // функция показа/скрытия календаря
                $scope.selectDate = function selectDate() {
                    if($scope.disabled) return false;
                    $scope.selecting = !$scope.selecting;
                    element.children('div').css('top', element.offset().top + element.outerHeight() - $document.scrollTop());

                    // строим календарь при открытии
                    $scope.buildCalendar($scope.selected[0]);
                };

                // клик по календарю
                element.on('click', function(e) {
                    e.stopPropagation();
                    $document.triggerHandler('click', this);
                });

                // для скрытия календаря по клику в не его
                $document.on('click', function(e, el) {
                    if(el!=element[0] && $scope.selecting) {
                        $scope.$apply(function () {
                            $scope.selecting = false;
                        });
                    }
                });

                // отключение каледаря
                attrs.$observe('disabled', function(disabled) {
                    $scope.disabled = disabled;
                });
            }
        };
    }]);

    module.directive('uiWeekDay', ['$translate', function($translate) {

        var weekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
            firstWeekday = weekdays.indexOf($translate.instant('WEEK.FIRST_DAY'));

        // первый день не может быть меньше нуля
        if(firstWeekday<0) firstWeekday = 0;

        return {
            restrict: 'AE',
            template:
            '<table class="week-day-switch">' +
                '<tr>' +
                    '<th colspan="5" translate="WEEK.WORKING">Рабочие</th>' +
                    '<th colspan="2" translate="WEEK.WEEKEND">Выходные</th>' +
                '</tr>' +
                '<tr>' +
                    '<td ng-repeat="weekday in weekdays" ng-click="toggle(weekday)" ng-class="{active: weekday.selected}">{{"WEEK." + weekday.name | translate}}.</td>' +
                '</tr>' +
            '</table>',
            transclude: true,
            replace: true,
            scope: {
                model: '=uiModel'
            },
            link: function($scope) {

                // построение дней для вывода
                function build(val) {

                    var i, wd = [];

                    // находим первый день недели и трансформируем если нужно
                    for(i=firstWeekday; i<weekdays.length; i++) {
                        wd.push({key: i, name: weekdays[i], selected: val.indexOf(i) >= 0});
                    }
                    for(i=0; i<firstWeekday; i++) {
                        wd.push({key: i, name: weekdays[i], selected: val.indexOf(i) >= 0});
                    }
                    return wd;
                }

                // выбор дня недели
                $scope.toggle = function(weekday) {

                    var i = $scope.model.indexOf(weekday.key);

                    if(i >= 0) {
                        $scope.model.splice(i, 1);
                        weekday.selected = false;
                    }
                    else {
                        $scope.model.push(weekday.key);
                        $scope.model.sort();
                        weekday.selected = true;
                    }

                };

                // заглушка, если бодель пуста
                if(!$scope.model) {
                    $scope.model = [];
                }

                $scope.$watch('model', function(val) {
                    $scope.weekdays = build(val);
                });
            }
        };
    }]);

    module.directive('uiWeekdayInterval', ['$translate', function($translate) {

        var weekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
            firstWeekday = weekdays.indexOf($translate.instant('WEEK.FIRST_DAY'));

        // первый день не может быть меньше нуля
        if(firstWeekday<0) firstWeekday = 0;

        function build(val) {

            var i, key=0, iv=[], res = [], wd = [];

            // копируем чтобы не изменить
            val = angular.copy(val);

            // сортируем
            val.sort();

            // находим первый день недели и трансформируем если нужно
            for(i=firstWeekday; i<weekdays.length; i++, key++) {
                if(val.indexOf(i)>=0) wd.push({key: key, name: weekdays[i]});
            }
            for(i=0; i<firstWeekday; i++, key++) {
                if(val.indexOf(i)>=0) wd.push({key: key, name: weekdays[i]});
            }

            // ищем интервалы
            for(i=0; i<wd.length; i++) {
                if(typeof wd[i-1] != 'undefined' && wd[i].key-wd[i-1].key > 1) {
                    iv.push(wd.splice(0, i));
                    i=0;
                }
            }

            // добавляем оиночный день, если он остался
            if(wd.length) {
                iv.push(wd);
            }

            // выводим интервалы
            for(i=0; i<iv.length; i++) {
                if(iv[i].length==1) {
                    res.push($translate.instant('WEEK.' + iv[i][0].name));
                }
                else if(iv[i].length==2) {
                    res.push($translate.instant('WEEK.' + iv[i][0].name), $translate.instant('WEEK.' + iv[i][1].name));
                }
                else {
                    res.push($translate.instant('WEEK.' + iv[i][0].name) + '-' + $translate.instant('WEEK.' + iv[i][iv[i].length-1].name));
                }
            }

            return res;
        }

        return {
            restrict: 'AE',
            template: (
                '<span ng-repeat="interval in intervals">' +
                    '{{interval}}<span ng-if="!$last">, </span>' +
                '</span>'
            ),
            replace: true,
            scope: {
                model: '=uiModel'
            },
            link: function($scope) {
                $scope.$watch('model', function(val) {
                    $scope.intervals = build(val);
                });
            }
        };
    }]);

    module.directive('uiTreeView', ['$compile', function($compile) {
        return {
            restrict: 'AE',
//            template:
//            '<ul>' +
//                '<li ng-repeat="node in nodes" ui-tree-view-children="node." ng-class="{open: node.$expand}">' +
//                    '<div ui-tree-view-children></div>' +
//                '</li>' +
//            '</ul>',
            scope: {
                treeView: '=uiTreeView',
                nodes: '=uiModel'
            },
            controller: function($scope) {

                $scope.config = angular.extend({
                    children: 'children',
                    onChange: angular.noop
                }, $scope.treeView);

                $scope.toggleNode = function toggleNode(node) {
                    node.$expand = !node.$expand;
                };

                function markParents() {

                    /*jshint validthis:true */
                    var scope = this.$parent.$parent,
                        marked = false;

                    if(scope.node && this.depth>0) {
                        for(var i=0; i<scope.node[$scope.config.children].length; i++) {
                            if(scope.node[$scope.config.children][i].$checked || scope.node[$scope.config.children][i].$marked) {
                                marked = true;
                                break;
                            }
                        }
                        scope.node.$marked = marked;

                        if(scope.depth>0) {
                            markParents.call(scope);
                        }
                    }
                }

                function checkParents() {

                    /*jshint validthis:true */
                    var scope = this.$parent.$parent,
                        checked = false;

                    if(scope.node && this.depth>0) {
                        for(var i=0; i<scope.node[$scope.config.children].length; i++) {
                            if(scope.node[$scope.config.children][i].$checked) {
                                checked = true;
                                break;
                            }
                        }
                        scope.node.$checked = checked;
                        $scope.config.onChange.call(scope.node);

                        if(scope.depth>0) {
                            $scope.checkParents.call(scope);
                        }
                    }
                }

                $scope.checkChildren = function() {
                    var scope = this;
                    angular.forEach(scope.node[$scope.config.children], function(c) {
                        c.$checked = scope.node.$checked;
                        $scope.config.onChange.call(c);
                        $scope.checkChildren.call(scope, c);
                    });
                };

                $scope.checkParents = function() {
                    $scope.config.onChange.call(this.node);
                    checkParents.call(this);
                };

                $scope.checkAll = function() {
                    $scope.checkChildren.call(this);
                    $scope.config.onChange.call(this.node);
                    checkParents.call(this);
                };

                $scope.markParents = function() {
                    $scope.config.onChange.call(this.node);
                    markParents.call(this);
                };

            },
            compile: function (tElement) {

                // получаем шаблон для нод
                var template = angular.element(tElement.html());

                // удаляем содержимое тега
                tElement.contents().remove();

                return function ($scope, iElement, iAttr, ctrl) {

                    // навешиваем системные атрибуты
                    template.attr({
                        'ng-repeat': 'node in nodes',
                        'ui-tree-view-children': $scope.config.children
                    });

                    // запоминаем шаблон для дочерних узлов
                    ctrl.$tpl = angular.element('<ul></ul>').append(template);

                    // чтобы в дочерних нодах можно было обратиться к родительской ноде дерева
                    $scope.$ps = $scope.$parent;

                    // это root
                    $scope.depth = 0;

                    // компилируем root уровень
                    iElement.append($compile(template.clone())($scope));

                };
            }
        };
    }]);

    module.directive('uiTreeViewChildren', ['$compile', '$timeout', function ($compile, $timeout) {
        return {
            restrict: 'A',
            require: '^uiTreeView',
            link: function ($scope, element, attrs, ctrl) {

                //достаем дочерние элементы
                var newScope = $scope.$new();

                // передаем детей
                newScope.nodes = $scope.node[attrs.uiTreeViewChildren];
                newScope.depth = $scope.depth + 1;

                // если дети есть то рисуем их
                if (newScope.nodes !== null && newScope.nodes.length > 0) {
                    $timeout(function() {
                        element.append($compile(ctrl.$tpl.clone())(newScope));
                    }, 0);
                }
            }
        };
    }]);

    module.directive('uiPaginator', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: (
                '<ul class="paginator text-right" ng-show="pages.length>1"> <pre>{{pages | json}}</pre>' +
                    '<li class="prev" ng-class="{disabled: current==1}"><a href="javascript:" ng-click="changePage(current-1)">&lt;</a></li>' +
                    '<li ng-show="pages[0]>1"><span>...</span></li>' +
                    '<li ng-repeat="page in pages">' +
                        '<a href="javascript:" ng-if="page!=current" ng-click="changePage(page)">{{page}}</a>' +
                        '<span ng-if="page==current">{{page}}</span>' +
                    '</li>' +
                    '<li ng-show="pages[pages.length-1] < pagesNum"><span>...</span></li>' +
                    '<li class="next" ng-class="{disabled: current==pagesNum}"><a href="javascript:" ng-click="changePage(current+1)">&gt;</a></li>' +
                '</ul>'
            ),
            scope: {
                model: '=uiModel',
                refresh: '=uiRefresh'
            },
            link: function ($scope, element, attrs) {


                $scope.pages = [];

                $scope.$watch('model', function(model) {
                    if(angular.isArray(model) && model.$promise) {

                        model.$promise.then(function(model) {

                            var start, end;

                            if(!model.$meta) {
                                model.$meta = {};
                            }

                            if($scope.count!=model.$meta.count) {
                                $scope.current = 1;
                            }

                            $scope.count = model.$meta.count;
                            $scope.limit = model.$meta.limit;
                            $scope.pagesNum = Math.ceil(model.$meta.count / model.$meta.limit);
                            $scope.pages = [];


                            var maxPagesShow = ($scope.pagesNum > 5)?5:$scope.pagesNum;
                            var middlePos    = Math.floor(maxPagesShow/2);
                            var aheadMiddle  = maxPagesShow - middlePos - 1;

                            var startThreshold = $scope.current - aheadMiddle;
                            if (startThreshold <= 0) {
                                start = $scope.current - aheadMiddle - startThreshold + 1;
                            } else {
                                var endThreshold = startThreshold + maxPagesShow;
                                if (endThreshold > $scope.pagesNum) {
                                    start = startThreshold - endThreshold + $scope.pagesNum + 1;
                                } else {
                                    start = startThreshold;
                                }

                            }

                            end = start + maxPagesShow;

                            // build pages
                            for(var i=start; i<end; i++) {
                                $scope.pages.push(i);
                            }
                        });
                    }
                });

                $scope.changePage = function changePage(page) {
                    if(typeof $scope.refresh === 'function' && $scope.current!==page && page>0 && page<=$scope.pagesNum) {
                        $scope.refresh($scope.limit * (page - 1), $scope.limit).then(function() {
                            $scope.current = page;
                        });
                    }
                };
            }
        };
    }]);

    module.directive('uiPureCombo', ['$document', function($document) {
        return {
            restrict: 'AE',
            link: function($scope, element) {
                element.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    element.toggleClass('open');
                    $document.triggerHandler('click', this);
                });

                $document.on('click', function(e, el) {
                    if(el!=element[0] && element.hasClass('open')) {
                        element.removeClass('open');
                    }
                });
            }
        };
    }]);

    module.run([
        '$templateCache',
        function($templateCache) {
            $templateCache.put('datePicker.tmpl', datePickerTemplate); // This saves the html template we declared before in the $templateCache
        }
    ]);

})();
