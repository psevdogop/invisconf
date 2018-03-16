<!-- Topbar -->
<? include('TOPBAR'); ?>
<!--/Topbar -->

<!-- PageInner -->
<div class="page__inner">

	<!-- mobile-menu -->
	<? include('MOBILE-MENU'); ?>
	<!--/mobile-menu -->

	<!-- Header -->
	<? include('HEADER'); ?>
	<!--/Header -->

	<div class="wiki">
		<div class="wiki__container container">
			<div class="row">
				<div class="g12-md-3">
					<? include('WIKI-ASIDE'); ?>
				</div>
				<div class="g12-md-9">
					<div class="wiki-main">
						<div class="wiki-main__title title-3">Результаты поиска</div>
						<div class="wiki-main__description">К сожалению, мы ничего не смогли найти на нашем сайте по вашему запросу.</div>
						<figure class="wiki-main__img">
							<img src="/images/wiki/wiki-no-result.svg" alt="">
						</figure>
						<p class="wiki-main__text wiki-main__text_small-indent">Популярные вопросы</p>
						<a href="#" class="wiki-main__text wiki-main__text_small-indent">– Как заключить новый договор и стать корпоративным клиентом?</a>
						<a href="#" class="wiki-main__text wiki-main__text_small-indent">– Мобильная АТС</a>
						<a href="#" class="wiki-main__text wiki-main__text_small-indent">– SIP - телефоны</a>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>
<!--/PageInner -->