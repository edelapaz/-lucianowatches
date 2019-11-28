<?php $this->template->load('backend/template/scripts'); ?>
<div class="alert alert-block">
	<img src="<?php echo base_url('src/theme/img/lock.png')?>" /><br>
	<h4 class="alert-heading">
		Zona Restringida!
	</h4><br>
	<?php echo $this->session->userdata('full_name');?> No Tiene Acceso
	<a href="javascript:;" onClick="history.go(-1);">
		Volver Atras
	</a><br>
</div>