<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>
			<?= $title;?>
		</title>
		<link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
		<!-- css/ uikit -->
		<?= html('css','src/theme/css/uikit.min');?>
		<?= html('css','src/theme/css/style');?>
	</head>
	<body>
		<header class="header">
			<div class="md-display-none uk-margin-top uk-margin-bottom">
				<div class="uk-container uk-container-center">
					<div class="uk-grid uk-grid-small uk-flex uk-flex-middle" data-uk-grid-margin>
						<div class="uk-width-medium-1-2 uk-width-small-1-2">
							<div class="uk-panel">
								<p>
									<i class="uk-icon-envelope">
									</i>
									info@lucianowatches.com
								</p>
							</div>
						</div>
						<div class="uk-width-medium-1-2 uk-width-small-1-2">
							<div class="uk-panel uk-text-right">
								<p>
									<i class="uk-icon-phone">
									</i>
									1 (809) 594 3246
								</p>
							</div>
						</div>

					</div>
				</div>
			</div>
			<div class="uk-container uk-container-center">
				<div class="uk-grid uk-grid-small uk-flex uk-flex-middle" data-uk-grid-margin>
					<div class="uk-width-medium-3-10 uk-width-small-1-2">
						<div class="uk-panel">
							<h1>
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
		<?= $contents;?>
	</body>
	<!-- js / jquery -->
	<?= html('js','src/theme/js/jquery.min');?>
	<!-- js / uikit -->
	<?= html('js','src/theme/js/uikit.min');?>
	<!-- js / components -->
	<?= html('js','src/theme/js/components/grid.min');?>
</html>