/* Filters */

angular.module('8800.filters', [])
    .filter('phone', [function () {
        return function (val) {
            if (!val) { return ''; }

            var value = val.toString().trim().replace(/^\+/, '');

            if(value.length < 11 || value.match(/[^0-9]/)) {
                return val;
            }

            return value.slice(0, 1) + ' (' + value.slice(1, 4) + ') ' + [value.slice(4, 7), value.slice(7, 9), value.slice(9, 11)].join('-');
        };
    }])
    .filter('matchProp', [function () {

        var getAllStringProperties = function(obj) {
            var strings = [];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop) && typeof obj[prop] === 'string' && prop !== '$$hashKey') { // only get strings and ignore the $$hashKey property added by angularjs
                    strings.push(obj[prop]);
                }
            }
            return strings;
        };

        var getProperties = function(obj, properties) {
            var strings = [];
            for (var i=0, len=properties.length; i<len; i++) {
                strings.push(obj[properties[i]]);
            }
            return strings;
        };

        return function(haystack, needle, properties) {

            var results = [];

            if(!needle) {
                return haystack;
            }

            for(var i=0; i<haystack.length; i++) {

                var testObj = haystack[i],
                    searchStrings = [];

                if(angular.isArray(properties)) {
                    searchStrings = getProperties(testObj, properties);
                }
                else {
                    searchStrings = getAllStringProperties(testObj);
                }

                for (var j=0; j<searchStrings.length; j++) {
                    if(searchStrings[j] && String(searchStrings[j]).toLowerCase().indexOf(needle.toLowerCase()) !== -1) {
                        results.push(testObj);
                        break;
                    }
                }
            }

            return results;
        };
    }])
    .filter('parent', function () {
        return function (data, n) {
            var parent = data;
            for(var i=0; i<n; i++) {
                parent = parent.$parent;
                if(!parent) {
                    break;
                }
            }
            return parent;
        };
    })
    .filter('phone8800', [function () {
        return function (input) {
            if (!input) { return ''; }
            input = input.toString().replace(/(\(|\)|\s|[A-Za-z])/g, "");
            if (input.length == 11) {
                input = "8 " + input.substring(1, 4) + " " + input.substring(4, 7) + "-" + input.substring(7, 9) + "-" + input.substring(9, 11);
            }

            return input;
        };
    }])
    .filter('formatNumber', [function () {
        return function (input) {
            if (!input) { return ''; }
            if (input.length == 11) {
                input = input.substring(0, 1) + " " + input.substring(1, 4) + " " + input.substring(4, 7) + " " + input.substring(7, 9) + " " + input.substring(9, 11);
            }

            return input;
        };
    }])
    .filter('idx', function ($rootScope) {
        return function (data, idx) {
            var result = [];
            idx = idx.split('.');
            if($rootScope[idx[0]] && $rootScope[idx[0]].length) {
                if(!angular.isArray(data)) {
                    if ($rootScope[idx[0]].idx[idx[1]]) {
                        result = $rootScope[idx[0]].idx[idx[1]][data];
                    }
                }
                else {
                    for (var i = 0; i < data.length; i++) {
                        if ($rootScope[idx[0]].idx[idx[1]]) {
                            result.push($rootScope[idx[0]].idx[idx[1]][data[i]]);
                        }
                    }
                }

            }
            return result;
        };
    });
