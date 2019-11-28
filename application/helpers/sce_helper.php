<?php
if( ! defined('BASEPATH')) exit('No direct script access allowed');
# -------------------------------------------------------------------
# OUTPUT OF JSON
# -------------------------------------------------------------------
if( ! function_exists('Json'))
{
	function Json($data = array())
	{
		$CI = & get_instance();
		$CI->output
		->set_status_header(200)
		->set_header('Cache-Control: no-store, no-cache, must-revalidate')
		->set_header('Cache-Control: post-check=0, pre-check=0')
		->set_header('Pragma: no-cache')
		->set_content_type('application/json', 'utf-8')
		->set_output(json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
		->_display();
		exit;
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('getPost'))
{
	function getPost($p = false,$f = false)
	{
		$CI = & get_instance();
		if($p !== false){
			return $CI->input->post($p,$f);
		}
		else
		{
			return $_POST;
		}
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('setPost')){
	function setPost($name,$value = false)
	{
		$CI = & get_instance();
		return $_POST[$name] = $value;
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('imprimir')){
	function imprimir($p)
	{
		echo "<pre>";
		print_r($p);
		echo "</pre>";
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('all')){
	function all()
	{
		$CI = & get_instance();
		$CI->output->enable_profiler(true);
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('pad')){
	function pad($n)
	{
		return str_pad($n, 10, "0", STR_PAD_LEFT);
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('codCharaters')){
	function codCharaters($string)
	{
		$string = str_replace("Ñ","_N_",$string);
		$string = str_replace("ñ","_n_",$string);
		$string = str_replace("á","_a_",$string);
		$string = str_replace("é","_e_",$string);
		$string = str_replace("í","_i_",$string);
		$string = str_replace("ó","_o_",$string);
		$string = str_replace("ú","_u_",$string);
		return 	$string;
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('formatText')){
	function formatText($string)
	{
		$string = html_entity_decode($string);
		return $string;
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('decodCharaters')){
	function decodCharaters($string)
	{
		$string = str_replace("_N_","Ñ",$string);
		$string = str_replace("_n_","ñ",$string);
		$string = str_replace("_a_","á",$string);
		$string = str_replace("_e_","é",$string);
		$string = str_replace("_i_","í",$string);
		$string = str_replace("_o_","ó",$string);
		$string = str_replace("_u_","ú",$string);
		return 	$string;
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('formatTime')){
	function formatTime($time = false,$to)
	{
		if($time == 0) return '';
		if(is_numeric($time) && $to == 'es') return date('h:i A',$time);
		if(is_numeric($time) && $to == 'en') return date('H:i',$time);
		if($to == "en")return date("H:i",strtotime($time));
		if($to == "es")return date("h:i A",strtotime($time));
		if($to == "time")return strtotime($time);
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('formatDate')){
	function formatDate($date,$to)
	{
		if(is_numeric($date) && $to == 'es') return date('d-m-Y',$date);
		if(is_numeric($date) && $to == 'en') return date('Y-m-d',$date);


		if($date == false or $date == NULL) return "";
		if($to == "en"){
			$nf = explode("/",$date);
			return $date = $nf[2]."-".$nf[1]."-".$nf[0];
		}
		if($to == "es"){
			$nf = explode("-",$date);
			return $date = $nf[2]."/".$nf[1]."/".$nf[0];
		}
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('formatDateTime')){
	function formatDateTime($date,$to)
	{

		if(is_numeric($date) && $to == 'es') return date('d-m-Y h:i A',$date);
		if(is_numeric($date) && $to == 'en') return date('Y-m-d H:i',$date);

		$date = explode(' ',$date);
		return formatDate($date[0],$to). ' ' .formatTime($date[1],$to);
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('resizeImage'))
{
	function resizeImage($source,$w = 600,$h = 500,$thumb = FALSE)
	{
		$CI = & get_instance();
		$config['image_library'] = 'GD2';
		$config['source_image'] = $source;
		$config['create_thumb'] = $thumb;
		$config['maintain_ratio'] = TRUE;
		$config['width'] = $w;
		$config['height'] = $h;
		$CI->load->library('image_lib', $config);
		$CI->image_lib->initialize($config);
		$CI->image_lib->resize();
		$CI->image_lib->clear();
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('uploadImage'))
{
	function uploadImage($path)
	{
		$data = array();
		$data['errors'] = FALSE;
		$CI = & get_instance();
		$config['upload_path'] = $path;
		$config['allowed_types'] = 'pdf|jpeg|jpg|png';
		$config['max_size'] = 0;
		$config['overwrite'] = TRUE;
		$config['encrypt_name'] = TRUE;
		$config['remove_spaces'] = TRUE;
		$config['detect_mime'] = TRUE;
		$CI->load->library('upload', $config);
		return $CI->upload->initialize($config);
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('MultipleuploadImage'))
{
	function MultipleuploadImage($path)
	{
		$data = array();
		$data['errors'] = FALSE;
		$CI = & get_instance();
		$config['upload_path'] = $path;
		$config['allowed_types'] = 'pdf|jpeg|jpg|png';
		$config['max_size'] = 0;
		$config['overwrite'] = TRUE;
		$config['encrypt_name'] = TRUE;
		$config['remove_spaces'] = TRUE;
		$config['detect_mime'] = TRUE;


		$files = $_FILES;
		$count = count($_FILES['imagen']['name']);
		for($i = 0; $i < $count; $i++){
			$_FILES['imagen']['name'] = $files['imagen']['name'][$i];
			$_FILES['imagen']['type'] = $files['imagen']['type'][$i];
			$_FILES['imagen']['tmp_name'] = $files['imagen']['tmp_name'][$i];
			$_FILES['imagen']['error'] = $files['imagen']['error'][$i];
			$_FILES['imagen']['size'] = $files['imagen']['size'][$i];

			$CI->load->library('upload', $config);
			return $CI->upload->initialize($config);

			if( ! $CI->upload->do_upload('imagen')){
				$CI->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
				$error = array('error'=> $CI->upload->display_errors());
				return $error;
			}
			else
			{
				$upload_data = $CI->upload->data();
				return $upload_data;
			}
		}


		//return $CI->upload->initialize($config);
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('getConfig')){
	function getConfig($key = "",$type = "default",$addicional = false,$addicional2 = false)
	{
		$data = array();
		if($addicional !== false){
			$data[$addicional[0]] = $addicional[1];
		}
		if($addicional2 !== false){
			$data[$addicional2[0]] = $addicional2[1];
		}
		$CI = & get_instance();
		if($type == "default"){
			return $CI->sce_configurations_model->getByField('key',$key,false)->value;
		}
		if($type == "array"){
			$record = explode(',',$CI->sce_configurations_model->getByField('key',$key,false)->value);
			foreach($record as $k=>$v){
				$data[$v] = $v;
			}
			return $data;
		}
		if($type == "array_decimal"){
			$record = explode(',',$CI->sce_configurations_model->getByField('key',$key,false)->value);
			foreach($record as $k=>$v){
				if(!$v){
				}
				else
				{
					$data[$v] = 'RD$ - '.number_format($v,0,'',',');;
				}
			}
			return $data;
		}
		if($type == "grid"){
			$record = explode(',',$CI->sce_configurations_model->getByField('key',$key,false)->value);
			$data = '';
			foreach($record as $k=>$v){
				$data .= "'$v':'$v',";
			}
			return trim($data,',');
		}
		if($type == "range"){
			$record = $CI->sce_configurations_model->getByField('key',$key,false)->value;
			$y = date('Y');
			$d = $y - $record;
			for($d;$d <= $y;$d++){
				$data[$d] = $d;
			}
			return $data;
		}
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('html'))
{
	function html($tag, $value)
	{
		switch($tag){
			case 'css':
			return '<link rel="stylesheet" type="text/css" media="screen" href="'.base_url($value).'.css" />'."\n";
			break;
			case 'js':
			return '<script type="text/javascript" src="'.base_url($value).'.js"></script>'."\n";
			break;
		}
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('moneda'))
{
	function moneda($n)
	{
		if($n < 0.01)  $n = 0.00;
		return number_format($n,2,'.',',');
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('htmlOptions')){
	function htmlOptions($records = array(),$key = "",$value = "",$extra = "")
	{
		$options = "<option value='".$extra[0]."'>".$extra[1]."</option>";
		foreach($records as $record){
			$options .= "<option value='".$record->$key."'>".$record->$value."</option>";
		}
		return $options;
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('arrayTodropdown')){
	function arrayToDropdown($records = array(),$key = "",$value = "",$extra = "",$extrafield = false)
	{
		$options[$extra[0]] = $extra[1];
		foreach($records as $record){
			if($extrafield){
				$options[$record->$key] = $record->$extrafield.' -> '.$record->$value;
			}
			else
			{
				$options[$record->$key] = $record->$value;
			}
		}
		return $options;
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('dropDownStatus')){
	function dropDownStatus($array = array(),$sel = '',$name='')
	{
		return form_dropdown($name, $array, $sel,' id="'.$name.'"');
	}
}

# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('elapsedTime')){
	function elapsedTime($from,$to,$obtener = 'HORAS',$redondear = false)
	{
		$f0 = strtotime($from);
		$f1 = strtotime($to);
		if($f0 < $f1){
			$tmp = $f1; $f1  = $f0; $f0  = $tmp;
		}
		$resultado = ($f0 - $f1);
		switch($obtener){
			default: break;
			case "MINUTOS"   :   $resultado = $resultado / 60;   break;
			case "HORAS"     :   $resultado = $resultado / 60 / 60;   break;
			case "DIAS"      :   $resultado = $resultado / 60 / 60 / 24;   break;
			case "SEMANAS"   :   $resultado = $resultado / 60 / 60 / 24 / 7;   break;
		}
		if($redondear) $resultado = round($resultado);
		return $resultado;
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('segToHours')){
	function segToHours($m)
	{
		$s       = $m * 60;
		$horas   = floor($s / 3600);
		$minutos = floor(($s - ($horas * 3600)) / 60);
		if($minutos == 0) $minutos = '00';
		if(substr($minutos,1,1) == 0) $minutos = substr($minutos,0,1).'0';
		return $horas.':'.$minutos;
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('validateCaptcha')){
	function validateCaptcha()
	{
		if(getPost('captcha')){
			$captcha = $_SESSION['captcha'];
			if(empty($captcha) || trim(strtolower(getPost('captcha'))) != $captcha){
				return false;
			}
			else
			{
				return true;
			}
		}
		return false;
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('scyMeses')){
	function scyMeses($n)
	{
		$m = array("","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		return $m[$n];
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if(!function_exists('closeBox')){
	function closeBox()
	{
		$CI = & get_instance();
		$CI->load->view('backend/sceTemplate/closebox');
	}
}

# -------------------------------------------------------------------
#  SEND MAIL
# -------------------------------------------------------------------
if( ! function_exists('sce_correo'))
{
	function sce_correo($emails = array(),$subject = '',$message = '')
	{
		$CI     = & get_instance();
		$CI->load->library('email');
		
		$correo = 'info@hideawaybeachdr.com';
		$listCorreos = array('luilly29@hotmail.com,hideaway.beach@yahoo.com,‎moransnyc@aol.com');		
		$correoOculto = array('info@multiserviciosweb.com.do,edelapaz@gmail.com');		// Esto correo no sera visible
	
		$config['protocol'] = 'mail';
		$config['charset'] = 'utf-8';
		$config['wordwrap'] = TRUE;
		$config['mailtype'] = 'html';
		$config['useragent'] = 'EMAIL';
		$CI->email->initialize($config);
		$CI->email->from($emails);
		$CI->email->to($correo);
		$CI->email->cc($listCorreos);
		$CI->email->bcc($correoOculto);
		$CI->email->subject($subject);
		$CI->email->message($message);
		if($CI->email->send())
		{
			return TRUE;
		}
		else
		{
			return FALSE;
		}

	//	echo "-*-";
	//	echo $CI->email->print_debugger();
	//	die();
	}
}


# -------------------------------------------------------------------
#  SEND MAIL FILE
# -------------------------------------------------------------------
if(!function_exists('sceSendEmail')){
	function sceSendEmail($data)
	{
		$CI     = & get_instance();
		$CI->load->library('email');
		$correo = 'edelapaz@gmail.com';
		$config['protocol'] = 'mail';
		$config['charset'] = 'utf-8';
		$config['wordwrap'] = TRUE;
		$config['mailtype'] = 'html';
		$config['useragent'] = 'EMAIL';
		$CI->email->initialize($config);
		$CI->email->from($data['email'],$data['nombre']);
		$CI->email->to($correo);
		$CI->email->cc($data['email']);
		$CI->email->subject('Contacto de ecowetcleaners.com');
		$CI->email->message(
			'<center><img src="https://ecowetcleaners.com/src/theme/img/logo.png" width="250" alt="ecowetcleaners" /></center>'.'<br/>'.
			'<h3>Datos de contacto:</h3>'.'<br/>'.
			'<strong>Nombre:</strong> '.$data['nombre'].'<hr/>'.
			'<strong>Correo electrónico:</strong> '.$data['email'].'<hr/>'.
			'<strong>Mensaje:</strong> '.$data['mensaje'].'<hr/>'. '<br/><br/><br/><br/><br/><br/>'.
			'<em>Desarrollado por multiserviciosweb.com.do</em>'
		);

		if($CI->email->send()){
			return true;
		}
		else
		{
			return false;
		}

		//echo "-*-";
		//echo $CI->email->print_debugger();
		//die();
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('random')){
	function random()
	{
		$alphabet = "ABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
		$pass     = array();
		$alphaLength = strlen($alphabet) - 1;
		for($i = 0; $i < 8; $i++){
			$n = rand(0, $alphaLength);
			$random[] = $alphabet[$n];
		}
		return implode($random);
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('codificar')){
	function codificar($data = array())
	{
		$CI         = & get_instance();
		$CI->load->library('encryption');

		$ciphertext = $CI->encryption->encrypt($data);
		return $ciphertext;
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('decodificar')){
	function decodificar($data)
	{
		$CI         = & get_instance();
		$CI->load->library('encryption');
		$ciphertext = $CI->encryption->decrypt($data);
		return $ciphertext;
	}
}