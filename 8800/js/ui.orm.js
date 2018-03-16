(function(){

    'use strict';

    Function.prototype.extend = function (Parent) {
        this.prototype = Object.create(Parent.prototype, {
            constructor: {value: this},
            superclass: {value: Parent.prototype}
        });
    };

    /* Адаптер по умолчанию */

    function Adapter() {
        this.methods = {
            '$get': 'get',
            '$find': 'find',
            '$delete': 'delete',
            '$create': 'create',
            '$update': 'update'
        };
    }

    Adapter.prototype.get = function get() {
        console.log(this.methods);
    };

    /* JsonRpc2.0 Адаптер */

    function JsonRpc2_0() {
        this.superclass.constructor.apply(this.superclass, arguments);
        this.get();
    }

    JsonRpc2_0.extend(Adapter);

    JsonRpc2_0.prototype.test = function test() {
        console.log(this);
    };


    /* Обьект */

    function Obj(prop) {
        console.log(this, 123);
    }

    Obj.prototype.$get = function ObjGet() {
        var self = this;
        return this.$adapter.get(this.$id).then(function(res){
            for(var key in res) {
                self[key] = res[key];
            }
            return self;
        });
    };

    Obj.prototype.$save = function ObjSave() {
        return this.id ? this.$adapter.update(this) : this.$adapter.create(this);
    };

    Obj.prototype.$delete = function ObjDelete() {
        return this.$adapter.delete(this);
    };


    /* Коллекция */

    function Collection(model, adapter) {
        Object.defineProperties(this, {
            $model: { value: model },
            $adapter: { value: adapter }
        });
    }

    Collection.extend(Array);

    Collection.prototype.$find = function CollectionFind() {

    };

    Collection.prototype.$save = function CollectionSave() {

    };

    Collection.prototype.$delete = function CollectionDelete() {
        return this.$adapter.delete([]);
    };


    /* Дерево */

    function Tree() {

    }

    Tree.extend(Obj);

    Tree.prototype.$get = function TreeGet() {

    };

    Tree.prototype.$save = function TreeSave() {

    };

    function defineModel(self, name, config) {

        /*jslint evil: true */
        var Model = eval('(function ' + name + '(){this.superclass.constructor.apply(this.superclass, arguments);})'),
            ModelSchema = !config || !config.schema || !self.schema[config.schema] ? self.schema['default'] : self.schema[config.schema],
            ModelAdapter = ModelSchema.adapter && self.adapter[ModelSchema.adapter] ? self.adapter[ModelSchema.adapter] : Adapter;

        Model.$new = function() {
            Model.extend(Obj);
            Model.prototype.$adapter = new ModelAdapter();
            return new Model();
        };

        Model.$tree = function() {
            Model.extend(Tree);
            Model.prototype.$adapter = new ModelAdapter();
            return new Model();
        };

        Model.$collection = function() {
            Model.prototype.$adapter = new ModelAdapter();
            return new Collection(Model, Model.prototype.$adapter);
        };

        return Model;
    }


    if(angular) {
        angular.module('ui.orm', [])
            .provider('orm', function() {

                var self = this;

                this.schema = {
                    'default': {},
                    'jsonrpc': {
                        adapter: 'json-rpc-2.0',
                        url: '/api/'
                    }
                };

                this.adapter = {
                    'json-rpc-2.0': JsonRpc2_0
                };

                this.$get = [function() {
                    return {
                        define: function() {
                            return defineModel(self, arguments[0], arguments[1]);
                        }
                    };
                }];
            });
    }

})();
