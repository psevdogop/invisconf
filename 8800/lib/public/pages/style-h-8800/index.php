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
				<div class="demo__item__title">H2</div>
				<div class="demo__item__content">
					<h2 class="title-8800-2">Информация</h2>
				</div>
			</div>
			<div class="demo__item">
				<div class="demo__item__title">H2</div>
				<div class="demo__item__content">
					<h2 class="title-8800-2 title-8800--color-brand">Информация</h2>
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
