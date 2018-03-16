<!DOCTYPE html>
<html lang="ru">
<?
$root = $_SERVER['DOCUMENT_ROOT'];
include($root . '/../includes/template/head.php'); ?>
<body>

	<!-- Page -->
	<div class="page page_iframe page_iframe-xs" id="root">
		<? include(__DIR__ . '/code.php'); ?>
	</div>

	<!-- JS -->
	<? include($_SERVER['DOCUMENT_ROOT'] . '/../includes/template/scripts.php'); ?>
	<!--/JS -->

</body>
</html>
