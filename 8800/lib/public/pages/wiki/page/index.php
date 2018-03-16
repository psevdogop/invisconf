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
								<div class="wiki-main__title title-3">
									<span class="wiki-main__number">1</span>
									Создайте всех сотрудников
								</div>
								<p class="wiki-main__text">— При первом входе в интерфейс откроется раздел «Настройки»  →   «Сотрудники».</p>
								<figure class="wiki-main__media">
									<img src="/images/wiki/wiki-img-1.png" alt="">
								</figure>
								<p class="wiki-main__text">— Создайте учетные записи для всех сотрудников компании, которые будут работать с телефонией. Для этого нажмите «Добавить сотрудника» и заполните все поля.</p>
								<a href="#" class="wiki-main__text">— Изучите рекомендации по созданию сотрудников.</a>
								<p class="wiki-main__text">— После создания всех сотрудников экран будет выглядеть примерно вот так:</p>
								<figure class="wiki-main__media">
									<img src="/images/wiki/wiki-img-1.png" alt="">
								</figure>
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
	<? include($root . '/../includes/template/scripts.php'); ?>
	<!--/JS -->

</body>
</html>
