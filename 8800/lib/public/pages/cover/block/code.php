<!-- Page -->
<div class="page" id="root">

    <!-- Topbar -->
    <? include('TOPBAR'); ?>
    <!--/Topbar -->

    <!-- PageInner -->
    <div class="page__inner">

        <!-- mobile-menu -->
        <? include('MOBILE-MENU'); ?>
        <!--/mobile-menu -->

        <!-- cover -->
        <div class="cover cover_video">

            <!-- Header -->
            <? include('HEADER'); ?>
            <!--/Header -->

            <div class="cover__video-box">
                <video class="cover__video" src="public/temp/SampleVideo.mp4" loop></video>
                <i class="cover__play-button play-button"></i>
            </div>

            <div class="cover__content cover__content--block">
                <div class="cover__connect connect">
                    <div class="promo-block-8800__title">С&nbsp;&laquo;8 800&raquo; бизнес малым не&nbsp;покажется</div>
                    <!--                        <div class="connect__service-info">Услуга «8 800» увеличит количество входящих обращений в вашу компанию. Потенциальные клиенты из любой точки РФ смогут бесплатно позвонить с городского или мобильного номера, чтобы уточнить необходимую информацию или сделать заказ.</div>-->
                    <h5 class="title-5 promo-block-880">Услуга «8 800» увеличит количество входящих обращений в вашу компанию. Потенциальные клиенты из любой точки РФ смогут бесплатно позвонить с городского или мобильного номера, чтобы уточнить необходимую информацию или сделать заказ.</h5>
                    <div class="connect__payment promo-block-880">
                        <div class="connect__sum-box">
                            <!--                                <span class="up">от</span> -->
                            <span class="connect__service-sum">1 500 <span class="rub">С</span></span>
                            <!--                                <span class="up">в месяц</span>-->
                        </div>
                        <!--                            <a class="connect__details-sum link" href="#">Подробнее о цене</a>-->
                    </div>
                    <div class="connect__button-box">
                        <a class="button connect__button promo-block-8800__button" href="#">Подобрать номер</a>
                        <!--                            <a class="connect__button" href="#">Подобрать номер</a>-->
                    </div>
                </div>
                <div class="cover__connect--img-block">
                    <div class="cover__video-img" style="background-image: url('/images/background-cover.jpg');"></div>
                </div>
            </div>

        </div>
        <!--/cover -->

    </div>
    <!--/PageInner -->

</div>
<!--/Page -->