<?php
if( ! defined('BASEPATH')) exit('No direct script access allowed');
class Template
{
	public $template_data = array();
	# -------------------------------------------------------------------
	#
	# -------------------------------------------------------------------
	public function backend($view = '',$view_data = array(),$return = FALSE)
	{
		$this->_load('backend/template/layout','backend/'.$view,$view_data,$return);
	}
	# -------------------------------------------------------------------
	#
	# -------------------------------------------------------------------
	public function backendBlank($view = '',$view_data = array(),$return = FALSE)
	{
		$this->_load('backend/template/layout_blank','backend/'.$view,$view_data,$return);
	}
	# -------------------------------------------------------------------
	#
	# -------------------------------------------------------------------
	public function frontend($view = '',$view_data = array(),$return = FALSE)
	{
		$this->_load('frontend/template/layout','frontend/'.$view,$view_data,$return);
	}
	# -------------------------------------------------------------------
	#
	# -------------------------------------------------------------------
	public function frontendBlank($view = '',$view_data = array(),$return = FALSE)
	{
		$this->_load('frontend/template/layout_blank','frontend/'.$view,$view_data,$return);
	}
	# -------------------------------------------------------------------
	#
	# -------------------------------------------------------------------
	public function mobile($view = '',$view_data = array(),$return = FALSE)
	{
		$this->_load('mobile/template/index','mobile/'.$view,$view_data,$return);
	}
	# -------------------------------------------------------------------
	#
	# -------------------------------------------------------------------
	public function mobileBlank($view = '',$view_data = array(),$return = FALSE)
	{
		$this->_load('mobile/template/blank','mobile/'.$view,$view_data,$return);
	}
	# -------------------------------------------------------------------
	#
	# -------------------------------------------------------------------
	public function set($name, $value = NULL)
	{
		if(is_array($name))
		{
			foreach($name as $key => $value)
			$this->template_data[$key] = $value;
		}
		else
		{
			$this->template_data[$name] = $value;
		}
	}
	# -------------------------------------------------------------------
	#
	# -------------------------------------------------------------------
	public function _load($template = '', $view = '' , $view_data = array(),$return = FALSE)
	{
		$this->CI =& get_instance();
		$this->set('contents', $this->CI->load->view($view, $view_data, TRUE));
		return $this->CI->load->view($template, $this->template_data, $return);
	}
	# -------------------------------------------------------------------
	#
	# -------------------------------------------------------------------
	public function load($view = '' , $view_data = array(),$return = FALSE)
	{
		$this->CI =& get_instance();
		return $this->CI->load->view($view, $view_data, $return);
	}

}

