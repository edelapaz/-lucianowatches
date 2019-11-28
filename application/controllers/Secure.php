<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Secure extends CI_Controller 
{
    public function __construct()
    {
		parent::__construct();
	}
    # -------------------------------------------------------------------
    # 
    # -------------------------------------------------------------------
    public function accessDenied()
    {
        $this->template->load('secure');
	}
    # -------------------------------------------------------------------
    # 
    # -------------------------------------------------------------------
	
}
