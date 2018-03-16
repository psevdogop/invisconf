<script id="template" type="text/x-handlebars-template">
        <div class="alert alert-warning" style="display:none;" id="cbr_info">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <strong>Внимание!</strong> Данные от ЦБ не получены, расчет произведен по старому курсу! Необходимо обновить страницу!
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="CAT_Custom_615838" id="CAT_Custom_615838_0" value="Снятие оттисков, получение фотографий, составление и модификация 3D плана лечения" onclick="calc(this,'{{service1}}')" /> Снятие оттисков
                </label>
                <b>{{service1}} руб</b>
            </div>
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="CAT_Custom_615838" id="CAT_Custom_615838_1" value="Подготовка 3D плана лечения (техническая часть)" onclick="calc(this,'{{service2}}')" /> Подготовка 3D плана
                </label>
                <b>{{service2}} руб</b>
            </div>
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="CAT_Custom_615838" id="CAT_Custom_615838_2" value="Набор элайнеров Invisalign Lite (техническая часть)" onclick="calc(this,'{{service3}}')" /> Набор Lite 
                </label>
                <b>{{service3}} руб</b>
            </div>
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="CAT_Custom_615838" id="CAT_Custom_615838_3" value="Набор элайнеров Invisalign Full (техническая часть)" onclick="calc(this,'{{service4}}')" /> Набор Full
                </label>
                <b>{{service4}} руб</b>
            </div>
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="CAT_Custom_615838" id="CAT_Custom_615838_4" value="Лечение с применением системы Invisalign Lite" onclick="calc(this,'{{service5}}')" /> Лечение Lite
                </label>
                <b>{{service5}} руб</b>
            </div>
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="CAT_Custom_615838" id="CAT_Custom_615838_5" value="Лечение с применением системы Invisalign Full (первая категория, срок лечения до 1,5 лет, до 40 элайнеров)" onclick="calc(this,'{{service6}}')" /> Лечение Full (1 категория)
                </label>
                <b>{{service6}} руб</b>
            </div>
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="CAT_Custom_615838" id="CAT_Custom_615838_6" value="Лечение с применением системы Invisalign Full (вторая категория, срок лечения более 1,5 лет, более 40 элайнеров)" onclick="calc(this,'{{service7}}')" /> Лечение Full (2 категория)
                </label>
                <b>{{service7}} руб</b>
            </div>
        </div>
          <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="CAT_Custom_6158380" id="CAT_Custom_615838_7" value="Набор ретенционных капп Invisalign Vivera (техническая часть)" onclick="calc(this,'{{service8}}')" /> Набор Vivera
                </label>
                <b>{{service8}} руб</b>
            </div>
        </div>
                      <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="CAT_Custom_615838_8" id="CAT_Custom_615838_8" value="Набор элайнеров Invisalign Teen (техническая часть)" onclick="calc(this,'{{service9}}')" /> Набор Teen
                </label>
                <b>{{service9}} руб</b>
            </div>
        </div>
                     <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="CAT_Custom_615838_9" id="CAT_Custom_615838_9" value="Повторное посещение" onclick="calc(this,'{{service10}}')" /> Повторное посещение
                </label>
                <b>{{service10}} руб</b>
            </div>
        </div>
    </script>