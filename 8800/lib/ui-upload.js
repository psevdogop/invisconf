angular.module('ui.upload', [])
    .directive('uiUpload', ['$rootScope', '$translate', function($rootScope, $translate) {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            template: (
                '<div class="ui-upload-button">' +
                    '<span ng-transclude></span>' +
                '</div>'
            ),
            scope: {
                model: '=uiUpload',
                accept: '=uiUploadAccept'
            },
            link: function($scope, element, attrs) {

                var input = angular.element('<input type="file" />');

                // добавляем
                if(angular.isUndefined(attrs.disabled)) element.append(input.clone());

                // следим за кликом
                element.on('change', 'input', function() {
                    if(this.files.length && angular.isArray($scope.model.files)) {

                        var accept = ['*/*'], errors = [];

                        if(angular.isArray($scope.accept)) {
                            accept = $scope.accept;
                        }
                        else if(attrs.uiUploadAccept){
                            accept = attrs.uiUploadAccept.split(',');
                        }

                        // преобразовываем в regexp
                        accept = accept.map(function(item) {
                            return new RegExp(item.trim().replace('*', '.*'), 'i');
                        });

                        $scope.$apply(angular.bind(this, function() {

                            // добавляем файлы в модель
                            for(var i=0; i<this.files.length; i++) {

                                // если файл разрешен
                                if(accept.some(function(testRegExp){return this.type && this.type.match(testRegExp)!==null}, this.files[i])) {
                                    $scope.model.files.push(this.files[i]);
                                }
                                else {
                                    errors.push(this.files[i].name);
                                }
                            }

                            // очищаем поле
                            angular.element(this).remove();
                            element.append(input.clone());

                            // выдаем ошибку или загружаем
                            if(errors.length){
                                $rootScope.notify = $translate.instant('ERRORS.FILE_TYPE_IS_NOT_ACCEPTED', {file: errors.join(', ')});
                            }
                            else {
                                $scope.model.upload();
                            }
                        }));
                    }
                });

                // удаляем input при disabled
                attrs.$observe('disabled', function(disabled) {
                    if(disabled) {
                        element.find('input').remove();
                    }
                    else {
                        element.append(input.clone());
                    }
                });
            }
        }
    }])
    .factory('UiUpload', ['$http', function($http) {

        var uploader = {
                url: '',
                name: 'upload',
                files: [],
                upload: Upload,
                onUpload: null
            };

        return uploader;

        // загружаем
        function Upload() {

            var fd = new FormData();

            // добавляем данные в форму
            for(var i=0; i<uploader.files.length; i++) {
                fd.append(uploader.name, uploader.files[i]);
            }

            $http.post((typeof uploader.url == 'function' ? uploader.url() : uploader.url), fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
                .success(function() {
                    if(angular.isFunction(uploader.onUpload)) uploader.onUpload.apply(this, arguments);
                    uploader.files = [];
                })
                .error(function() {
                    uploader.files = [];
                });
        }

    }]);
