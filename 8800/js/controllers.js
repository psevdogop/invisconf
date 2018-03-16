/* Controllers */

angular.module('8800.controllers', [])
    .controller('auth', function ($scope, $state, $cookies, Auth) {
        console.log('lol1');
        $scope.init = function() {
            // $(document).ready(function() {
            //     setTimeout(function() {
                         $('.ability').plugin('ability');
            //             $('.tariff-table-new').plugin('tariff-table-new');
            //             $('.theme').plugin('theme');
                          $('.auth-form').plugin('auth-form');
            //             $('.footer-sticky').plugin('footer-sticky');
            //             $('.header').plugin('header');
            //
            //             $('a[href^="#"]').click(function () {
            //                 elementClick = $(this).attr("href");
            //                 destination = $(elementClick).offset().top;
            //
            //                 $('html, body').stop().animate( { scrollTop: destination }, 1100 );
            //
            //                 return false;
            //             });
            //         },
            //         1000);
            // });
        };

        $scope.auth = {
            login:      '',
            password:   ''
        };

        $scope.login = function() {debugger
            Auth.login(angular.extend({captchaSecret: $scope.captcha.code, captchaToken: $scope.captcha.token}, $scope.auth)).then(null, function(response) {
                $scope.captcha.reload();
                $scope.errorAuth = '';

                switch (response.message) {
                    case 'Captcha secret is incorrect or captcha has been expired':
                        $scope.errorAuth = 'Код был введён неверный';
                        break;
                    case 'Captcha secret is required':
                        $scope.errorAuth = 'Заполните поле код';
                        break;
                    case 'Authentication failed':
                        $scope.errorAuth = 'Проверьте пару логин/пароль';
                        break;
                    default:
                        console.log(response);
                        $scope.errorAuth = 'Неизвестная ошибка';
                }

                $('.auth-form__error').addClass('auth-form__error_on');
            });
            $('.auth-form__error').removeClass('auth-form__error_on');
        };

        if($scope.$root.identify) {
            $state.go("routing");
        }
    })
    // Маршрутизация
    .controller('routing', function ($scope, $state, Rules, Rule) {

        $scope.init = function() {
            $('.ability').plugin('ability');
            // $('.tariff-table-new').plugin('tariff-table-new');
            // $('.theme').plugin('theme');
            // $('.footer-sticky').plugin('footer-sticky');
            // $('.header').plugin('header');
        };

        var number = $scope.$root.identify.number;

        $scope.add = function(node) {
            $state.go('routing.edit', {path: node.$path, mode: 'add'});
        };

        $scope.insert = function(node) {
            $state.go('routing.edit', {path: node.$path, mode: 'insert'});
        };

        $scope.edit = function(node) {
            $state.go('routing.edit', {path: node.$path, mode: 'edit'});
        };

        $scope.save = function() {
            $scope.rootRules.save(number);
        };

        $scope.remove = function(node) {
            Rule.remove(node);
        };

        $scope.clear = function() {
            Rule.clear($scope.rootRules[0]);
        };

        $scope.rootRules = Rules.get(number);
    })
    .controller('routing.edit', function ($scope, $state, $stateParams, $q, Region, Rule) {

        // дожидаемся загрузки правил
        $scope.$parent.rootRules.$promise.then(function(nodes){

            var node,
                nodePath = String($state.params.path).split('.');

            // находим нужную ноду
            for(var i=0; i<nodePath.length; i++) {
                node = nodes[nodePath[i]];
                if(node) {
                    nodes = node.rules;
                }
                else {
                    break;
                }
            }

            return node || $q.reject(nodePath);

        }).then(
            // если нашли ноду
            function(node){

                // передаем ноду в шаблон
                $scope.node = node;

                // создаем или редактируем
                $scope.mode = $state.params.mode;

                if($scope.mode=='add' || $scope.mode=='insert') {

                    // передаем все типы правил
                    angular.forEach(['regionRule', 'calendarRule', 'categoryRule', 'keyQuotaSetRule', 'keyQuotaRule', 'callRule'], function (type) {
                        $scope[type] = Rule.create({'@xsi.type': type, 'subscriberNumber': $scope.$root.identify.number});
                    });

                    if($scope.mode=='add') {
                        $scope.type = node.rules[0]['@xsi.type'];
                    }
                    else {
                        $scope.type = node['@xsi.type'] == 'keyQuotaSetRule' ? 'keyQuotaRule' : 'regionRule';
                    }
                }
                //  передаем только наше правило, так как редактируем его
                else {
                    $scope[node['@xsi.type']] = Rule.create(angular.copy(node));
                    delete $scope[node['@xsi.type']].rules; // не нужно обновлять детей, так как затирается ссылка
                    $scope.type = node['@xsi.type'];
                }

                if($scope.mode=='add' || $scope.mode=='insert' || node['@xsi.type']=='regionRule') {

                    $scope.regions = Region.tree();

                    $scope.regions.$promise.then(function(){

                        var regionIds = $scope.regionRule.regionIds,
                            region,
                            parentRegion;

                        if(angular.isArray(regionIds)) {
                            for(var i=0; i<regionIds.length; i++) {

                                // находим решион и чекаем
                                region = $scope.regions.idx.id[regionIds[i]];
                                region.$checked = true;

                                // помечаем родительские регионы
                                parentRegion = region.parentRegionId && $scope.regions.idx.id[region.parentRegionId];
                                while(parentRegion) {
                                    parentRegion.$marked = true;
                                    parentRegion = parentRegion.parentRegionId && $scope.regions.idx.id[parentRegion.parentRegionId];
                                }
                            }
                        }
                    });
                }
            },
            // если не нашли ноду то ошибка
            function(nodePath) {
                $state.go("^");
            }
        );

        // применяем изменения
        $scope.accept = function () {
            switch ($scope.mode) {
                case 'add':
                    Rule.add($scope.node, $scope[$scope.type]);
                    break;
                case 'insert':
                    Rule.insert($scope.node, $scope[$scope.type]);
                    break;
                case 'edit':
                    Rule.update($scope.node, $scope[$scope.type]);
                    break;
            }
            $state.go("^");
        };

        // отмена измерений
        $scope.cancel = function () {
            $state.go("^");
        };

        $scope.changeRegion = function () {
            var index = $scope.regionRule.regionIds.indexOf(this.id);
            if (this.$checked && index<0) {
                $scope.regionRule.regionIds.push(this.id);
            }
            else if(index>=0){
                $scope.regionRule.regionIds.splice(index, 1);
            }
        };

    })

    // Операторы/Номера
    .controller('operators.numbers', function ($scope, OperatorsNumber, UiUpload) {

        var number = $scope.$root.identify.number;

//        // удалить
//        $scope.delete = function() {
//
//            var del = function(index, item) {
//                item.$delete({number: number}, function() {
//                    $scope.numbers.splice(index, 1);
//                });
//            };
//
//            for(var i=$scope.numbers.length-1; i>=0; i--) {
//                var item = $scope.numbers[i];
//                if(item.$checked) {
//                    del(i, item);
//                }
//            }
//        };

        // удалить
        $scope.delete = function() {
            $scope.selected.$delete({number: number}).then(null, function(res) {
                if(res.status===204) {
                    for (var i = $scope.numbers.length - 1; i >= 0; i--) {
                        if ($scope.numbers[i].id == $scope.selected.id) {
                            $scope.numbers.splice(i, 1);
                            $scope.selected = false;
                        }
                    }
                }
            });
        };

        $scope.selected = false;

        // загрузить из файла
        $scope.import = angular.extend(UiUpload, {
            url: '/api/' + number + '/number/upload?capacity=1',
            onUpload: function() {
                $scope.numbers = OperatorsNumber.query({number: number});
            }
        });

        $scope.numbers = OperatorsNumber.query({number: number});
    })
    .controller('operators.groups', function ($scope, $rootScope, OperatorsGroup, idx) {

        var number = $scope.$root.identify.number;

        // список
        $scope.groups = OperatorsGroup.query({number: number}, function() {
            $rootScope.operatorsGroup = idx(angular.copy($scope.groups));
        });

        // выделеный элемент
        $scope.selected = false;

        // удалить
        $scope.delete = function() {
            if($scope.selected) {
                $scope.selected.$delete({number: number}).then(null, function(res) {
                    if(res.status===204) {
                        for (var i = $scope.groups.length - 1; i >= 0; i--) {
                            if ($scope.groups[i].id == $scope.selected.id) {
                                $scope.groups.splice(i, 1);
                                $scope.selected = false;
                            }
                        }
                    }
                });
            }
        };
    })
    .controller('operators.numbers.edit', function ($scope, $state, $q, OperatorsNumber, OperatorsGroup, NumberFormat, Domain) {

        var groupsCopy = [],
            identify = $scope.$root.identify;


        $scope.numberTypes = [
            {id:"mobile", name: "NUMBER_TYPE.MOBL"},
            {id:"sip", name: "NUMBER_TYPE.SIP"}
        ];

        $scope.numberValidator = {
            "pattern":"",
            "placeholder":""
        };

        $scope.domains = Domain.query({number: identify.number});
        $scope.numberFormats = NumberFormat.get();

        // если передан id
        if($state.params.id) {
            $scope.number = OperatorsNumber.get({number: identify.number, id: $state.params.id});
        }
        // для создания номера
        else {
            $scope.number = new OperatorsNumber({
                number: '',
                description: '',
                capacity: null,
                timeAccident: null,
                subscriberNumber: identify.number,
                type: "mobile",
                groupsList: []
            });
        }

        $q.all([
            $scope.numberFormats.$promise
        ]).then(function() {
            updateNumberValidator();
        });

        function updateNumberValidator() {
            if ($scope.number.type === "mobile") {
                $scope.numberValidator = {
                    "pattern":$scope.numberFormats.gsmDestinationNumber,
                    "placeholder":"NUMBER.ENTER_GSM"
                };
            } else {
                $scope.numberValidator = {
                    "pattern":$scope.numberFormats.sipDestinationNumber,
                    "placeholder":"NUMBER.ENTER_SIP"
                };
            }
        }

        $scope.$watch("number.type", updateNumberValidator);

        // получаем список групп
        $scope.groups = OperatorsGroup.query({number: identify.number});

        // ждем прихода групп и номера
        $q.all({
            number: $scope.number.$promise,
            groups: $scope.groups.$promise
        }).then(function(){

            var groupsList = angular.copy($scope.number.groupsList);

            // чекаем группы
            for(var i=0; i<$scope.groups.length; i++){
                for(var j=0; j<groupsList.length; j++){
                    if(groupsList[j].id==$scope.groups[i].id) {
                        $scope.groups[i].$checked = true;
                    }
                }
                if(angular.isUndefined($scope.groups[i].$checked)) {
                    $scope.groups[i].$checked = false;
                }

                // если поле numbers не пришло, то нужно его добавить
                if(!angular.isArray($scope.groups[i].numbers)) {
                    $scope.groups[i].numbers = [];
                }
            }

            // копия списка групп для сравнения состояния
            groupsCopy = angular.copy($scope.groups);
        });

        // сохранение и добавление в группы
        $scope.save = function() {

            //уданяем так как api с ним выдает ошибку при обновлении
            delete $scope.number.groupsList;

            // удаляем ели null так как поле не обязательное
            if($scope.number.timeAccident === null) {
                delete $scope.number.timeAccident;
            }

            if ($scope.number.type === 'mobile') {
                delete $scope.number.gateId;
            }

            // сохраняем
            $scope.number.$save().then(function(r) {
                if(r.id) {
                    addToGroup(0);
                }
            });
        };

        // отмена измерений
        $scope.cancel = function () {
            $state.go("^");
        };

        // валидаторы
        $scope.valid = {
            timeAccidentRequired: false,
            groupNumbers: function groupNumbersValid() {

                var invalid = 0,
                    group;

                // timeAccident не обязательное по умолчанию
                $scope.valid.timeAccidentRequired = false;

                // делаем проверку
                for(var i=0; i<$scope.groups.length; i++) {
                    group = $scope.groups[i];
                    if(group.$checked && group.routeMode == 'PRIMARY_BACKUP') {
                        if(0===group.numbers.length) {
                            $scope.valid.timeAccidentRequired = true;
                            delete group.$invalid;
                        }
                        else if(1==group.numbers.length) {
                            delete group.$invalid;
                        }
                        else {
                            group.$invalid = true;
                            invalid++;
                        }
                    }
                    else {
                        delete group.$invalid;
                    }
                }

                return !invalid;
            }
        };


        // функуия добавления в группу
        function addToGroup(index) {

            var group = $scope.groups[index || 0];

            if(!group) {
                $state.go("^", null, {reload: true});
                return;
            }

            // если трогали галку
            if(group.$checked!=groupsCopy[index].$checked) {

                // инициализируем numbers, если его небыло
                if(!angular.isArray(group.numbers)) {
                    group.numbers = [];
                }

                // добавляем или удаляем номер
                if(group.$checked) {
                    group.numbers.push({id: $scope.number.id});
                }
                else {
                    for(var i=0; i<group.numbers.length; i++) {
                        if(group.numbers[i].id==$scope.number.id) {
                            group.numbers.splice(i, 1);
                            break;
                        }
                    }
                }

                // при сохранении это поле не нужно
                delete group.$checked;

                // сохраняем группу и переходим к следующей
                group.$save().then(function(){
                    addToGroup(++index);
                });
            }
            else {
                addToGroup(++index);
            }
        }

        $scope.getNumberTypeById = function (itemId) {
            for (var i = 0; i < $scope.numberTypes.length; i++) {
                if ($scope.numberTypes[i].id === itemId) {
                    return $scope.numberTypes[i];
                }
            }

            return null;
        };
    })
    .controller('operators.groups.edit', function ($scope, $state, $timeout, OperatorsNumber, OperatorsGroup) {

        var group,
            identify = $scope.$root.identify;

        // если передан id
        if($state.params.id) {
            group = OperatorsGroup.get({number: identify.number, id: $state.params.id});
        }
        // для создания группы
        else {
            group = new OperatorsGroup({
                name: "",
                numbers: [],
                subscriberNumber: identify.number,
                hasFailureManagement: false,
                hasCongestionManagement: false,
                routeMode: 'ROUND_ROBIN'
            });
        }

        function onSave() {
            $state.go("^", null, {reload: true});
        }

        // сохраняем группу и возвращаемся назад
        $scope.save = function() {
            if($scope.group.routeMode=="PRIMARY_BACKUP") {

                var primaryNumber = new OperatorsNumber($scope.group.numbers[0]);

                // изменились ли данный на основном номере
                for(var i=0; i<$scope.numbers.length; i++) {
                    if($scope.numbers[i].id==primaryNumber.id) {
                        primaryNumber.$dirty = !angular.equals($scope.numbers[i], primaryNumber);
                        break;
                    }
                }

                // нужно ли сохранить основной номер
                if(primaryNumber.$dirty) {

                    //уданяем так как api с ним выдает ошибку при обновлении
                    delete primaryNumber.groupsList;
                    delete primaryNumber.$dirty;

                    // сохраняем номер и группу
                    primaryNumber.$save(function() {
                        group.$save(onSave);
                    });
                }
                else {
                    group.$save(onSave);
                }
            }
            else {
                group.$save(onSave);
            }
        };

        // добавление номеров в группу
        $scope.addNumbers = function addNumbers() {

            for(var i=0; i<$scope.numbers.length; i++) {
                var number = $scope.numbers[i];
                if(number.$checked) {
                    delete number.$checked;
                    group.numbers.push(angular.copy(number));
                }
            }
        };

        // удаление номеров из группы
        $scope.removeNumbers = function removeNumbers() {
            for(var i=group.numbers.length-1; i>=0; i--) {
                if(group.numbers[i].$checked) {
                    group.numbers.splice(i, 1);
                }
            }
        };

        // отмена измерений
        $scope.cancel = function () {
            $state.go("^");
        };

        // валидаторы
        $scope.valid = {
            groupNumbers: function groupNumbersValid() {
                if ($scope.group.routeMode == 'PRIMARY_BACKUP') {
                    return $scope.group.numbers && $scope.group.numbers.length == 2 && parseInt($scope.group.numbers[0].timeAccident)>0;
                }
                return true;
            }
        };

        // получаем номера
        $scope.numbers = OperatorsNumber.query({number: identify.number}, function() {

            // если поле numbers не пришло
            if(!angular.isArray(group.numbers)) {
                group.numbers = [];
            }

            // так как с группой не приходит всех данных о номере, то приходится обновлять из общего списка
            for(var i=0; i<group.numbers.length; i++) {
                for(var j=0; j<$scope.numbers.length; j++) {
                    if ($scope.numbers[j].id == group.numbers[i].id) {
                        group.numbers[i] = angular.copy($scope.numbers[j]);
                    }
                }
            }
        });

        // группа
        $scope.group = group;
    })

    // Категории вызовов
    .controller('categories', function ($scope, $rootScope, $timeout, $q, sysCategories, Categories, UiUpload, idx) {

        var number = $scope.$root.identify.number;

        $scope.categories = [];

        function getCategories() {

            // следим за получением обычных и системных категорий
            $q.all({
                categories: Categories.query({number: number}).$promise,
                sysCategories: sysCategories.query().$promise
            }).then(function(values) {
                $scope.categories = values.categories;
                $rootScope.categories = idx(angular.copy(values.categories).concat(values.sysCategories));
            });
        }

        // удалить
        $scope.delete = function() {
            $scope.selected.$delete({number: number}).then(null, function(res) {
                if(res.status===204) {
                    for (var i = $scope.categories.length - 1; i >= 0; i--) {
                        if ($scope.categories[i].id == $scope.selected.id) {
                            $scope.categories.splice(i, 1);
                            $scope.selected = false;
                        }
                    }
                }
            });
        };

        $scope.selected = false;

        // загрузить из файла
        $scope.import = angular.extend(UiUpload, {
            url: function() {
                return '/api/' + number + '/category/' + $scope.selected.id + '/upload';
            },
            onUpload: function() {
                getCategories();
            }
        });

        getCategories();

    })
    .controller('categories.edit', function ($scope, $state, Categories) {

        var category,
            identify = $scope.$root.identify;

        // если передан id
        if($state.params.id) {
            category = Categories.get({number: identify.number, id: $state.params.id});
        }
        else {
            category = new Categories({
                name: "",
                numbers: [],
                subscriberNumber: identify.number
            });
        }

        $scope.addNumber = function() {
            if(angular.isArray(category.numbers)) {
                category.numbers.push($scope.number);
            }
            else {
                category.numbers = [$scope.number];
            }
            $scope.number = "";
        };

        $scope.save = function() {
            category.$save(function() {
                $state.go("^", null, {reload: true});
            });
        };

        // отмена измерений
        $scope.cancel = function () {
            $state.go("^");
        };

        $scope.valid = {
            numberMask: function validNumber(value) {
                if(value && !value.match(/^\d{2,}(\*)?$/)) {
                    return false;
                }
                return true;
            },
            numberDublicate: function validNumber(value) {
                if(angular.isArray(category.numbers)) {
                    for(var i=0; i<category.numbers.length; i++) {
                        if(category.numbers[i]==value) {
                            return false;
                        }
                    }
                }
                return true;
            }
        };

        $scope.category = category;
    })

    // Черный список
    .controller('blacklist', function ($scope, BlackNumber, UiUpload) {

        var number = $scope.$root.identify.number;

        $scope.blacklist = [];

        // получаем список при заходе на страничку
        $scope.get = function() {
            $scope.blacklist = BlackNumber.query({number: number});
        };

        // загрузить черный список из файла
        $scope.import = angular.extend(UiUpload, {
            url: '/api/' + number + '/blacklist/upload',
            onUpload: function() {
                $scope.get();
            }
        });

        $scope.selected = false;

        // удалить
        $scope.delete = function() {
            if($scope.selected) {
                $scope.selected.$delete({number: number}).then(null, function(res) {
                    if(res.status===204) {
                        for (var i = $scope.blacklist.length - 1; i >= 0; i--) {
                            if ($scope.blacklist[i].id == $scope.selected.id) {
                                $scope.blacklist.splice(i, 1);
                                $scope.selected = false;
                            }
                        }
                    }
                });
            }
        };

        $scope.get();
    })
    .controller('blacklist.edit', function ($scope, $state, BlackNumber) {

        var number,
            identify = $scope.$root.identify;

        // если передан id
        if($state.params.id) {
            number = BlackNumber.get({number: identify.number, id: $state.params.id});
        }
        else {
            number = new BlackNumber({
                numberMask: '',
                subscriberNumber: identify.number
            });
        }

        $scope.save = function() {
            number.$save(function() {
                $state.go("^", {}, {reload: true});
            });
        };

        // отмена измерений
        $scope.cancel = function () {
            $state.go("^");
        };

        $scope.number = number;
    })

    // Статистика
    .controller('statistics', function ($scope, Statistics) {

        $scope.stat = Statistics;
        $scope.stat.filter.number = $scope.$root.identify.number;
        $scope.startDate = [];

        $scope.dateOptions = {
            limitFrom: new Date().setMonth(-5),
            limitTo: new Date()
        };

        $scope.stat.query();

        // очищаем статистику при смене типа
        $scope.$watch('stat.filter.type', function() {
            if(Array.isArray($scope.stat.result) && $scope.stat.result.length) $scope.stat.result = [];
        });
    })

    // Настройки
    .controller('settings', ['$scope', 'Subscriber', function ($scope, Subscriber) {

        var identify = $scope.$root.identify,
            limit = {};

        $scope.password = {
            new: '',
            old: '',
            confirm: ''
        };

        $scope.changePassword = function() {
            if($scope.password.old && $scope.password.new == $scope.password.confirm) {
                var sb = new Subscriber();
                sb.newPassword = $scope.password.new;
                sb.oldPassword = $scope.password.old;
                sb.$changePassword({number: identify.number});
            }
        };

        // лимиты
        $scope.limit = {
            capacity:   '',    // Максимальное количество одновременных соединений
            dayLimit:   '',    // Максимальное количество звонков в день
            weekLimit:  '',    // Максимальное количество звонков в неделю
            monthLimit: ''     // Максимальное количество звонков в месяц
        };

        // флаги лимитов
        $scope._limit = {
            capacity:   !angular.isUndefined(identify.capacity),
            dayLimit:   !angular.isUndefined(identify.dayLimit),
            weekLimit:  !angular.isUndefined(identify.weekLimit),
            monthLimit: !angular.isUndefined(identify.monthLimit)
        };

        // сохранение лимитов
        $scope.limitSave = function limitSave() {
            for(var key in $scope.limit) {
               identify[key] = $scope._limit[key] && angular.isNumber($scope.limit[key]) ? $scope.limit[key] : undefined;
            }
            identify.$save();
        };

        $scope.$watchCollection('_limit', function(value){
            for(var key in value) {
                if(value[key]) {
                    if($scope.limit[key]==='') {
                        $scope.limit[key] = limit[key] || identify[key];
                    }
                }
                else {
                    if(angular.isNumber($scope.limit[key])) {
                        limit[key] = $scope.limit[key];
                    }
                    $scope.limit[key] = '';
                }
            }
        });

    }])

    .controller('reservation', ['$scope', '$state', 'Reservation', '$stateParams', function ($scope, $state, Reservation, $stateParams) {
        $(window).scrollTop(0);

        var DEFAULT_CATEGORY_NAME = "Все";
        var DEFAULT_CATEGORY_ORDER = {
            'Стандартный': 6,
            'Бронзовый' : 5,
            'Серебряный': 4,
            'Золотой': 3,
            'Платиновый': 2,
            'Премиум': 1
        };

        var DEFAULT_CONTRACT_CATEGORIES = {
            'paper': [],
            'online' : []
        };

        var DEFAULT_CATEGORY_ORDER_ARRAY = ['Стандартный', 'Бронзовый', 'Серебряный', 'Золотой', 'Платиновый', 'Премиум'];
        $scope.DEFAULT_CATEGORY_ORDER_ARRAY = DEFAULT_CATEGORY_ORDER_ARRAY;

        $scope.numbers = [];
        $scope.loading = false;
        $scope.selected = [];
        $scope.availableContracts = [];
        $scope.numberPrefixes = Reservation.prefixes.query();
        $scope.filter = {
            number: '',
            prefix: 'all',
            mode: 'all',
            category: 'all',
            sample: ''
        };

        $scope.filter.category = ($stateParams.filterCategory) ? $stateParams.filterCategory: 'all';

        $scope.funcResize = '';

        $scope.pages = [];

        Reservation.settings.get(function (res) {
            if(res.numberCategories) {
                res.numberCategories.sort(function(a, b) {
                    var aInd = DEFAULT_CATEGORY_ORDER[a.name];
                    aInd = aInd ? aInd : 1000;
                    var bInd = DEFAULT_CATEGORY_ORDER[b.name];
                    bInd = bInd ? bInd : 1000;
                    return (aInd == bInd) ? 0 : (aInd < bInd ? -1 : 1);           
                });
            }

            $scope.settings = res;

            angular.element(document.querySelector("#categorySelector")).find("var").html(
                ($scope.filter.category === 'all') ? DEFAULT_CATEGORY_NAME : $scope.filter.category
            );

            res.numberCategories.forEach(function (item, i, res) {
                DEFAULT_CONTRACT_CATEGORIES.paper.push(item.name);
                if (item.reservationUsingDASAllowed) {
                    DEFAULT_CONTRACT_CATEGORIES.online.push(item.name);
                }
            });
        });

        $scope.init = function () {
            $scope.resizeScreen();
        };

        $scope.resizeScreen = function() {
            var sizeSetka = 12;
            var sizeElements = 36;
            $scope.renderTemplate = {};
            $scope.renderTemplate.startNum = [];


            function windowSize() {
                if ($scope.filter.category === 'all') {
                    if ($(window).width() > '1065') {
                        $('.js_745').addClass('hide');
                        $('.js_320').addClass('hide');
                        $('.js_1065').removeClass('hide');
                        // console.log($(window).width());
                    } else if (($(window).width() < '1065') && ($(window).width() > '745')) {
                        $('.js_745').removeClass('hide');
                        $('.js_320').addClass('hide');
                        $('.js_1065').addClass('hide');
                        // console.log($(window).width(), '<');
                    } else {
                        $('.js_320').removeClass('hide');
                        $('.js_1065').addClass('hide');
                        $('.js_745').addClass('hide');
                        // console.log($(window).width(), '>');
                    }
                } else {
                    if ($(window).width() > '1065') {
                        $scope.renderTemplate.colDOM = 2;
                        $scope.renderTemplate.colSize = 6;
                        var colColumns = sizeSetka / $scope.renderTemplate.colDOM;
                        calcStartSize(colColumns);
                        $('.js_745').addClass('hide');
                        $('.js_320').addClass('hide');
                        $('.js_1065').removeClass('hide');
                        // $scope.renderTemplate.startNum = [0, 5, 11, 17, 23, 29];
                        // console.log($(window).width(), '<');
                    } else if (($(window).width() < '1065') && ($(window).width() > '745')) {
                        $scope.renderTemplate.colDOM = 3;
                        $scope.renderTemplate.colSize = 9;
                        var colColumns = sizeSetka / $scope.renderTemplate.colDOM;
                        calcStartSize(colColumns);
                        $('.js_745').removeClass('hide');
                        $('.js_1065').addClass('hide');
                        $('.js_320').addClass('hide');

                        // console.log($(window).width(), '>');
                    } else {
                        $('.js_320').removeClass('hide');
                        $('.js_1065').addClass('hide');
                        $('.js_745').addClass('hide');
                        // console.log($(window).width(), 'lol');
                    }
                }
            }

            function calcStartSize(colColumns) {
                $scope.renderTemplate.startNum[0] = 0;
                for (var i = 1; i < colColumns; i++) {
                    if (i === 1) {
                        $scope.renderTemplate.startNum[i] = $scope.renderTemplate.colSize - 1;
                    } else {
                        $scope.renderTemplate.startNum[i] = $scope.renderTemplate.startNum[i-1] + $scope.renderTemplate.colSize;
                    }
                }
            }

            windowSize();
            // $(window).load(windowSize); // при загрузке
            $(window).resize(windowSize);
            // $(window).on('load resize', windowSize);
        };

        $scope.check = function Check(item) {
            var
              number = String(item.number),
              index = $scope.selected.indexOf(number);

            if ($scope.isCheckedNumber(number)) {
                return;
            }

            if(index>=0) {
                $scope.selected.splice(index, 1);
                $scope.availableContracts = [];
            }
            else {
                $scope.selected.push(number);
                $scope.availableContracts = function (category) {
                    var result = [];
                    var contracts = Object.keys(DEFAULT_CONTRACT_CATEGORIES);
                    for (var i = 0; i < contracts.length; i++) {
                        if (DEFAULT_CONTRACT_CATEGORIES[contracts[i]].indexOf(category) > -1) {
                            result.push(contracts[i]);
                        }
                    }

                    return result;
                }(item.category);
            }
        };

        $scope.isCheckedNumber = function (number) {
            number = String(number);
            return $scope.settings.requestedNumbersLimit <= $scope.selected.length && $scope.selected.indexOf(number) == -1;
        };

        $scope.find = function Find(offset, limit, nameFilter) {
        //$scope.find = function Find(categoryName) {
            //offset = 0;
            //limit = 6;
            var query = [], q = '',
                filter = angular.copy($scope.filter);

            if (filter.numberPost && filter.numberPost !== null) {
                filter.postfix = true;
                filter.number = filter.numberPost;
            }

            if($scope.reservationForm && !$scope.reservationForm.$invalid) {

                // filter.postfix = filter.mode === 'postfix';

                if (filter.prefix !== 'all') {
                    q += '' + $scope.filter.prefix;
                }

                if (filter.number && filter.number !== null) {
                    if (filter.postfix && filter.prefix !== 'all') {
                        q += '*,*' + filter.numberPost;
                    }
                    else if (filter.postfix) {
                        q += '*' + filter.numberPost;
                    }
                    else if (filter.prefix !== 'all') {// спросить
                        q += '' + filter.number + '*';
                    }
                    else {
                        q += '*' + filter.number + '*';
                    }
                }
                else if (filter.prefix !== 'all') {
                    q += '*';
                }

                if (q.length) {
                    query.push('number=[' + q + ']');
                }
            }

           // console.log(DEFAULT_CATEGORY_ORDER);

            // Временно
           // if(filter.category!=='all') {
              // query.push('category=' + filter.category);
           // }

            query.push('category=' + filter.sample);

            //query.push('category=Стандартный');
            //query.push('category=' + categoryName);
            // Временно
            query.push('offset=' + (offset ? offset : 0));
            query.push('limit=' + (limit ? limit : 6));

            // clear selected
            $scope.selected = [];

            var $promise = Reservation.numbers.query({query: query.length ? query.join('&') : undefined}).$promise;

            $promise.then(function(numbers) {
                if (numbers) {
                    if ($scope.filter.category === 'all') {
                        for (var i = 0; i<numbers.length; i++) {
                            $scope.numbers.push(numbers[i]);

                            if (i < 3) {
                                $scope.numbersAll320_1.push(numbers[i]);
                            } else if (i > 2) {
                                $scope.numbersAll320_2.push(numbers[i]);
                            }

                            if (i < 2) {
                                $scope.numbersAll765_1.push(numbers[i]);
                            } else if (i > 1 && i < 4) {
                                $scope.numbersAll765_2.push(numbers[i]);
                            } else if (i > 3) {
                                $scope.numbersAll765_3.push(numbers[i]);
                            }
                        }

                        $scope.counterMeta--;
                        // $scope.numbers.$promise = numbers.$promise;
                        // $scope.numbers.$resolved = numbers.$resolved;
                        if (numbers.length > 0) {

                            // $scope.numbersAll765_1.push(numbers.splice(0, 2));
                            // $scope.numbersAll765_2.push(numbers.splice(0, 2));
                            // $scope.numbersAll765_3.push(numbers.splice(0, 2));

                            numbers.$meta.category = numbers[0].category;
                            $scope.numbersMeta.push(numbers.$meta);
                        }

                        if ($scope.counterMeta === 0) {
                            if ($scope.numbersMeta.length > 0) {
                                $scope.counterCategory($scope.numbersMeta, $scope.numbers);
                                $scope.loading = true;
                                $scope.resizeScreen();
                            } else {
                                $scope.loading = true;
                                $scope.loadingFail = true;
                                $scope.resizeScreen();
                            }
                        }
                    } else {
                        // console.log($scope.renderTemplate);
                        if (numbers.length > 0) {
                            for (i = 0; i<numbers.length; i++) {
                                if (i < 6) {
                                    // if (numbers.length) {
                                    $scope.numbers1.push(numbers[i]);
                                    //     $scope.loading = true;
                                    //     $scope.initPaginationRev(numbers);
                                    // }

                                }
                                if (i < 12 && i > 5) {
                                    $scope.numbers2.push(numbers[i]);
                                }
                                if (i < 18 && i > 11) {
                                    $scope.numbers3.push(numbers[i]);
                                }
                                if (i < 24 && i > 17) {
                                    $scope.numbers4.push(numbers[i]);
                                }
                                if (i < 30 && i > 23) {
                                    $scope.numbers5.push(numbers[i]);
                                }
                                if (i < 36 && i > 29) {
                                    $scope.numbers6.push(numbers[i]);
                                }

                                if (i < 9) {
                                    // if (numbers.length) {
                                    $scope.numbers21.push(numbers[i]);
                                    //     $scope.loading = true;
                                    //     $scope.initPaginationRev(numbers);
                                    // }

                                }
                                if (i < 18 && i > 8) {
                                    $scope.numbers22.push(numbers[i]);
                                }
                                if (i < 27 && i > 17) {
                                    $scope.numbers23.push(numbers[i]);
                                }
                                if (i > 26) {
                                    $scope.numbers24.push(numbers[i]);
                                }


                                if (i < 18) {
                                    $scope.numbers31.push(numbers[i]);
                                }
                                if (i > 17) {
                                    $scope.numbers32.push(numbers[i]);
                                }


                                $scope.loading = true;
                                $scope.resizeScreen();
                                $scope.initPaginationRev(numbers);
                            }
                        } else {
                            $scope.loading = true;
                            $scope.resizeScreen();
                            $scope.loadingFail = true;
                        }
                    }


                }

                //if ($scope.filter.category === 'all') {
                //}

                // console.log(numbers);
            });

            return $promise;
        };

        $scope.$watch('filter.category', function (val) {
            // Временно

            $scope.findFor();
            //$scope.find(0, 36);
            // $scope.find('Премиум');
            // $scope.find('Платиновый');
            // $scope.find('Серебряный');
            // $scope.find('Стандартный');
            // $scope.find('Золотой');
            // $scope.find('Бронзовый');
        });

        $scope.findFor = function findFor() {
            $scope.numbers = [];
            $scope.loading = false;
            $scope.loadingFail = false;
            if ($scope.filter.category === 'all') {
                $scope.numbersAll765_1 = [];
                $scope.numbersAll765_2 = [];
                $scope.numbersAll765_3 = [];

                $scope.numbersAll320_1 = [];
                $scope.numbersAll320_2 = [];

                $scope.limit = 6;
                if ($scope.tempPages == undefined) {
                    $scope.tempPages = 0;
                }
                //$scope.numbers = []
                $scope.counterMeta = Object.keys(DEFAULT_CATEGORY_ORDER).length;
                $scope.numbersMeta = [];
                for (var i in DEFAULT_CATEGORY_ORDER) {
                    $scope.filter.sample = i;
                    $scope.find($scope.tempPages, $scope.limit, i);
                }
            } else {

                if ($scope.tempPages == undefined) {
                    $scope.tempPages = 0;
                }
                $scope.limit = 36;
                $scope.numbers1 = [];
                $scope.numbers2 = [];
                $scope.numbers3 = [];
                $scope.numbers4 = [];
                $scope.numbers5 = [];
                $scope.numbers6 = [];

                $scope.numbers21 = [];
                $scope.numbers22 = [];
                $scope.numbers23 = [];
                $scope.numbers24 = [];

                $scope.numbers31 = [];
                $scope.numbers32 = [];

                $scope.filter.sample = $scope.filter.category;
                $scope.find($scope.tempPages, $scope.limit, i);
                // $scope.find(0, 36);
            }
            $scope.resizeScreen();
        };

        $scope.counterCategory = function counterCategory(meta, numbers) {
            var max = -1,
                objMax = {};

            for (var i = 0; i < meta.length; i++) {
                if (meta[i].count > max) {
                    max = meta[i].count;
                    objMax = meta[i];
                }
            }

            numbers.$meta = objMax;
            $scope.initPaginationRev(numbers);

        };

        $scope.initPaginationRev = function initPaginationRev(model) {
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
        };

        $scope.changePage = function changePage(page) {
            if ($scope.current!==page && page>0 && page<=$scope.pagesNum) {
               // if ($scope.filter.category === 'all') {
                    $scope.tempPages = $scope.limit * (page - 1);
                    $scope.current = page;
                    $scope.findFor();

                //}

                // $scope.find($scope.limit * (page - 1), $scope.limit).then(function() {
                //     $scope.current = page;
                // });
            }
        };

        $scope.onClickFilter = function($event) {
            if ($($event.currentTarget).hasClass('js-editing')) {
                // $(this).addClass('js-editing');
            } else {
                $($event.currentTarget).addClass('js-editing');
                $($event.currentTarget).find('.request-body-8800__menu-filter__select-input').focus();
                // closeEditField.call(this);
            }
        };

        $scope.onBlurFilter = function($event) {

            // $($event.currentTarget).closest('.request-body-8800__menu-filter__select')
            //          .removeClass('js-editing');
            // $event.currentTarget.value = '';

            // Проверяем на пробелы и пустую строку
            str = $event.currentTarget.value;
            str = str.replace(/^\s+|\s+$/g, '');

            if (!str) {
                $($event.currentTarget).closest('.request-body-8800__menu-filter__select')
                    .removeClass('js-editing');
                $event.currentTarget.value = str;
            }
        };

        $scope.onClearFilter = function($event) {
            $scope.filter.number = '';
            $scope.filter.numberPost = '';
            $('.request-body-8800__menu-filter__select').removeClass('js-editing');
            $scope.tempPages = 0;

            if ($scope.filter.category === 'all') {
                $scope.findFor();
            } else {
                $scope.filter.category = 'all';
            }
        };
    }])
    .controller('reservation.reserv', ['$scope', '$state', 'Reservation', 'CountryRegion', '$stateParams' , function ($scope, $state, Reservation, CountryRegion, $stateParams) {

        $scope.init = function () {
            angular.element(document.querySelector("#countryRegion")).find("var").html(
                '<span class="combo-box__placeholder">Регион РФ*</span>'
            );

            $(window).scrollTop(0);
            // медленный скролл
            // $('a[href^="#"]').click(function () {
            //     var elementClick = $(this).attr("href");
            //     var destination = $(elementClick).offset().top;
            //
            //     $('html, body').stop().animate( { scrollTop: destination }, 1100 );
            //
            //     return false;
            // });
        };

        // $scope.reserv.number = ($stateParams.reservNumberPhone) ? [$stateParams.reservNumberPhone.number.toString()] : '';
        if (!$stateParams.reservNumberPhone) {
             $state.go("reservation.request");
        }

        if(!$scope.$parent.selected || !$scope.$parent.selected.length) {
          // $state.go("^");
        }

        $scope.regions = CountryRegion.query();
        $scope.step = 1;
        $scope.stepCode = 0;
        $scope.req = {
            'contractType':'paper'
        };

        $scope.prevStep = function () {
            if($scope.step>1) {
                $scope.step--;
            }
            else {
                $state.go("^");
            }
        };

        $scope.nextStep = function () {
            if($scope.step == 1) {
                $scope.getCode(function () {
                    $scope.step++;
                });
            } else if ($scope.step == 2) {
                if ($scope.$parent.availableContracts.length == 1) {
                    $scope.req.contractType = $scope.$parent.availableContracts[0];
                }
                $scope.checkCode(function () {
                    $scope.step++;
                });
            } else if (($scope.step == 3 && $scope.req.contractType === 'online') || $scope.step == 4) {
                $scope.save();
            } else {
                $scope.step++;
            }
        };

        $scope.validate = function (value) {
            if ($scope.checkContractText === value){
                $scope.checkContractText = '';
            }
            else {
                $scope.checkContractText = 'contract';
            }
        };
        $scope.countryRegionSelect = null;

        // console.log($state.params.reservNumberPhone, $stateParams);
        $scope.reserv = {
            //number: $scope.$parent.selected,
            //number: [$stateParams.reservNumberPhone.number],
            communication: {
                "cellphone": "",
                "e-mail": "",
                "person": ""
            },
            companyName: "",
            companyTIN: "",
            sessionId: "",
            securityCode: "",
            countryRegionId: null
        };

        $scope.reservNew = {
            edo: {
                status: false,
                title: "Отправить заявку"
            },
            securityCodeFlag: false,
            securityCodeFlagCheck: false,
            securityTitle: ["Подтвердить номер", "Подтвердить"]
        };

        $scope.error = {
            number: {
                text: 'Ошибка валидации номера',
                fl: false
            },
            code: {
                text: 'Ошибка валидации кода',
                fl: false
            },
            checkCode: {
                text: 'Ошибка валидации кода',
                fl: false
            },
            testCode: {
                text: 'Подтвердите код',
                fl: false
            }

        };


        $scope.reserv.number = ($stateParams.reservNumberPhone) ? [$stateParams.reservNumberPhone.number.toString()] : '';

        var variantCont = ($stateParams.reservNumberPhone) ? $stateParams.reservNumberPhone.category.toString() + ' / ' + $stateParams.reservNumberPhone.number : 'без номера';

        var dataLayer = window.dataLayer || [];

        if (!window.indexFl) {
            window.indexFl = 1;

            dataLayer.push({
                'event': 'addEvents_makeEcommerce',
                'event_id': 'd-v37-e3',
                'event_cat': 'order / orderCart8800',
                'event_name': 'checkOut1',
                'event_param': '(empty)',
                'ecommerce': {
                    'checkout': {
                        'actionField': {
                            'step': 1
                        },
                        'products': [{
                            'brand': 'МегаФон/B2B',
                            'category': 'B2B/Продукты и решения/Связь с клиентами',
                            'name': 'Услуга "Бесплатный номер 8 800"',
                            'variant': variantCont,
                            'price': '0',
                            'quantity': 1
                        }]
                    }
                }
            });
        }

        $scope.getCode = function(callback) {
           if ($scope.reserv.communication.cellphone === '') return;
           Reservation.securityCodes("7"+$scope.reserv.communication.cellphone).then(function(securityCode) {
               $scope.reserv.sessionId = securityCode.id;
               if (angular.isFunction(callback)) {
                   callback.call(this);
               }
               $scope.error.code.fl = false;
               $scope.error.testCode.fl = true;
               $scope.reservNew.securityCodeFlag = true;
           }).catch(function(response) {
               $scope.error.code.fl = true;

               switch (response.message) {
                   case 'WRONG_PHONE_FORMAT':
                       $scope.error.code.text = 'Невалидный номер, проверьте ввод';
                       break;
                   case 'AMOUNT_ALLOWED_CODES_EXCEEDED':
                       $scope.error.code.text = 'Превышено количество запросов, попробуйте позже';
                       break;
                   default:
                       $scope.error.code.text = 'Неизвестная ошибка';
               }

               // console.error('Gists error', response.status, response.data, response.message);
           });
        };

        $scope.isCategory = function(category) {
            var fl = false;

            switch (category) {
                case 'Стандартный':
                        fl = true;
            }

            return fl;
        };

        $scope.toogleEdo = function() {
            var nodeEdo = angular.element(document).find('#doc_edo');

            if (nodeEdo && nodeEdo.hasClass('js_doc-edo-plug')) {
                $scope.reservNew.edo.status = false;
                $scope.req.contractType = 'paper';
                $scope.reservNew.edo.title = 'Отправить заявку';
                nodeEdo.removeClass('js_doc-edo-plug');
            } else {
                $scope.reservNew.edo.status = true;
                $scope.req.contractType = 'online';
                $scope.reservNew.edo.title = 'Перейти в ЭДО';
                nodeEdo.addClass('js_doc-edo-plug');
            }
        };

        $scope.onClickFormInput = function(nameField) {
            var element =  document.getElementById(nameField);
            var destination = element.getBoundingClientRect().top;

            $('html, body').stop().animate( { scrollTop: destination }, 1100 );

            var nodeField = document.getElementById(nameField);

            if (nodeField) {
                $(nodeField).focus();
            }
        };

        $scope.checkCode = function (callback) {
            Reservation.securityCodeCheck($scope.reserv.securityCode, $scope.reserv.sessionId).then(function() {
                if (angular.isFunction(callback)) {
                    callback.call(this);
                }
                $scope.reservNew.securityCodeFlagCheck = true;
                $scope.error.testCode.fl = false;
                $scope.error.checkCode.fl = false;

                dataLayer.push({
                    'event': 'addEvents_makeEcommerce',
                    'event_id': 'd-v37-e4',
                    'event_cat': 'order / orderCart8800',
                    'event_name': 'checkOut2',
                    'event_param': '(empty)',
                    'ecommerce': {
                        'checkout': {
                            'actionField': {
                                'step': 2
                            },
                            'products': [{
                                'brand': 'МегаФон/B2B',
                                'category': 'B2B/Продукты и решения/Связь с клиентами',
                                'name': 'Услуга "Бесплатный номер 8 800"',
                                'variant': variantCont,
                                'price': '0',
                                'quantity': 1
                            }]
                        }
                    }
                });
            }).catch(function(response) {
                $scope.error.checkCode.fl = true;

                switch (response.message) {
                    case 'WRONG_SECURITY_CODE':
                        $scope.error.checkCode.text = 'Невалидный код, проверьте ввод';
                        break;
                    default:
                        $scope.error.checkCode.text = 'Неизвестная ошибка';
                }

                dataLayer.push({
                    'event': 'addEvents_makeEcommerce',
                    'event_id': 'd-v37-e5',
                    'event_cat': 'order / orderCart8800',
                    'event_name': 'sendError1',
                    'event_param': $scope.error.checkCode.text
                });


                // console.error('Gists error', response.status, response.data, response.message);
            });
        };

        $scope.save = function () {
            var reserv = angular.copy($scope.reserv);
            reserv.countryRegionId = $('#countryRegionSelectId').val();
            reserv.communication.cellphone = "7" + reserv.communication.cellphone;

            //reserv.countryRegionId = $scope.countryRegionSelect.description.id;
            if ($scope.req.contractType == 'online') {
                delete reserv.companyName;
                delete reserv.companyTIN;
                delete reserv.communication['e-mail'];
                //delete reserv.countryRegionId;
            } else {
                //delete reserv.countryRegionId;
               // reserv.countryRegionId = '63653739-6535-3935-2d32-3634322d3131';
            }

            Reservation.reserv(reserv, $scope.req.contractType).then(function(res) {
                if (res.status >= 200 && res.status < 300) {
                    var unicId = Date.now().toString();

                    if ($scope.req.contractType === 'paper') {

                        $('#form-modal-ok').removeClass('hide');

                        dataLayer.push({
                            'event': 'addEvents_makeEcommerce',
                            'event_id': 'd-v37-e6',
                            'event_cat': 'order / orderCart8800',
                            'event_name': 'submitTransaction',
                            'event_param': 'Заявка',
                            'ecommerce': {
                                'purchase': {
                                    'actionField': {
                                        'id': unicId,
                                        'revenue': '0'
                                    },
                                    'products': [{
                                        'brand': 'МегаФон/B2B',
                                        'category': 'B2B/Продукты и решения/Связь с клиентами',
                                        'name': 'Услуга "Бесплатный номер 8 800"',
                                        'variant': variantCont,
                                        'price': '0',
                                        'quantity': 1
                                    }]
                                }
                            }
                        });
                      //  $state.go("^", null, {reload: true});
                    } else {
                        setTimeout(function () {

                            dataLayer.push({
                                'event': 'addEvents_makeEcommerce',
                                'event_id': 'd-v37-e6',
                                'event_cat': 'order / orderCart8800',
                                'event_name': 'submitTransaction',
                                'event_param': 'ЭДО',
                                'ecommerce': {
                                    'purchase': {
                                        'actionField': {
                                            'id': unicId,
                                            'revenue': '0'
                                        },
                                        'products': [{
                                            'brand': 'МегаФон/B2B',
                                            'category': 'B2B/Продукты и решения/Связь с клиентами',
                                            'name': 'Услуга "Бесплатный номер 8 800"',
                                            'variant': variantCont,
                                            'price': '0',
                                            'quantity': 1
                                        }]
                                    }
                                }
                            });

                            window.location.href = res.data.redirectUrl
                        }, 4000);
                    }

                } else if (res.message === "DAS_ERROR") {
                    $scope.req.contractType = 'paper';
                    $('#form-modal-error').removeClass('hide');

                    dataLayer.push({
                        'event': 'addEvents_makeEcommerce',
                        'event_id': 'd-v37-e7',
                        'event_cat': 'order / orderCart8800',
                        'event_name': 'sendError2',
                        'event_param': 'Произошла неизвестная ошибка на стороне сервера'
                    });
                    //$scope.step++;
                } else {
                    $('#form-modal-error').removeClass('hide');

                    dataLayer.push({
                        'event': 'addEvents_makeEcommerce',
                        'event_id': 'd-v37-e7',
                        'event_cat': 'order / orderCart8800',
                        'event_name': 'sendError2',
                        'event_param': 'Произошла неизвестная ошибка на стороне сервера'
                    });
                }
                $(window).scrollTop(0);
            });
            
        };

        $scope.onCloseErrorModal = function(event) {
            $('#form-modal-error').addClass('hide');
        };

        $scope.onCloseOkModal = function(event) {
            $('#form-modal-ok').addClass('hide');
        };

        function validateCheck(formFields) {
            for (var i = 0; i < formFields.length; i++) {
                if ($scope.reservForm[formFields[i]].$invalid) {
                    return false;
                }
            }
            return true;
        }
        
        $scope.validStep = function () {
            switch($scope.step) {
                case 1:
                    return validateCheck(['fullName', 'phone']);
                case 2:
                    return validateCheck(['secretCode']);
                case 3:
                    return $scope.req.contractType.length > 0;
                case 4:
                    return validateCheck(['companyName', 'companyTIN', 'email']) && $scope.reserv.countryRegionId != null;
                default:
                    return true;
            }
        };

        // отмена измерений
        $scope.cancel = function () {
            $state.go("^");
        };
    }]);
