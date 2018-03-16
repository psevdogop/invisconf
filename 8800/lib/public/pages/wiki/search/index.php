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
								<div class="wiki-result__item">
									<div class="wiki-result__num">1</div>
									<div class="wiki-result__content">
										<a href="#" class="wiki-result__title">Перевод вызова</a>
										<div class="wiki-result__text">
											... или установил в опциях телефона запрет на передачу данных в роуминге, опция «Льготный роуминг» будет недоступна. Что <span class="wiki-result__result">подключено</span>? Для просмотра <span class="wiki-result__result">подключенных</span> роуминговых пакетов наберите *105*530# . Как отключить?<br>Для отключения опции наберите *501*0# . Как ...
										</div>
									</div>
								</div>
								<div class="wiki-result__item">
									<div class="wiki-result__num">2</div>
									<div class="wiki-result__content">
										<a href="#" class="wiki-result__title">SIP - телефон</a>
										<div class="wiki-result__text">
											... пополните счет на 500 ₽, и Вы получите в подарок мобильный телефон! МегаФон приготовил отличный сюрприз для каждого, кто <span class="wiki-result__result">подключится</span> к сети в собственных офисах оператора. Выбрав номер мобильного телефона, подходящий тариф и пополнив счет на 500 ₽, абонент ...
										</div>
									</div>
								</div>
								<div class="wiki-result__item">
									<div class="wiki-result__num">3</div>
									<div class="wiki-result__content">
										<a href="#" class="wiki-result__title">Черный список</a>
										<div class="wiki-result__text">
											... По вашему запросу ничего не найдено. Тарифная опция действует в течение 30 дней с момента подключения. Если абонент <span class="wiki-result__result">подключил</span> « Запрет международного роуминга » или установил в опциях телефона запрет на передачу данных в роуминге, опция «Льготный роуминг ...
										</div>
									</div>
								</div>
								<div class="wiki-result__item">
									<div class="wiki-result__num">4</div>
									<div class="wiki-result__content">
										<a href="#" class="wiki-result__title">Сотофоны на ПК</a>
										<div class="wiki-result__text">
											... пополните счет на 500 ₽, и Вы получите в подарок мобильный телефон! МегаФон приготовил отличный сюрприз для каждого, кто <span class="wiki-result__result">подключится</span> к сети в собственных офисах оператора. Выбрав номер мобильного телефона, подходящий тариф и пополнив счет на 500 ₽, абонент ...
										</div>
									</div>
								</div>
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
