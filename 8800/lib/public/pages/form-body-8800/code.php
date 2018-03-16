<div class="container">
    <div class="form-body-8800">
        <div id="form-modal-ok" class="form-modal-ok hide">
            <div class="img-close" ng-click="onCloseOkModal($event)"></div>
            <div class="form-modal-ok__block">
                <img src="/lib/public/images/check-icon-ok.svg" alt="">
                <h3 class="title-3">Спасибо, заявка отправлена!</h3>
                <h5 class="title-5">В ближайшее время с Вами<br>свяжется менеджер</h5>
<!--                <button ng-click="onCloseOkModal($event)" class="button">Закрыть окно</button><br>-->
                <a href="https://8800.megafon.ru"  class="link-home">На сайт услуги</a>
            </div>
        </div>
        <div id="form-modal-error" class="form-modal-error hide">
            <div class="img-close" ng-click="onCloseErrorModal($event)"></div>
            <div class="form-modal-error__block">
                <img src="/lib/public/images/check-icon-error.svg" alt="">
                <h3 class="title-3">Произошла неизвестная ошибка</h3>
                <a href="#" ui-sref="reservation.request" class="button">Попробовать еще раз</a>
            </div>
        </div>
        <form name="reservForm" data-ng-init="init()">
            <div class="wrapper wrapper--up">

                <h2 class="title-8800-2 title-8800--color-brand">Подключение<br>номера {{$stateParams.reservNumberPhone.number | phone8800}}</h2>

                <div class="clearfix">
                    <div class="form-body-8800__main">

                        <section class="form-body-8800__main__block">
                            <h3 class="title-3">1. Укажите контактные данные</h3>
                            <div class="form-body-8800__contact">
                                <div class="form-body-8800__info-soc">
                                    <div class="form-body-8800__info-region">
                                        <angucomplete-alt id="countryRegion"
                                                          placeholder="Регион РФ*"
                                                          pause="100"
                                                          selected-object="countryRegionSelect"
                                                          local-data="regions"
                                                          search-fields="name"
                                                          title-field="name"
                                                          minlength="2"
                                                          input-class="form-body-8800__input-in"
                                                          class="form-body-8800__input"
                                                          match-class="highlight"
                                                          autocomplete="off"
                                                          required/>
                                    </div>
                                    <div class="form-body-8800__info-name">
                                        <input type="text" class="form-body-8800__input"
                                               id="name"
                                               placeholder="Имя*"
                                               ng-model="reserv.communication.person"
                                               autocomplete="on" required>
                                    </div>
                                    <input type="hidden" id="countryRegionSelectId" ng-model="countryRegionSelect.description.id" ng-value="countryRegionSelect.description.id" required/>
                                </div>
                                <div class="form-body-8800__info-geo">
                                    <input type="text" class="form-body-8800__input"
                                           id="phone"
                                           ng-model="reserv.communication.cellphone"
                                           ui-mask="+7 (999) 999-99-99"
                                           placeholder="Контактный номер*"
                                           ui-mask-placeholder="+7 (___) ___-__-__"
                                           ng-model-options="{ updateOn: 'blur' }"
                                           autocomplete="on">
                                    <input type="email" class="form-body-8800__input"
                                           id="email"
                                           placeholder="E-mail*"
                                           name="email"
                                           ng-model="reserv.communication['e-mail']"
                                           ng-required="req.contractType === 'paper'"
                                           autocomplete="on">
                                </div>
                                <div class="form-body-8800__info-code" ng-class="reservNew.securityCodeFlag ? 'button_visible' : ''">
                                    <div class="form-body-8800__info-code__block">
                                        <div class="form-body-8800__info-code__input">
                                            <input type="text" class="form-body-8800__input"
                                                   id="secretCode"
                                                   placeholder="Код"
                                                   name="secretCode"
                                                   ng-model="reserv.securityCode"
                                                   ng-model-options="{ updateOn: 'blur' }"
                                                   autocomplete="on"
                                                   maxlength="4"
                                                   size="4"
                                                   style="width: 106px; height: 40px;"
                                                   required>
                                            <i class="form-body-8800__icon-check-8800"
                                               ng-if="reservNew.securityCodeFlagCheck"></i>
                                        </div>
                                        <input ng-class="(reserv.communication.cellphone == '') ? ['button', 'button_border-brand', 'button_disable'] : ['button']"
                                               type="button"
                                               value="Подтвердить"
                                               ng-disabled="reserv.communication.cellphone == ''"
                                               ng-click="checkCode()"
                                               style="width: 170px;">
                                        <button class="button--a"
                                                ng-click="getCode()"
                                                style="width: 200px;" formnovalidate>Получить код повторно</button>
                                    </div>
                                    <input class="form-body-8800__info-code__submit" ng-class="(reserv.communication.cellphone == '') ? ['button', 'button_border-brand', 'button_disable'] : ['button']"
                                           type="button"
                                           value="{{reservNew.securityTitle[stepCode]}}"
                                           ng-disabled="reserv.communication.cellphone == ''"
                                           ng-click="getCode()"
                                           style="width: 200px;">
                                </div>

                            </div>

                            <h3 class="title-3">2. Укажите данные юридического лица</h3>
                            <div class="form-body-8800__contact">
                                <div class="form-body-8800__info-org">
                                    <input type="text" class="form-body-8800__input form-body-8800__input-hint"
                                           id="entity_number"
                                           placeholder="ИНН организации*"
                                           ng-model="reserv.companyTIN"
                                           ng-pattern="/^(\d{10}|\d{12})$/"
                                           maxlength="12"
                                           autocomplete="on" required>
<!--                                    <i class="icon-question-1 form-block__icon form-block__icon_question"></i>-->

                                    <!--                        <span class="form-body-8800__hint">-->
                                    <!--                        </span>-->

                                    <input type="text" class="form-body-8800__input"
                                           id="companyName"
                                           placeholder="Юридическое лицо/ИП*"
                                           ng-model="reserv.companyName"
                                           autocomplete="on" required>
                                </div>
                                <textarea class="form-body-8800__info-description"
                                          placeholder="Примечание к заказу"></textarea>
                            </div>
                            <section ng-if="isCategory($stateParams.reservNumberPhone.category)">
                                <h5 class="title-5">
                                    Заключить договор на самый популярный тариф "Пакет 400 минут" вы можете не только в бумажной, но и в электронной форме.
                                </h5>
                                <section class="form-body-8800__doc">
                                    <div class="form-body-8800__doc__block" id="doc_edo" ng-model="reservNew.edo" ng-click="toogleEdo()">
                                        <i class="form-body-8800__icon-check-8800"></i>
                                        <h4 class="title-4">
                                            Подписать договор с тарифом "Пакет 400 минут"<br>в электронной форме?
                                        </h4>
                                        <p>Для заключения договора в электронной форме потребуется сертификат квалифицированной ЭП, выданный любым аккредитованным удостоверяющим центром.</p>
                                    </div>
                                </section>
                            </section>
                            <div class="form-body-8800__conf__block">
                                <input type="checkbox" class="checklist-8800__checkbox" id="conf" ng-model="checkContract" ng-change="validate('contract')">
                                <label for="conf" class="checklist-8800__label checklist__label--color-brand">Даю согласие на обработку своих персональных данных</label>
                                <input type="hidden" ng-model="checkContractText" value="checkContractText" required/>
                            </div>
                        </section>


                    </div>
                    <div class="form-body-8800__info" ng-if="reserv.companyName === '' || reserv.companyTIN === ''
                        || reserv.communication.person === '' || reserv.communication['e-mail'] === ''
                        || reserv.communication.cellphone === '' || error.code.fl
                        || error.checkCode.fl || error.testCode.fl || countryRegionSelect === null">
                        <i class="form-body-8800__icon-attention"></i>
                        <div class="form-body-8800__info__block">
                            <p ng-if="reserv.companyName === ''">Вы не указали Наименование юр. лица</p>
                            <p ng-if="reserv.companyTIN === ''">Вы не указали ИНН организации</p>
                            <p ng-if="reserv.communication.person === ''">Вы не указали Имя покупателя</p>
                            <p ng-if="reserv.communication['e-mail'] === ''">Вы не указали E-mail покупателя</p>
                            <p ng-if="reserv.communication.cellphone === ''">Вы не указали Контактный номер</p>
                            <p ng-if="countryRegionSelect === null">Вы не указали Регион РФ</p>
<!--                            <p ng-if="reserv.communication.cellphone === ''">Вы не указали <a href="#phone" ng-click="onClickFormInput('phone')">Контактный номер</a></p>-->
                            <p ng-if="error.code.fl" style="color: #e96980;">{{error.code.text}}</p>
                            <p ng-if="error.testCode.fl" style="color: #e96980;">{{error.testCode.text}}</p>
                            <p ng-if="error.checkCode.fl" style="color: #e96980;">{{error.checkCode.text}}</p>

<!--                            <p ng-if="reserv.companyName === ''">Вы не указали <a href="#place" ng-click="onClickFormInput('place')">Город</a></p>-->
                        </div>
                    </div>
                </div>

            </div>
            <div class="form-body-8800__footer">
                <div class="wrapper">
                    <div class="form-body-8800__footer__block">
                        <a href="#" ui-sref="reservation.request" class="button button_border-brand">Другой номер</a>
                        <input ng-class="(reservForm.$invalid) ? ['button', 'button_border-brand', 'button_disable'] : ['button']"
                               type="submit"
                               value="{{reservNew.edo.title}}"
                               ng-click="save()"
                               ng-disabled="reservForm.$invalid">
<!--                        <input href="#" ng-class="(reservForm.$invalid) ? ['button', 'button_border-brand', 'button_disable'] : ['button', 'button_border-brand']"-->
<!--                               type="submit"-->
<!--                               value="Перейти в ЭДО"-->
<!--                               ng-disabled="reservForm.$invalid"-->
<!--                               ng-if="reserv.edo">-->
                        <!--                    <button class="btn btn--active">Другой номер</button>-->
                        <!--                    <button class="btn">Отправить заявку</button>-->

                        <!--                            <i class="icon-ic-support"></i>-->
                        <span class="form-body-8800__footer__title-man"><i class="form-body-8800__icon-support"></i> После отправки с вами свяжется менеджер</span>
                    </div>
                </div>
            </div>

        </form>
    </div>
</div>