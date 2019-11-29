<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>
			<?= $title;?>
		</title>
		<!-- favicon -->
		<link rel="shortcut icon" type="image/favicon" href="<?= base_url('src/lucianowatches-favicon.png');?>">
		<link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
		<!-- css/ uikit -->
		<?= html('css','src/theme/css/uikit.min');?>
		<?= html('css','src/theme/css/components/slideshow');?>
		<?= html('css','src/theme/css/style');?>
	</head>
	<body>
		<header class="header" data-uk-sticky="{top:-200, animation: 'uk-animation-slide-top'}">
			<div class="md-display-none">
				<div class="uk-container uk-container-center">
					<div class="uk-grid uk-grid-small uk-flex uk-flex-middle" data-uk-grid-margin>
						<div class="uk-width-medium-1-3 uk-width-small-1-2">
							<div class="uk-panel">
								<p>
									<i class="uk-icon-envelope">
									</i>
									info@lucianowatches.com
								</p>
							</div>
						</div>
						<div class="uk-width-medium-1-3 uk-width-small-1-2">
							<div class="uk-panel uk-text-center">
								<ul	class="nav_icon">
									<li>
										<a class="uk-text-success" href="tel:8095943246" target="_blank" title="(809).594.3246">
											<i class="uk-icon-whatsapp">
											</i>
											809.594.3246
										</a>
									</li>
								</ul>
							</div>
						</div>

						<div class="uk-width-medium-1-3 uk-width-small-1-2">
							<div class="uk-panel uk-text-right">
								<nav class="uk-navbar" id="epn-icon-cart">
									<ul class="uk-navbar-nav">
										<li>
											<a href="#" class="" target="_blank">
												<i class="uk-icon-facebook">
												</i>
											</a>
										</li>
										<li>
											<a href="#" class="" target="_blank">
												<i class="uk-icon-instagram">
												</i>
											</a>
										</li>
										<li class="uk-parent" data-uk-dropdown>

											<a href="#">
												<i class="uk-icon-cart-plus">
												</i>
												<span class="uk-badge uk-badge-notification uk-badge-danger">
													10
												</span>
											</a>

											<div class="uk-dropdown uk-dropdown-navbar">
												<ul class="uk-navbar-nav">
													<li style="background:#f5f5f5">
														<table class="uk-table uk-table-middle uk-table-condensed uk-text-left">
															<tbody>
																<tr>
																	<td>
																		<a href="#">
																			<img width="75"
																			src="<?= base_url('uploads/slide/libazz-fashion-sliderimage1.jpg');?>">
																		</a>
																	</td>
																	<td>
																		<p class="uk-text-small">
																			<strong>
																				Reloj premium v2.0
																			</strong>
																			RD$ 300.00
																		</p>
																	</td>
																</tr>
																<tr>
																	<td>
																		<a href="#">
																			<img width="75"
																			src="<?= base_url('uploads/slide/libazz-fashion-sliderimage1.jpg');?>">
																		</a>
																	</td>
																	<td>
																		<p class="uk-text-small">
																			<strong>
																				Reloj premium v2.0
																			</strong>
																			RD$ 300.00
																		</p>
																	</td>
																</tr>
																<tr>
																	<td>
																		<a href="#">
																			<img width="75"
																			src="<?= base_url('uploads/slide/libazz-fashion-sliderimage1.jpg');?>">
																		</a>
																	</td>
																	<td>
																		<p class="uk-text-small">
																			<strong>
																				Reloj premium v2.0
																			</strong>
																			RD$ 300.00
																		</p>
																	</td>
																</tr>
																<tr>
																	<td>
																		<a href="#">
																			<img width="75"
																			src="<?= base_url('uploads/slide/libazz-fashion-sliderimage1.jpg');?>">
																		</a>
																	</td>
																	<td>
																		<p class="uk-text-small">
																			<strong>
																				Reloj premium v2.0
																			</strong>
																			RD$ 300.00
																		</p>
																	</td>
																</tr>
																<tr>
																	<td>
																		<a href="#">
																			<img width="75"
																			src="<?= base_url('uploads/slide/libazz-fashion-sliderimage1.jpg');?>">
																		</a>
																	</td>
																	<td>
																		<p class="uk-text-small">
																			<strong>
																				Reloj premium v2.0
																			</strong>
																			RD$ 300.00
																		</p>
																	</td>
																</tr>
																<tr>
																	<td>
																		<a href="#">
																			<img width="75"
																			src="<?= base_url('uploads/slide/libazz-fashion-sliderimage1.jpg');?>">
																		</a>
																	</td>
																	<td>
																		<p class="uk-text-small">
																			<strong>
																				Reloj premium v2.0
																			</strong>
																			RD$ 300.00
																		</p>
																	</td>
																</tr>
																<tr>
																	<td>
																		<a href="#">
																			<img width="75"
																			src="<?= base_url('uploads/slide/libazz-fashion-sliderimage1.jpg');?>">
																		</a>
																	</td>
																	<td>
																		<p class="uk-text-small">
																			<strong>
																				Reloj premium v2.0
																			</strong>
																			RD$ 300.00
																		</p>
																	</td>
																</tr>

																<tr>
																	<td colspan="2" class="uk-text-right">
																		<a class="uk-button uk-button-danger" href="#">
																			<i class="uk-icon-eye">
																			</i>
																		</a>

																		<a class="uk-button uk-button-danger" href="#">
																			<i class="uk-icon-cart-plus">
																			</i>
																		</a>
																	</td>
																</tr>
															</tbody>
														</table>
													</li>
												</ul>
											</div>
										</li>
										<li>
											<a href="#">
												<i class="uk-icon-users">
												</i>
											</a>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="uk-container uk-container-center">
				<div class="uk-grid uk-grid-small uk-flex uk-flex-middle" data-uk-grid-margin>
					<div class="uk-width-medium-3-10 uk-width-small-1-2">
						<div class="uk-panel">
							<h1 id="uk-logo">
								<a href="<?= site_url();?>">
									Luciano
									<strong>
										watches
									</strong>
								</a>
							</h1>
						</div>
					</div>
					<div class="uk-width-medium-7-10 uk-width-small-1-2">
						<div class="uk-panel">
							<ul id="menu_principal">
								<li>
									<a href="#">
										Inicio
									</a>
								</li>
								<li>
									<a href="#">
										Nosotros
									</a>
								</li>
								<li>
									<a href="#">
										Politica de envio
									</a>
								</li>
								<li>
									<a href="#">
										Politica de privacidad
									</a>
								</li>
								<li>
									<a href="#">
										Contactanos
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</header>
		<div class="uk-container-center">
			<?= $contents;?>
		</div>
		<!--bloque-->
		<div class="uk-block">
			<div class="uk-container uk-container-center">
				<div class="uk-grid uk-grid-large" data-uk-grid-margin>
					<div class="uk-width-medium-1-3 uk-width-small-1-2">
						<div class="uk-panel uk-card">
							<div class="uk-img">
								<i class="uk-icon-headphones"></i>
							</div>
							<div class="uk-card-text">
								<span>
									Soporte en línea
								</span>
								<p>
									servicio en cualquier momento
								</p>
							</div>
						</div>
					</div>
					<div class="uk-width-medium-1-3 uk-width-small-1-2">
						<div class="uk-panel uk-card">
							<div class="uk-img">
								<i class="uk-icon-shield"></i>
							</div>
							<div class="uk-card-text">
								<span>
									Devolución de dinero
								</span>
								<p>
									Pago 100% seguro
								</p>
							</div>
						</div>
					</div>
					<div class="uk-width-medium-1-3 uk-width-small-1-2">
						<div class="uk-panel uk-card">
							<div class="uk-img">
								<i class="uk-icon-bus"></i>
							</div>
							<div class="uk-card-text">
								<span>
									Enviar a todo el mundo
								</span>
								<p>
							Dentro de 5 a 7 días
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!--Footer-->
		<footer class="uk-block">
			<div class="uk-container uk-container-center">
				<div class="uk-grid uk-grid-large uk-flex uk-flex-middle" data-uk-grid-margin>
					<div class="uk-width-medium-3-10 uk-width-small-1-2">
						<div class="uk-panel">
							<h1 id="uk-logo">
								<a href="<?= site_url();?>">
									Luciano
									<strong>
										watches
									</strong>
								</a>
							</h1>
							<span class="uk-text-small">
								Lorem Ipsum is simply dummy text of the printing
								and has been industry's standard dummy text ever
								since.
								<strong>
									<br/>
									<i class="uk-icon-whatsapp">
									</i>809.594.3246
								</strong> |
								<strong>
									<i class="uk-icon-envelope-o">
									</i> info@lucianowatches.com
								</strong>
							</span>
						</div>
					</div>

					<div class="uk-width-medium-7-10 uk-width-small-1-2">
						<div class="uk-panel uk-panel-newsletter">
							<h3>
								Newsletter
								<span class="uk-text-small">
									Suscríbase para recibir actualizaciones importantes
								</span>
							</h3>

							<?= form_open('','class="uk-form"');?>
							<div class="uk-grid uk-grid-collapse" data-uk-grid-margin>
								<div class="uk-width-medium-7-10">
									<div class="uk-panel">
										<input type="email"
										placeholder="Envía tu dirección de correo electrónico"
										class="uk-form-large uk-width-1-1" name="newsletter_email" required="">
									</div>
								</div>
								<div class="uk-width-medium-3-10">
									<div class="uk-panel">
										<button type="submit" class="uk-button uk-button-large uk-button-danger">
											Regístrate
										</button>
									</div>
								</div>
							</div>
							<?= form_close();?>
							<div class="uk-margin">
							<h5 style="color:#e2524a; margin:2px 0;">Forma de pago</h5>
							<img src="<?= base_url('src/theme/img/libazz-fashion-payment.png');?>" alt="payment"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
		<div class="uk-footer">
			<div class="uk-container uk-container-center">
				<p>
					Lucianowatches.com
					<i class="uk-icon-copyright">
					</i>
					2019 Todos los derechos reservados
				</p>
			</div>

		</div>
	</body>
	<!-- js / jquery -->
	<?= html('js','src/theme/js/jquery.min');?>
	<!-- js / uikit -->
	<?= html('js','src/theme/js/uikit.min');?>
	<!-- js / components -->
	<?= html('js','src/theme/js/components/slideshow.min');?>
	<?= html('js','src/theme/js/components/slideshow-fx.min');?>
	<?= html('js','src/theme/js/components/grid.min');?>
	<?= html('js','src/theme/js/components/sticky.min');?>
	<!-- js / core -->
	<?= html('js','src/theme/js/core/nav.min');?>
	<?= html('js','src/theme/js/core/dropdown.min');?>
</html>