<!DOCTYPE html>
<html lang="ru">
<? include($_SERVER['DOCUMENT_ROOT'] . '/../includes/template/head.php'); ?>
<body>

	<!-- Page -->
	<div class="page page_iframe" id="root">
			<div class="demo__content">
				<div class="demo__item">
					<div class="demo__item__title">Фиолетовая</div>

					<div class="demo__item__content">
						<a href="#" class="button">Подключить</a>
						<a href="#" class="button button_disable">Подключить</a>
					</div>
				</div>
				<div class="demo__item">
					<div class="demo__item__title">Серая</div>
					<div class="demo__item__content">
						<a href="#" class="button button_gray">Подключить</a>
						<a href="#" class="button button_gray button_disable">Подключить</a>
					</div>
				</div>
				<div class="demo__item">
					<div class="demo__item__title">Белая</div>
					<div class="demo__item__content demo__bg demo__bg_brand">
						<a href="#" class="button button_white">Подключить</a>
						<a href="#" class="button button_white button_disable">Подключить</a>
					</div>
				</div>
				<div class="demo__item">
					<div class="demo__item__title">С обводкой</div>
					<div class="demo__item__content demo__bg demo__bg_image">
						<a href="#" class="button button_border">Подключить</a>
						<a href="#" class="button button_border button_disable">Подключить</a>
					</div>
				</div>
				<div class="demo__item">
					<div class="demo__item__title">С обводкой</div>
					<div class="demo__item__content demo__bg demo__bg_gray">
						<a href="#" class="button button_border-brand">Подключить</a>
						<a href="#" class="button button_border-brand button_disable">Подключить</a>
					</div>
				</div>
				<div class="demo__item">
					<div class="demo__item__title">Кнопка в&nbsp;блоках &laquo;Обложка&raquo; и&nbsp;&laquo;Call to&nbsp;action&raquo;</div>
					<div class="demo__item__content demo__item__content_long">
						<a href="#" class="button button_action">Узнайте больше</a>
						<a href="#" class="button button_gray button_action">Узнайте больше</a>
						<a href="#" class="button button_border-brand button_action">Узнайте больше</a>
					</div>
				</div>
				<div class="demo__item">
					<div class="demo__item__title">Состояние контролов</div>
					<div class="demo__item__content">
						<a href="#" class="action action_prev"></a>
						<a href="#" class="action action_next"></a>
						<a href="#" class="action action_next action_disable"></a>
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