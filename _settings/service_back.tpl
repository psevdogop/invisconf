var services = {
                    //Снятие оттисков и тп (RUB)
                    service1: {module_webapps, Калькулятор, a template = "/_settings/cнятие_оттисков.tpl"},
                    //Подготовка 3D (USD)
                    service2: (parseFloat(USD) * parseFloat({module_webapps, Калькулятор, a template = "/_settings/3d_план.tpl"})).toFixed(),
                    //Элайнеры Invisalign Lite (USD)
                    service3: (parseFloat(USD) * parseFloat({module_webapps, Калькулятор, a template = "/_settings/набор_lite.tpl"})).toFixed(),
                    //Элайнеры Invisalign Full (USD)
                    service4: (parseFloat(USD) * parseFloat({module_webapps, Калькулятор, a template = "/_settings/набор_full.tpl"})).toFixed(),
                    //Лечение Invisalign Lite (RUB)
                    service5: {module_webapps, Калькулятор, a template = "/_settings/лечение_lite.tpl"},
                    //Лечение Invisalign Full 1 (RUB)
                    service6: {module_webapps, Калькулятор, a template = "/_settings/лечение_full1.tpl"},
                    //Лечение Invisalign Full 2 (RUB)
                    service7: {module_webapps, Калькулятор, a template = "/_settings/лечение_full2.tpl"},
                    //Стоимость набора ретенционных капп Invisalign Vivera (техническая часть)
                    service8: (parseFloat(USD) * parseFloat({module_webapps, Калькулятор, a template = "/_settings/набор_vivera.tpl"})).toFixed(),
            //Элайнеры Invisalign Teen (USD)
                    service9: (parseFloat(USD) * parseFloat({module_webapps, Калькулятор, a template = "/_settings/набор_teen.tpl"})).toFixed(),
            //Повторное посещение
                    service10: {module_webapps, Калькулятор, a template = "/_settings/повторное_посещение.tpl"}
                }
                var serv_view = {
                    service1: accounting.formatNumber(services.service1, 0, " ", ","),
                    service2: accounting.formatNumber(services.service2, 0, " ", ","),
                    service3: accounting.formatNumber(services.service3, 0, " ", ","),
                    service4: accounting.formatNumber(services.service4, 0, " ", ","),
                    service5: accounting.formatNumber(services.service5, 0, " ", ","),
                    service6: accounting.formatNumber(services.service6, 0, " ", ","),
                    service7: accounting.formatNumber(services.service7, 0, " ", ","),
                    service8: accounting.formatNumber(services.service8, 0, " ", ","),
                    service9: accounting.formatNumber(services.service9, 0, " ", ","),
                    service10: accounting.formatNumber(services.service10, 0, " ", ",")
                };