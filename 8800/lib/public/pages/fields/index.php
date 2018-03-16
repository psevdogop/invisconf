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
				<div class="g12-sm-4">
					<input type="text" class="field" placeholder="Название поля">
				</div>
			</div>
			<div class="demo__item">
				<div class="g12-sm-4">
					<textarea class="field field_textarea" placeholder="Введите сообщение" id="comment" rows="4"></textarea>
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
