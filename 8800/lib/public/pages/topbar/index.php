<!DOCTYPE html>
<html lang="ru">
<?
$root = $_SERVER['DOCUMENT_ROOT'];
include($root . '/../includes/template/head.php');?>
<body>

	<!-- Page -->
	<div class="page page_iframe page_iframe-xs" id="root">
		<div class="topbar">
			<div class="topbar__container container">
				<ul class="topbar__list">
					<li class="topbar__item i-hidden-tablet">
						<a href="#" class="topbar__link">Частным клиентам</a>
					</li>
					<li class="topbar__item i-hidden-phone">
						<a href="#" class="topbar__link topbar__link_active">Корпоративным клиентам</a>
					</li>
					<li class="topbar__item i-hidden-notebook">
						<a href="#" class="topbar__link">Инвесторам и прессе</a>
					</li>
					<li class="topbar__item i-hidden-notebook">
						<a href="#" class="topbar__link">Интернет-магазин <i class="icon-basket"></i></a>
					</li>
					<li class="topbar__item i-visible-notebook topbar-dropdown topbar-dropdown_left">
						<div class="topbar-dropdown__toggle">
							<span class="topbar-dropdown__toggle-text">Все сайты</span>
						</div>
						<div class="topbar-dropdown__content">
							<div class="topbar-dropdown__body">
								<ul class="topbar-dropdown__list">
									<li class="topbar-dropdown__item i-visible-tablet">
										<a href="#" class="topbar-dropdown__link">Частным клиентам</a>
									</li>
									<li class="topbar-dropdown__item i-visible-phone">
										<a href="#" class="topbar-dropdown__link">Корпоративным клиентам</a>
									</li>
									<li class="topbar-dropdown__item i-visible-notebook">
										<a href="#" class="topbar-dropdown__link">Инвесторам и прессе</a>
									</li>
									<li class="topbar-dropdown__item i-visible-notebook">
										<a href="#" class="topbar-dropdown__link">Интернет-магазин <i class="icon-basket"></i></a>
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
				<ul class="topbar__list">
                    <li class="topbar__item topbar-dropdown" id="menu-regions">
                        <div class="topbar-dropdown__toggle">
                            <span class="topbar-dropdown__toggle-text" id="select-region" data-tag="moscow">Москва и область</span>
                        </div>
						<div class="topbar-dropdown__content">
							<div class="topbar-dropdown__body">
								<? include($root.'/../includes/template/location-search.php'); ?>
							</div>
						</div>
					</li>
<!--					<li class="topbar__item topbar-dropdown">-->
<!--						<div class="topbar-dropdown__toggle">-->
<!--							<span class="topbar-dropdown__toggle-text">Мой аккаунт</span>-->
<!--						</div>-->
<!--						<div class="topbar-dropdown__content">-->
<!--							<div class="topbar-dropdown__body">-->
<!--								<div class="location-change">-->
<!--									<div class="location-change__content">-->
<!--										<div class="location-change__current">Москва и&nbsp;область</div>-->
<!--										<div class="location-change__change link">Изменить регион</div>-->
<!--									</div>-->
<!--									<div class="location-change__search">-->
<!--										--><?// include($root.'/../includes/template/location-search.php'); ?>
<!--									</div>-->
<!--								</div>-->
<!--								<!-- account -->
<!--								<div class="account">-->
<!--									<div class="account__header">-->
<!--										<div class="account__user user">-->
<!--											<div class="user__photo">-->
<!--												<img src="/temp/userpic.jpg" alt="">-->
<!--											</div>-->
<!--											<div class="user__name">ООО «Ростехстроймонтаж»</div>-->
<!--											<div class="user__phone">89265550721</div>-->
<!--										</div>-->
<!--									</div>-->
<!--									<div class="account__body">-->
<!--										<div class="account__group">-->
<!--											<div class="account__group-title">Рекомендуемые сервисы:</div>-->
<!--											<div class="link-item">-->
<!--												<div class="link-item__content">-->
<!--													<i data-icon="&#xe0a0;" class="link-item__icon icon"></i>-->
<!--													<div class="link-item__text">Бесплатный номер 8&nbsp;800</div>-->
<!--													<a href="#" class="link-item__more link">Подробнее</a>-->
<!--												</div>-->
<!--												<a href="#" class="link-item__button button">Подключить</a>-->
<!--											</div>-->
<!--											<div class="link-item">-->
<!--												<div class="link-item__content">-->
<!--													<i data-icon="&#xe09b;" class="link-item__icon icon"></i>-->
<!--													<div class="link-item__text">Электронный документооборот</div>-->
<!--													<a href="#" class="link-item__more link">Подробнее</a>-->
<!--												</div>-->
<!--												<a href="#" class="link-item__button button">Подключить</a>-->
<!--											</div>-->
<!--										</div>-->
<!--										<div class="account__group">-->
<!--											<div class="account__group-title">Подключенные сервисы:</div>-->
<!--											<div class="link-item">-->
<!--												<div class="link-item__content">-->
<!--													<i data-icon="&#xe093;" class="link-item__icon icon"></i>-->
<!--													<div class="link-item__text">Мобильное информирование</div>-->
<!--												</div>-->
<!--												<a href="#" class="link-item__button button button_gray">Открыть</a>-->
<!--											</div>-->
<!--											<div class="link-item">-->
<!--												<div class="link-item__content">-->
<!--													<i data-icon="&#xe0ad;" class="link-item__icon icon"></i>-->
<!--													<div class="link-item__text">М2М&nbsp;&mdash; Мониторинг</div>-->
<!--												</div>-->
<!--												<a href="#" class="link-item__button button">Открыть</a>-->
<!--											</div>-->
<!--											<div class="link-item">-->
<!--												<div class="link-item__content">-->
<!--													<a href="#" class="link-item__text link">Все сервисы</a>-->
<!--												</div>-->
<!--											</div>-->
<!--										</div>-->
<!--									</div>-->
<!--									<div class="account__footer">-->
<!--										<div class="link-item">-->
<!--											<div class="link-item__content">-->
<!--												<i data-icon="&#xe021;" class="link-item__icon icon"></i>-->
<!--												<a href="#" class="link-item__link link">Помощь</a>-->
<!--											</div>-->
<!--										</div>-->
<!--										<div class="link-item">-->
<!--											<div class="link-item__content">-->
<!--												<i data-icon="&#xe01f;" class="link-item__icon icon"></i>-->
<!--												<a href="#" class="link-item__link link">Настройки</a>-->
<!--											</div>-->
<!--										</div>-->
<!--										<div class="link-item">-->
<!--											<div class="link-item__content">-->
<!--												<i data-icon="&#xe08d;" class="link-item__icon icon"></i>-->
<!--												<a href="#" class="link-item__link link">Выход</a>-->
<!--											</div>-->
<!--										</div>-->
<!--									</div>-->
<!--								</div>-->
<!--								<!--/account -->
<!--							</div>-->
<!--						</div>-->
<!--					</li>-->
				</ul>
			</div>
		</div>
        <div class="location-change" id="location-change">
            <div class="location-change__content">
                <div class="location-change__title">Ваш домашний регион&nbsp;&mdash;  <span id="result-region">Москва и&nbsp;область</span>?</div>
                <div class="location-change__conferm">Да</div>
                <div class="location-change__change link" id="location-change__change">Изменить регион</div>
            </div>
		</div>
	</div>
	<!--/Page -->

	<!-- JS -->
	<? include($_SERVER['DOCUMENT_ROOT'] . '/../includes/template/scripts.php'); ?>
	<!--/JS -->

</body>
</html>
