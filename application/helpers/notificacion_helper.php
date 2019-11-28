<?php
# -------------------------------------------------------------------
#  SEND MAIL
# -------------------------------------------------------------------
if( ! function_exists('sce_email'))
{
	function sce_email($emails = array(),$subject = '',$message = '')
	{
		$CI     = & get_instance();
		$CI->load->library('email');
		
		$correo = 'info@multiserviciosweb.com.do';
		//$listCorreos = array('luilly29@hotmail.com,hideaway.beach@yahoo.com,‎moransnyc@aol.com');		
		$correoOculto = array('info@multiserviciosweb.com.do,edelapaz@gmail.com');		// Esto correo no sera visible
	
		$config['protocol'] = 'mail';
		$config['charset'] = 'utf-8';
		$config['wordwrap'] = TRUE;
		$config['mailtype'] = 'html';
		$config['useragent'] = 'EMAIL';
		$CI->email->initialize($config);
		$CI->email->from($emails);
		$CI->email->to($correo);
		//$CI->email->cc($listCorreos);
		//$CI->email->bcc($correoOculto);
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

		echo "-*-";
		echo $CI->email->print_debugger();
		die();
	}
}

# -------------------------------------------------------------------
#  SEND MAIL
# -------------------------------------------------------------------
if( ! function_exists('sce_valid_emails'))
{
	function sce_valid_emails($emails = array(),$subject = '',$message = '')
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
#  SEND MAIL
# -------------------------------------------------------------------
if( ! function_exists('sce_notification_email'))
{
	function sce_notification_email($emails = array(),$subject = '',$message = '')
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