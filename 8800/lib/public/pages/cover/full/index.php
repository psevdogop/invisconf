<!DOCTYPE html>
<html lang="ru">

<?
$root = $_SERVER['DOCUMENT_ROOT'];
include($root . '/../includes/template/head.php');
?>

<body>

<!-- Page -->
<div class="page page_iframe" id="root">

    <!-- Topbar -->
    <? include($root.'/../includes/template/topbar.php'); ?>
    <!--/Topbar -->

    <!-- PageInner -->
    <div class="page__inner">

        <!-- mobile-menu -->
        <? include($root.'/../includes/template/mobile-menu.php'); ?>
        <!--/mobile-menu -->

        <!-- cover -->
        <div class="cover cover_video">

            <!-- Header -->
            <? include($root.'/../includes/template/header.php'); ?>
            <!--/Header -->

            <div class="cover__video-box">
                <div class="cover__video-img" style="background-image: url('/images/background-cover.jpg');"></div>
<!--                <video class="cover__video" src="temp/SampleVideo.mp4" loop></video>-->
                <i class="cover__play-button play-button"></i>
            </div>

            <div class="cover__content">
                <div class="cover__connect connect">
                    <div class="promo-block-8800__title">С&nbsp;&laquo;8 800&raquo; бизнес малым не&nbsp;покажется</div>
                    <h5 class="title-5 promo-block-880">Услуга «8 800» увеличит количество входящих обращений в вашу компанию. Потенциальные клиенты из любой точки РФ смогут бесплатно позвонить с городского или мобильного номера, чтобы уточнить необходимую информацию или сделать заказ.</h5>
                    <div class="connect__payment promo-block-880">
                        <div class="connect__sum-box">
                            <span class="connect__service-sum">1 500 <span class="rub">С</span></span>
                        </div>
                    </div>
                    <div class="connect__button-box">
                        <a class="button connect__button promo-block-8800__button" href="#">Подобрать номер</a>
                    </div>
                </div>
            </div>

        </div>
        <!--/cover -->

    </div>
    <!--/PageInner -->

</div>
<!--/Page -->

<!-- JS -->
<? include($root . '/../includes/template/scripts.php'); ?>
<!--/JS -->

</body>
</html>

