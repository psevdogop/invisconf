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
			<div class="cover" style="background-image: url('/images/background-cover.jpg');">

				<!-- Header -->
				<? include($root.'/../includes/template/header.php'); ?>
				<!--/Header -->

				<div class="cover__content">
					<div class="promo-block">
						<div class="promo-block__title title-1">С&nbsp;&laquo;8800&raquo; бизнес малым не&nbsp;покажется</div>
						<div class="promo-block__sub-title title-3">Приобретайте номер онлайн</div>
						<a class="promo-block__button button" href="#">Узнайте больше</a>
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
