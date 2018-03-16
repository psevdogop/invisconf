// Declare app level module which depends on filters, and services

var app = angular.module('8800', [
  'ui.router',
  'ui.upload',
  'ui.orm',
  'ngClipboard',
  'ngCookies',
  'ngAnimate',
  'angular-sortable-view',
  'pascalprecht.translate',
  '8800.controllers',
  '8800.filters',
  '8800.services',
  '8800.directives',
  'ui.mask',
  'uiRouterStyles',
  'angucomplete-alt'
]);

app.config([
    '$stateProvider', '$urlRouterProvider', '$httpProvider', '$translateProvider', 'ngClipProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider, $clipProvider) {

        $clipProvider.setPath("/lib/zero-clipboard/ZeroClipboard.swf");

        // настраиваем языки
        $translateProvider
            .useStaticFilesLoader({
                prefix: 'i18n/',
                suffix: '.json'
            })
            .preferredLanguage('ru');

        // индикатор загрузки
        $httpProvider.interceptors.push('restHttpLoader');

        // $httpProvider.defaults.withCredentials = true;
        // $httpProvider.defaults.withCredentials = true;
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
        // $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://test.local';
        // $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
        // $httpProvider.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
        // $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS';
        // $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'accept, accept-encoding, access-control-allow-headers, access-control-allow-origin, content-type, accept-language';

        // уведомления
        $httpProvider.interceptors.push('restHttpMessages');

        // травсформатор запросов и ответов
        $httpProvider.interceptors.push('restHttpTransformer');

        // Любые неопределенные url перенаправлять на /404
        // $urlRouterProvider.otherwise("/404");

        // главная страничка
        //$urlRouterProvider.when("", "/home");
        //$urlRouterProvider.when("/", "/home");

        // операторы
        // $urlRouterProvider.when("/operators", "/operators/numbers");

        // Определим состояния
        $stateProvider
            // .state('home', {
            //     url: "/"
            // })
            //не в таблице
            // .state('home', {
            //     abstract: true,
            //     url: '/home',
            //     template: '<ui-view/>',
            //     data: {
            //         css: ['../lib/public/css/style.css', '../lib/public/css/inline-style.css']
            //     }
            //     // templateUrl: 'partials/home.layout.html'
            // })
            //не в таблице
            // .state('home', {
            //     // url: '',
            //     templateUrl: "index.html"
            //     // controller: 'auth',
            //     // data: {
            //     //     css: ['../lib/public/css/style.css', '../lib/public/css/inline-style.css']
            //     // }
            // })
            //не в таблице
            .state('404', {
                url: "/404",
                templateUrl: "partials/404.html",
                data: {
                    css: ['../lib/public/css/style.css', '../lib/public/css/inline-style.css']
                }
            })
            //не в таблице
            .state('login', {
                url: "/login",
                absolute: true,
                templateUrl: "partials/login.html",
                controller: 'auth',
                data: {
                    css: ['../lib/public/css/style.css', '../lib/public/css/inline-style.css']
                }
            })
            .state('routing', {
                url: "/selfservice",
                templateUrl: "partials/routing.html",
                controller: 'routing',
                resolve: {
                    access: access()
                },
                data: {
                    css: ['../css/reset.css', '../css/icons.css', '../css/default.css']
                }
            })

            //не в таблице
            .state('reservation', {
                abstract: true,
                url: '/reservation',
                template: '<ui-view/>'
            })
            //не в таблице
            .state('reservation.request', {
                url: '',
                templateUrl: "partials/reservation.html",
                controller: 'reservation',
                params : {
                    filterCategory: null
                },
                data: {
                    css: ['../lib/public/css/style.css', '../lib/public/css/inline-style.css']
                }
            })
            //не в таблице
            .state('reservation.form', {
                url: '/reserv',
                templateUrl: "partials/reserv.html",
                controller: 'reservation.reserv',
                params : { reservNumberPhone: null },
                data: {
                    css: ['../lib/public/css/style.css', '../lib/public/css/inline-style.css']
                }
            });

        function access() {
            return ['resolver', function(resolver) {
                return resolver.isResolve();
            }];
        }

    }
]);

app.run([
    '$rootScope', '$state', '$stateParams', '$cookies', '$q', '$translate', 'Auth', 'resolver', 'Subscriber', 'OperatorsGroup', 'sysCategories', 'Categories', 'Region', 'Domain', 'idx', 'orm',
    function($rootScope, $state, $stateParams, $cookies, $q, $translate, Auth, resolver, Subscriber, OperatorsGroup, sysCategories, Categories, Region, Domain, idx, orm) {

        $rootScope.timestamp = new Date();
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.logout = Auth.logout;
        $rootScope.identify = false;
        $rootScope.regions = [];
        $rootScope.url = new Url;

        $rootScope.$on('uiRouterStyles.loadingStarted', function () {
            //console.log('uiRouterStyles.loadingStarted');

            $('.js_load').addClass('hide-block');
            //$rootScope.loading = true;
        });

        $rootScope.$on('uiRouterStyles.loadingFinished', function () {
            //console.log('uiRouterStyles.loadingFinished');

            setTimeout(function() {
                $('.js_load').removeClass('hide-block');
                var $block = $('#landing .cover');

                // function isMobileSafari() {
                //     return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
                // }

                if ($block.find('.play-button').length) {
                    // if (isMobileSafari()) {
                    //     $('#modal-trigger').remove();
                    //     $('#cover__video-img').addClass('hidenBlock');
                    //     $('#cover__video-img__youtube').removeClass('hidenBlock');
                    // } else {
                        if ($(window).width() > 1024) {
                            var $playButton = $block.find('.play-button');
                            var $contentBlock = $block.find('.cover__content');
                            var $connectBlock = $block.find('.connect');

                            var widthContent = $contentBlock.offset().left + $contentBlock.outerWidth(),
                                widthConnect = $connectBlock.offset().left + $connectBlock.outerWidth(),
                                freeWidthContent = widthContent - widthConnect,
                                heightConnect = $connectBlock.outerHeight(),
                                coordLeft = (widthConnect + freeWidthContent / 2) - $playButton.outerWidth() / 2,
                                coordTop = heightConnect / 2 - $playButton.outerHeight() / 2 + $connectBlock.offset().top;

                            $playButton.css({left: coordLeft+'px', top: coordTop+'px'});
                        }

                    // }
                }

                $('#landing .cover').plugin('cover');
                $('.ability').plugin('ability');
                $('.footer').plugin('footer');
                // $('.examples').plugin('examples');
            }, 500);

            //$rootScope.loading = false;
        });

        $rootScope.$on('uiRouting:home', function () {
            // console.log('uiRouting:home');

            $('a[href^="#"]').click(function () {
                elementClick = $(this).attr("href");
                destination = $(elementClick).offset().top;

                $('html, body').stop().animate( { scrollTop: destination }, 1100 );

                return false;
            });
            //$rootScope.loading = false;
        });

        $rootScope.$on('uiRouting:header', function () {

        });

        $rootScope.$on('uiRouting:ability', function () {
            // console.log('uiRouting:ability');


            //$rootScope.loading = false;
        });

        if ($rootScope.url.path === '/login.html') {
            $rootScope.url.path = '';
            $state.go('login');
        }

        if ($rootScope.url.path === '/reserv.html') {
            $rootScope.url.path = '';
            $state.go('reservation.request');
        }

        if ($rootScope.url.path === '/reservprem.html') {
            $rootScope.url.path = '';
            $state.go('reservation.request', {filterCategory: 'Премиум'});
        }

        // следим за изменениеи URL и проверяем авторизацию
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

            if(toState.resolve && toState.resolve.access) {

                var routing = resolver.run();

                if (!$rootScope.identify && $cookies.user) {
                    location.replace("http://8800.megafon.ru/selfservice");
                    // console.log('run - cookies.user ', $cookies.user);
                    // Subscriber.get({number: $cookies.user}, function(identify) {
                    //
                    //     // получаем все необходимые списки
                    //     $rootScope.identify = identify;
                    //
                    //     $q.all({
                    //         regions: Region.tree(),
                    //         categories: Categories.query({number: identify.number}).$promise,
                    //         sysCategories: sysCategories.query().$promise,
                    //         operatorsGroup: OperatorsGroup.query({number: identify.number}).$promise,
                    //         domain: Domain.query({number: identify.number}).$promise
                    //     }).then(function(values){
                    //         $rootScope.regions = values.regions;
                    //         $rootScope.categories = idx(values.categories.concat(values.sysCategories));
                    //         $rootScope.operatorsGroup = idx(values.operatorsGroup);
                    //         $rootScope.domain = idx(values.domain);
                    //         routing.resolve();
                    //     });
                    //
                    //     routing.resolve();
                    //
                    //     //$state.go($cookies.state && $cookies.state!='login' ? $cookies.state : 'home');
                    // }, function () {
                    //     routing.reject(403);
                    // });
                }
                else if ($rootScope.identify) {
                    routing.resolve();
                }
                else {
                    routing.reject(403);
                }
            }

            // запоминаем страничку на которую перешли
            $cookies.state = toState.name;

            // заполняем титл странички
            $translate('TITLES.' + angular.uppercase(toState.name)).then(function(val){
                $rootScope.title = val;
            });


        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            if(403==error) {
                event.preventDefault();
                //$state.go('^');
                location.replace("http://8800.megafon.ru");
                //$state.go('login');
            }
        });
    }
]);
