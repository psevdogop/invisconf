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
					<video class="cover__video" src="temp/SampleVideo.mp4" loop></video>
					<i class="cover__play-button play-button"></i>
				</div>

				<div class="cover__content">
					<div class="cover__connect connect">
						<header class="connect__title title-1">Бесплатный номер 8 800</header>
						<div class="connect__service-info">Услуга &laquo;8 800&raquo; поможет увеличить количество входящих обращений в&nbsp;компанию. Возможность бесплатно позвонить с&nbsp;городского или мобильного номера и&nbsp;уточнить необходимую информацию приведёт к&nbsp;увеличению обращений, а, следовательно, и&nbsp;заказов.</div>
						<div class="connect__payment">
							<div class="connect__sum-box">
								от <span class="connect__service-sum">2000 <span class="rub">С</span></span> в месяц
							</div>
							<a class="connect__details-sum link" href="#">Подробнее о цене</a>
						</div>
						<div class="connect__button-box">
							<a class="connect__button button" href="#">Подключить</a>
							<a class="connect__button button button_border-brand" href="#">Подобрать номер</a>
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
