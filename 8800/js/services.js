(function(){

    'use strict';

    /* Services */

    angular.module('8800.services', ['ngResource'])
        .factory('Auth', function($http, $state, $rootScope, $cookies) {

            return {
                login: login,
                logout: logout
            };

            function login(params) {
                return $http.post('/api/login', params, {xsiType: 'loginRequest'}).then(function() {
                    $('.js_load').addClass('hide-block');
                    $cookies.user = params.login;
                    $state.go('routing');
                });
            }

            function logout() {
                return $http.get('/api/logout').then(function() {
                    $('.js_load').addClass('hide-block');
                    $rootScope.identify = null;
                    // $state.go('home');
                    location.replace("https://8800.megafon.ru");
                });
            }
        })
        // вспомогательная функция
        // TODO: необходимо переделать сервисы на $http, так как $resource затерает методы, добавленые в transformResponse
        .factory('idx', function() {
            return function idx(obj) {
                Object.defineProperty(obj, 'idx', {
                    writable: true,
                    value: {
                        id: {}
                    }
                });
                for(var i=0; i<obj.length; i++) {
                    obj.idx.id[obj[i].id] = obj[i];
                }

                return obj;
            };
        })
        .factory('resolver', function($rootScope, $q, $timeout) {

            var deferred;

            function run () {
                deferred = $q.defer();
                return deferred;
            }

            function isResolve() {
                return deferred ? deferred.promise : null;
            }

            return {
                run: run,
                isResolve: isResolve
            };
        })
        .factory('Subscriber', function($resource) {

            return $resource("/api/:number", {number: '@number'}, {
                get: {
                    method: 'GET'
                },
                save: {
                    method: 'POST',
                    xsiType: 'subscriber'
                },
                changePassword: {
                    url: '/api/:number/password',
                    method: 'POST',
                    xsiType: 'changePasswordRequest'

                }
            });
        })
        .factory('BlackNumber', function($resource) {
            return $resource("/api/:number/blacklist/:id", {number: '@subscriberNumber'}, {
                query: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                save: {
                    method: 'POST',
                    xsiType: 'blackNumber'
                },
                delete: {
                    method: 'DELETE',
                    params: {id: '@id'}
                }
            });
        })
        .factory('NumberFormat', function ($resource) {
            return $resource("/api/numberFormats", {}, {
                get: {
                    method: 'GET',
                    isArray: false
                }
            })
        })
        .factory('Domain', ['$resource', function($resource) {
            return $resource("/api/:number/domain", {number: '@subscriberNumber'}, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            });
        }])
        .factory('sysCategories',['$resource', function($resource) {
            return $resource("/api/category", {}, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            });

        }])
        .factory('Categories',['$resource', function($resource) {
            return $resource("/api/:number/category/:id", {number: '@subscriberNumber'}, {
                query: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                save: {
                    method: 'POST',
                    xsiType: 'subscriberCategory'
                },
                delete: {
                    method: 'DELETE',
                    params: {id: '@id'}
                }
            });
        }])
        .factory('OperatorsNumber', function($resource){
            return $resource("/api/v2/:number/number/:id", {number: '@subscriberNumber'}, {
                query: {
                    method: 'GET',
                    after: function(result){
                        if (angular.isUndefined(result)) {
                            return [];
                        }

                        for(var i=0; i< result.length; i++){
                            if(result[i].groupsList && !angular.isArray(result[i].groupsList)) {
                                result[i].groupsList = [result[i].groupsList];
                            }
                        }
                        return result;
                    },
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                save: {
                    method: 'POST',
                    xsiType: 'destinationNumberV2'
                },
                delete: {
                    method: 'DELETE',
                    params: {id: '@id'}
                }
            });
        })
        .factory('OperatorsGroup', function($resource){
            var res = $resource("/api/v2/:number/group/:id", {number: '@subscriberNumber'}, {
                query: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                save: {
                    method: 'POST',
                    xsiType: 'destinationNumberGroupV2'
                },
                delete: {
                    method: 'DELETE',
                    params: {id: '@id'}
                }
            });

            return res;
        })
        .service('Statistics', function($resource, $filter) {

            var self = this;

            self.result = [];

            self.filter = {
                number:     0,
                type:       'callcount',
                startDate:  new Date().setHours(0, 0),
                endDate:    new Date().getTime(),
                datePeriod: 'ONE_DAY'
            };

            this.query = function(download) {

                var filter = {},
                    url = '/api/:number/statistics/';

                for(var key in self.filter) {
                    if(key =='startDate' || key == 'endDate') {
                        filter[key] = $filter('date')(self.filter[key], (this.filter.type == 'incoming_calls' ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'));
                    }
                    else if(key !='type') {
                        filter[key] = self.filter[key];
                    }
                }

                switch(this.filter.type) {
                    case "regionbreakdown":
                        url+= 'regionbreakdown';
                        break;
                    case "callcount":
                        url+= 'callcount';
                        break;
                    case "caller":
                        url+= 'trafficcount/caller';
                        break;
                    case "destination":
                        url+= 'trafficcount/destination';
                        break;
                    case "failscount":
                        url+= 'failscount';
                        break;
                    case "incoming_calls":
                        url+= 'incoming_calls';
                        break;
                    default:
                        url+= 'trafficcount';
                        break;
                }

                // заглушка, чтобы не уходили лишние поля
                if(this.filter.type=='caller') {
                    delete filter.destNumberMask;
                }
                else if(this.filter.type=='destination') {
                    delete filter.aNumberMask;
                }
                else if(this.filter.type=='regionbreakdown') {
                    delete filter.aNumberMask;
                    delete filter.destNumberMask;
                    delete filter.datePeriod;
                }
                else if(this.filter.type=='callcount') {
                    delete filter.aNumberMask;
                    delete filter.destNumberMask;
                    delete filter.startDate;
                    delete filter.endDate;
                    delete filter.datePeriod;
                }
                else {
                    delete filter.aNumberMask;
                    delete filter.destNumberMask;
                }

                // для скачивания отчета
                if(download) {
                    var q = [];
                    for(var k in filter) {
                        if(k!='number') {
                            q.push(encodeURIComponent(k) + '=' + encodeURIComponent(filter[k]));
                        }
                    }
                    location.href = url.replace(":number", filter.number) + '/xls?' + q.join('&');
                }
                else {
                    var res = $resource(url, {}, {
                        query: {
                            method: 'GET',
                            after: function(res) {

                                var result = [];

                                // заглушка, так как приходит массив
                                res = (angular.isArray(res) && res.length>0) ? res[0] : [];

                                // если общий отчет
                                if(res['@xsi.type']=='callCountReport') {
                                    delete res['@xsi.type'];
                                    for(var key in res) {
                                        result.push(angular.extend(res[key], {period: key}));
                                    }
                                }
                                // определяем тип статистики
                                else {
                                    angular.forEach(['records', 'data', 'countRecords'], function(value) {
                                        if(res[value]) {
                                            result = angular.isArray(res[value]) ? res[value] : [res[value]];
                                        }
                                    });
                                }

                                return result;
                            },
                            isArray: true
                        }
                    });

                    self.result = res.query(filter);
                }

                return self;
            };
        })
        .factory('Region', function($q, $http){

            function Region() {
                Object.defineProperties(this, {
                    'idx': {
                        writable: true,
                        value: {
                            id: {}
                        }
                    }
                });
            }

            Region.prototype = [];

            Region.prototype.buildTree = function buildTree(data, parentId) {
                var item, result = [];
                for(var i = 0; i < data.length; i++) {
                    item = data[i];
                    if(item.parentRegionId === parentId) {
                        item.children = this.buildTree(data, item.id);
                        result.push(item);
                        this.idx.id[item.id] = item;
                    }

                }
                return result;
            };

            Region.prototype.tree = function getTree() {

                var self = this;

                this.$promise = $http.get('/api/region', {isArray: true}).then(function(res) {

                    if(angular.isArray(res.data)) {

                        // обнуляем результат
                        self.splice(0, self.length);

                        // добавляем элементы
                        self.push.apply(self, self.buildTree(res.data));

//                    for(var i=0; i<res.data.length; i++) {
//                        res.data[i].children = [];
//                        self.idx.id[res.data[i].id] = res.data[i];
//                        if(!res.data[i].parentRegionId) {
//                            self.push(res.data[i]);
//                            self[self.length-1].children = [];
//                        }
//                        else {
//                            self.idx.id[res.data[i].parentRegionId].children.push(res.data[i]);
//                        }
//                    }
                    }

                    return self;

                });

                return self;
            };

            Region.tree = function () {
                return new Region().tree();
            };

            return Region;
        })
        .factory('TreeModel', function(){

            function TreeNode(node, parent) {

                for(var k in node) {
                    if(node.hasOwnProperty(k)) {
                        this[k] = node[k];
                    }
                }

                Object.defineProperties(this, {
                    '$path': {
                        enumerable: false,
                        configurable: false,
                        writable: true,
                        value: (parent ? parent.$path + '.' + parent.getChildren().length : 0)
                    },
                    '$index': {
                        enumerable: false,
                        configurable: false,
                        writable: true,
                        value: (parent ? parent.getChildren().length : 0)
                    },
                    '$parent': {
                        enumerable: false,
                        configurable: false,
                        writable: true,
                        value: parent || null
                    }
                });

                this.initChild(0);
            }
            TreeNode.prototype.addChild = function addChild(node, pos) {

                var init = false,
                    children = this.getChildren();

                // если позиция не задана то добавляем в конец
                if(angular.isUndefined(pos)) pos = children.length; else init = true;

                // node должен быть массивом
                if(!angular.isArray(node)) node = [node];

                // добавляем
                for (var i = 0; i < node.length; i++) {
                    children.splice(pos + i, 0, new TreeNode(node[i], this));
                }

                // переинициализируем с позиции
                if(init) {
                    this.initChild(pos + node.length - 1);
                }
            };
            TreeNode.prototype.getChildren = function getChildren() {
                if(angular.isUndefined(this.rules)) {
                    this.rules = [];
                }
                else
                if(!angular.isArray(this.rules)) {
                    this.rules = [this.rules];
                }
                return this.rules;
            };
            TreeNode.prototype.removeChild = function removeChild(index, notinit) {
                var removed = this.getChildren().splice(index, 1);
                if(!notinit) this.initChild(index);
                return removed[0];
            };
            TreeNode.prototype.removeAllChild = function removeChild() {
                this.getChildren().splice(0, this.rules.length);
            };
            TreeNode.prototype.initChild = function initChild(start) {
                var children = this.getChildren();
                this.addChild(children.splice(angular.isUndefined(start) ? 0 : start, children.length));
            };

            return TreeNode;
        })
        .factory('Rules', function($resource, $http, $q, $filter, TreeModel){

            var result = [],
                deferred = $q.defer();

            function prepareSave(result) {
                for(var i=0; i<result.length; i++) {
                    delete result[i].id;

                    if(result[i]['@xsi.type']=='keyQuotaSetRule') {
                        result[i].startTime = $filter('date')(result[i].startTime, 'yyyy-MM-dd HH:mm');
                    }

                    if(angular.isArray(result[i].rules)) {
                        result[i].rules = prepareSave(result[i].rules);
                    }
                }
                return result;
            }

            function prepareLoad(result) {
                for(var i=0; i<result.length; i++) {

                    if(result[i]['@xsi.type']=='regionRule') {
                        if(!result[i].regionIds) {
                            result[i].regionIds = [];
                        }
                        else if(!angular.isArray(result[i].regionIds)) {
                            result[i].regionIds = [result[i].regionIds];
                        }
                    }

                    if(result[i]['@xsi.type']=='calendarRule') {
                        if(typeof result[i].calendarInterval.weekdays == 'number') {
                            result[i].calendarInterval.weekdays = [result[i].calendarInterval.weekdays];
                        }
                    }

                    if(angular.isArray(result[i].rules)) {
                        result[i].rules = prepareLoad(result[i].rules);
                    }
                }
                return result;
            }

            Object.defineProperties(result, {
                '$promise': {
                    value: deferred.promise
                },
                'get': {
                    value: function(number) {

                        // запрос на получение нод
                        $http.get('/api/' + number + '/rule', {isArray: true}).then(function(res) {

                            // если не пришло, то добавляем по дефолту
                            if(angular.isUndefined(res.data)) {
                                res.data = [{
                                    "@xsi.type":"defaultRule",
                                    "subscriberNumber": number,
                                    "rules": [{
                                        "@xsi.type": "callRule",
                                        "subscriberNumber": number,
                                        "destinationNumberGroupId":""
                                    }]
                                }];
                            }

                            // обнуляем результат
                            result.splice(0, result.length);

                            // рекурсивно создаем ноды
                            for(var i=0; i<res.data.length; i++) {
                                // если нет дочерних нод, то создаем по умолчанию
                                if(angular.isUndefined(res.data[i].rules)) {
                                    res.data[i].rules = [{
                                        "@xsi.type": "callRule",
                                        "subscriberNumber": number,
                                        "destinationNumberGroupId": ""
                                    }];
                                }
                                result.push(new TreeModel(res.data[i]));
                            }

                            // возвращаем результат
                            deferred.resolve(prepareLoad(result));

                        }, function(r){
                            // произошла ошибка
                            deferred.reject(r);
                        });

                        return result;
                    }
                },
                'save': {
                    value: function(number) {
                        $http.post('/api/' + number + '/rule', {"ruleSet":{"rootRules": prepareSave(result)}}).then(function(r) {
                            deferred.resolve(r);
                        }, function(r){
                            deferred.reject(r);
                        });
                        return result;
                    }
                }
            });

            return result;

        })
        .factory('Rule', function(){

            return {
                add: add,
                clear: clear,
                remove: remove,
                create: create,
                insert: insert,
                update: update
            };

            // функция для рекурсивного расширения обьекта, так-как стандартная angular.extend этого не умеет
            function extendDeep(dst) {
                angular.forEach(arguments, function(obj) {
                    if (obj !== dst) {
                        angular.forEach(obj, function(value, key) {
                            if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
                                extendDeep(dst[key], value);
                            } else {
                                dst[key] = value;
                            }
                        });
                    }
                });
                return dst;
            }

            function add(node, rule) {

                rule.rules = [{
                    "@xsi.type": "callRule",
                    "subscriberNumber": rule.subscriberNumber,
                    "destinationNumberGroupId": ""
                }];

                node.addChild(rule, node.rules.length-1);
            }

            function clear(node) {
                node.removeAllChild();
                node.addChild({
                    "@xsi.type": "callRule",
                    "subscriberNumber": node.subscriberNumber,
                    "destinationNumberGroupId": ""
                });
            }

            function remove(node) {
                var parent = node.$parent,
                    children = parent.getChildren();

                if(parent && children.length) {
                    parent.removeChild(node.$index);
                    if(children.length<2 && children[0]['@xsi.type']=='defaultRule') {
                        parent.addChild(parent.removeChild(0).getChildren());
                    }
                }
            }

            function create(data) {

                var rule = {
                    "@xsi.type": null,
                    "subscriberNumber": null,
                    "rules": []
                };

                if(angular.isString(data)) {
                    rule['@xsi.type'] = data;
                }
                else if(angular.isObject(data) && !angular.isArray(data)) {
                    rule['@xsi.type'] = data['@xsi.type'];
                }

                switch (rule['@xsi.type']) {
                    case 'regionRule':
                        angular.extend(rule, {
                            "regionIds": []         // идентификаторы регионов
                        });
                        break;
                    case 'calendarRule':
                        angular.extend(rule, {
                            "calendarInterval": {   // интервал действия правила
                                "startTime":    "06:00", // время начала
                                "endTime":      "18:00", // время конца
                                "weekdays":     [0,1,2,3,4,5,6], // дни недели (0-воскресенье)
                                "customDates":  []  // дополнительные дни действия правила (1 января = 1, 29 февраля високосного года = 60, 1 марта = 61, 31 декабря = 366)
                            }
                        });
                        break;
                    case 'categoryRule':
                        angular.extend(rule, {
                            "categoryId": ""        // идентификатор категории (системной или пользовательской)
                        });
                        break;
                    case 'keyQuotaSetRule':
                        angular.extend(rule, {
                            "startTime":    new Date().getTime(), // начало действия правила-счетчика
                            "loopEnabled":  true,       // цикличность
                            "maxCount":     10          // максимальное значение счетчика
                        });
                        break;
                    case 'keyQuotaRule':
                        angular.extend(rule, {
                            "firstCount":   1,      // начало диапазона
                            "lastCount":    10      // конец диапазона
                        });
                        break;

                }

                if(angular.isObject(data) && !angular.isArray(data)) {
                    rule = extendDeep(rule, data);
                }

                return rule;
            }

            function insert(node, rule) {

                if(rule["@xsi.type"]=='keyQuotaSetRule') {
                    rule.rules = [{
                        "@xsi.type": "keyQuotaRule",
                        "subscriberNumber": rule.subscriberNumber,
                        "firstCount": 1,
                        "lastCount": rule.maxCount,
                        "rules": [{
                            "@xsi.type": "callRule",
                            "subscriberNumber": rule.subscriberNumber,
                            "destinationNumberGroupId": ""
                        }]
                    },{
                        "@xsi.type": "defaultRule",
                        "subscriberNumber": rule.subscriberNumber,
                        "rules": [{
                            "@xsi.type": "callRule",
                            "subscriberNumber": rule.subscriberNumber,
                            "destinationNumberGroupId": ""
                        }]
                    }];
                }
                else {
                    rule.rules = [{
                        "@xsi.type": "callRule",
                        "subscriberNumber": rule.subscriberNumber,
                        "destinationNumberGroupId": ""
                    }];
                }

                node.addChild([rule, {
                    "@xsi.type": "defaultRule",                      // тип правила
                    "subscriberNumber": rule.subscriberNumber,       // номер подписки
                    "rules": node.rules.splice(0, node.rules.length)
                }]);
            }

            function update(node, ruleData) {
                angular.extend(node, ruleData);
            }
        })

        .factory('CountryRegion', function($resource) {
            return $resource("/api/v2/countryRegions", {}, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            });
        })

        .factory('Reservation', ['$resource', '$http', function($resource, $http) {
            return {
                numbers: $resource("/api/numbers?:query", {}, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        params: {
                            query: '@query'
                        }

                    },
                    get: {
                        method: 'GET'
                    }
                }),
                prefixes: $resource("/api/numberPrefixes", {}, {
                    query: {
                        method: 'GET',
                        isArray: true
                    },
                    get: {
                        method: 'GET'
                    }
                }),
                settings: $resource("/api/user/bookingAgent/reservation", {}, {
                    query: {
                        method: 'GET',
                        isArray: true

                    },
                    get: {
                        method: 'GET'

                    }
                }),
                securityCodes: function(msisdn) {
                    return $http.post("/api/securityCodes", {msisdn: msisdn}).then(function(res) {
                        return res.data;
                    });
                },
                securityCodeCheck: function(code, sessionId) {
                    return $http.post("/api/checkSecurityCode", {securityCode: code, sessionId: sessionId}).then(function(res) {
                        return res.data;
                    });
                },
                reserv: function(data, contractType) {
                    var url = "/api/reservations"+((contractType === 'paper')?"":"WithDA?redirect=false");
                    return $http.post(url, data).then(function(res) {
                        return res;
                    }, function (res) {
                        return res;
                    });
                }
            };
        }])

        // трансформатор http запросов
        .factory('restHttpTransformer', ['$q', function($q) {
            return {
                'request': function(config) {

                    // если xsiType сущность
                    if(config.xsiType && angular.isObject(config.data)) {

                        // копируем конфиг чтобы не затерать старый
                        config = angular.copy(config);

                        // создаем обьект сущности
                        config.data[config.xsiType] = {
                            '@xsi.type': config.xsiType
                        };

                        for(var key in config.data) {
                            if(key!=config.xsiType && key.charAt(0)!='$' && config.data.hasOwnProperty(key)) {
                                config.data[config.xsiType][key] = config.data[key];
                                delete config.data[key];
                            }
                        }
                    }

                    // что-то делает при успешном статусе ответа сервера
                    return config || $q.when(config);
                },
                'response': function(res) {

                    var headers = res.headers(),
                        data = res.data;

                    // если запрос к api
                    if(res.config.url.match(/^\/api/i) && headers['content-type'] && headers['content-type'].match(/application\/json/i)) {

                        // если ошибка
                        if(!angular.isObject(data) || !data.response || data.response.status!==200) {
                            if(data.response.data && data.response.data[0] && data.response.data[0].errors) {
                                res.data.response.data = angular.isArray(data.response.data[0].errors) ? data.response.data[0].errors : [data.response.data[0].errors];
                            }
                            data.response.config = res.config;
                            return $q.reject(data.response);
                        }

                        // корректируем данные
                        if (res.config.isArray) {
                            res.data = !angular.isArray(data.response.data) && data.response.data ? [data.response.data] : data.response.data;
                            if (data.response.meta && res.data) {
                                res.data.meta = data.response.meta;
                            }
                        }
                        else {
                            res.data = angular.isArray(data.response.data) ? data.response.data[0] : data.response.data;
                        }

                        // вызываем функцию, если нужно
                        if(angular.isFunction(res.config.after)) {
                            res.data = res.config.after.call(this, res.data, res.config);
                        }
                    }

                    return res || $q.when(res);
                }
            };
        }])
        // сервис перехвата http ошибок
        .factory('restHttpMessages', ['$q', '$rootScope', '$translate', function($q, $rootScope, $translate) {

            return {
                'response': function(res) {
                    notify(res);
                    return res || $q.when(res);
                },
                'responseError': function(res) {
                    notify(res);
                    return $q.reject(res);
                }
            };

            function translate(message){
                var n = message.match(/(.*)\s+(\d+)/i),
                    m = 'ERRORS.' + angular.uppercase(n ? n[1] : message).trim().replace(/\s/g, '_'),
                    tr = $translate.instant(m, {line: n ? n[2] : undefined, identify: $rootScope.identify});

                return (tr==m ? message : tr);
            }

            function mFormat(message, def){
                if(message) {
                    var ms = message.split(':');
                    if (ms.length > 1) {
                        return translate(ms[0]) + ' ' + translate(ms[1]);
                    }
                    else {
                        return translate(ms[0]);
                    }
                }
                else if(def) {
                    return translate(def);
                }
            }

            function notify(res) {
                switch (res.status) {
                    case 200: // успешный запрос, сообщение всегда "OK", кроме случая бронирования ч/з DAS
                        var defMessage = (!angular.isUndefined(res.config.url) && res.config.url.indexOf("reservationsWithDA") > -1)?"DAS_OK":"OK";
                        if(res.config.method!='GET' && res.config.xsiType!='loginRequest') $rootScope.notify = mFormat(res.message, defMessage);
                        break;
                    case 204: // при успешном удалении любой сущности, сообщение всегда "No content"
                        $rootScope.notify = mFormat(res.message, "OK");
                        break;
                    case 401: // переданы неверные логин или пароль
                        $rootScope.notify = mFormat(res.message, "AUTHENTICATION_FAILED");
                        break;
                    case 403: // пользователь не имеет доступа к запрашиваемым объектам
                        if($rootScope.identify) $rootScope.notify = mFormat(res.message, "ACCESS_DENIED");
                        break;
                    case 404: // необходимый объект не найден
                        $rootScope.notify = mFormat(res.message, "NOT_FOUND");
                        break;
                    case 409: // конфликт версии при оптимистичном блокировании, сообщение всегда
                        $rootScope.notify = mFormat(res.message, "NOT_FOUND");
                        break;
                    case 422: // семантически некорректный запрос
                        if(angular.isArray(res.data) || res.message) {
                            var messages = [mFormat(res.message, "ERROR")];
                            // сообщение о правиле
                            if(angular.isArray(res.data)) {
                                for (var i = 0; i < res.data.length; i++) {
                                    //messages.push('Поле: ' + res.data[i].cause + ", " + mFormat(res.data[i].message));
                                    // потому что с этой ошибкой приходит сообщение Server Internal Error, которое не нужно выводить
                                    if(res.data[i].message==='TARIFF_AREA_DOESNT_MATCH') messages = [];
                                    messages.push(mFormat(res.data[i].message));
                                }
                            }
                            $rootScope.notify = messages.join('\n');
                        }
                        else {
                            $rootScope.notify = mFormat(res.message, "VALIDATION_ERROR");
                        }
                        break;
                    case 500: //общая ошибка.
                        $rootScope.notify = mFormat(res.message, "INTERNAL_SERVER_ERROR");
                        break;
                    case 502: //не вернвй шлюз.
                        $rootScope.notify = mFormat(res.message, "BAD_GATEWAY");
                        break;
                    default:
                        $rootScope.notify = mFormat(res.message, "ERROR");
                }
            }
        }])
        // сервис-индикатор процесса  http запросов
        .factory('restHttpLoader', ['$q', '$rootScope', function($q, $rootScope) {

            // кол-во ajax запросов
            var loader = 0,
                deferred;

            return {
                'request': function(config) {

                    // если запросов еще небыло
                    if(loader<1) {
                        deferred = $q.defer();
                        $rootScope.loader = deferred.promise;
                    }

                    // плюс 1 запрос
                    loader++;

                    // что-то делает при успешном статусе ответа сервера
                    return config || $q.when(config);
                },
                'response': function(res) {

                    // минус 1 запрос
                    loader--;

                    // больше ничего не загружается
                    if(loader<1 && deferred) {
                        deferred.resolve();
                    }

                    return res || $q.when(res);
                },
                'responseError': function(res) {

                    // минус 1 запрос
                    loader--;

                    // больше ничего не загружается
                    if(loader<1 && deferred) {
                        deferred.resolve();
                    }

                    // что-то делает при ошибке
                    return $q.reject(res);
                }
            };
        }]);

})();
