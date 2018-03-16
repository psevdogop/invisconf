<!DOCTYPE html>
<html lang="ru">
<?
$root = $_SERVER['DOCUMENT_ROOT'];
include($root . '/../includes/template/head.php');?>
<body>

<!-- Page -->
<div class="page page_iframe page_iframe-xs" id="root">

    <div class="container container-sticky">
        <div class="footer-sticky">
            <div class="footer-sticky__info">
                <div class="footer-sticky__info__item-menu">
                    <span class="footer-sticky__name"><h5 class="title-5">Тарифы</h5></span>
                    <span class="footer-sticky__name"><h5 class="title-5">Часто задаваемые вопросы</h5></span>
                </div>
            </div>
            <div class="footer-sticky-top__button">
                <a href="#" class="button">Подобрать номер</a>
            </div>
        </div>
    </div>

</div>
<!--/Page -->

<!-- JS -->
<? include($_SERVER['DOCUMENT_ROOT'] . '/../includes/template/scripts.php'); ?>
<!--/JS -->

</body>
</html>
