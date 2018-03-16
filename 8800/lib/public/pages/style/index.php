<!DOCTYPE html>
<html lang="ru">
<?
$root = $_SERVER['DOCUMENT_ROOT'];
include($root . '/../includes/template/head.php');?>
<body>

	<!-- Page -->
	<div class="page page_iframe" id="root">
		<div class="demo__content">
			<div class="demo__item">
				<div class="demo__item__title">H1</div>
				<div class="demo__item__content">
					<h1 class="title-brand-1">МультиФон</h1>
				</div>
			</div>
			<div class="demo__item">
				<div class="demo__item__title">H1</div>
				<div class="demo__item__content">
					<h1 class="title-1">МультиФон</h1>
				</div>
			</div>
			<div class="demo__item">
				<div class="demo__item__title">H2</div>
				<div class="demo__item__content">
					<h2 class="title-2">Информация</h2>
				</div>
			</div>
			<div class="demo__item">
				<div class="demo__item__title">H3</div>
				<div class="demo__item__content">
					<h3 class="title-3">Докфлоу</h3>
				</div>
			</div>
			<div class="demo__item">
				<div class="demo__item__title">H4</div>
				<div class="demo__item__content">
					<h4 class="title-4">Сомневаетесь?<br>Просто попробуйте!</h4>
				</div>
			</div>
			<div class="demo__item">
				<div class="demo__item__title">H5</div>
				<div class="demo__item__content">
					<h5 class="title-5">Все сервисы</h5>
				</div>
			</div>
			<div class="demo__item">
				<div class="demo__item__title">P</div>
				<div class="demo__item__content">
					<p>Вы&nbsp;можете в&nbsp;любой момент контролировать состояние своего счета</p>
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
