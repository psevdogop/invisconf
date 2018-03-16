<!DOCTYPE html>
<html lang="ru">
<? include($_SERVER['DOCUMENT_ROOT'] . '/../includes/template/head.php'); ?>
<body>

	<!-- Page -->
	<div class="page page_iframe" id="root">
		<div class="page__container container">
			<? include(__DIR__ . '/code.php'); ?>
		</div>
	</div>
	<!--/Page -->

	<!-- JS -->
	<? include($_SERVER['DOCUMENT_ROOT'] . '/../includes/template/scripts.php'); ?>
	<!--/JS -->

</body>
</html>
