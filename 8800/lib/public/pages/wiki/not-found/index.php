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
		<? include($root . '/../includes/template/topbar.php'); ?>
		<!--/Topbar -->

		<!-- PageInner -->
		<div class="page__inner">

			<!-- mobile-menu -->
			<? include($root . '/../includes/template/mobile-menu.php'); ?>
			<!--/mobile-menu -->

			<!-- Header -->
			<? include($root . '/../includes/template/header.php'); ?>
			<!--/Header -->

			<div class="wiki">
				<div class="wiki__container container">
					<div class="row">
						<div class="g12-md-3">
							<? include($root . '/../includes/template/wiki-aside.php'); ?>
						</div>
						<div class="g12-md-9">
							<div class="wiki-main">
								<div class="wiki-main__title title-3">Результаты поиска</div>
								<div class="wiki-main__description">К сожалению, мы ничего не смогли найти на нашем сайте по вашему запросу.</div>
								<figure class="wiki-main__img">
									<img src="/images/wiki/wiki-no-result.svg" alt="">
								</figure>
								<p class="wiki-main__text wiki-main__text_small-indent">Популярные вопросы</p>
								<a href="#" class="wiki-main__text wiki-main__text_small-indent">– Как заключить новый договор и стать корпоративным клиентом?</a>
								<a href="#" class="wiki-main__text wiki-main__text_small-indent">– Мобильная АТС</a>
								<a href="#" class="wiki-main__text wiki-main__text_small-indent">– SIP - телефоны</a>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
		<!--/PageInner -->

	</div>
	<!--/Page -->

	<!-- JS -->
	<? include($_SERVER['DOCUMENT_ROOT'] . '/../includes/template/scripts.php'); ?>
	<!--/JS -->

</body>
</html>
