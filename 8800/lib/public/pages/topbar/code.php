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
			<li class="topbar__item topbar-dropdown i-hidden-phone">
				<div class="topbar-dropdown__toggle">
					<span class="topbar-dropdown__toggle-text">Ростов-на-Дону (Ростовская область)</span>
				</div>
				<div class="topbar-dropdown__content">
					<div class="topbar-dropdown__body">
						<? include('LOCATION-SEARCH'); ?>
					</div>
				</div>
			</li>
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

