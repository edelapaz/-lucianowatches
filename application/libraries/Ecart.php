<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Ecart
{
	private $CI;

	public function __construct()
	{
		$this->CI =& get_instance();
	}
	#----------------------------------------------------------------------------------------------------
	#
	#----------------------------------------------------------------------------------------------------
	public function insert($data = array())
	{
		$contents = $this->CI->session->userdata("ecart");
		$rowid    = sha1($data["id"].serialize(@$data["options"]));
		
		$contents[$rowid] = array(
			'rowid'  		 =>$rowid,
			'id'     		 =>(string)$data["id"],
			'idUsuario'      =>(int)$data["idUsuario"],
			'qty'     		 =>(float)$data["qty"],
			'price'   		 =>(float)$data["price"],
			'subtotal'		 =>(float)$data["price"] * (float)$data["qty"],
			'name'    		 =>(string)$data["name"],
			'img'  	  	     =>$data["img"],
			'options'	=> isset($data["options"]) ? $data["options"] : array()
		);

		if($data["qty"] < 1)
		{
			unset($contents[$rowid]);
		}
		$this->CI->session->set_userdata("ecart",$contents);
	}
	#----------------------------------------------------------------------------------------------------
	#
	#----------------------------------------------------------------------------------------------------
	public function update($data)
	{

		if((float)$data["qty"] < 1)
		{
			$this->remove($data["rowid"]);
		}
		else
		{
			$contents = $this->CI->session->userdata("ecart");
			$contents[$data["rowid"]]['qty'] = (float)$data["qty"];
			$contents[$data["rowid"]]['price'] = (float)$data["price"];
			$contents[$data["rowid"]]['subtotal'] = (float)$data["price"] * (float)$data["qty"];
			$this->CI->session->set_userdata("ecart",$contents);
		}
	}
	#----------------------------------------------------------------------------------------------------
	#
	#----------------------------------------------------------------------------------------------------
	public function remove($rowid = "")
	{
		$contents = $this->CI->session->userdata("ecart");
		unset($contents[$rowid]);
		$this->CI->session->set_userdata("ecart",$contents);
	}
	#----------------------------------------------------------------------------------------------------
	#
	#----------------------------------------------------------------------------------------------------
	public function destroy()
	{
		$this->CI->session->unset_userdata("ecart");
	}
	#----------------------------------------------------------------------------------------------------
	#
	#----------------------------------------------------------------------------------------------------
	public function contents()
	{
		$contents = $this->CI->session->userdata("ecart");
		$this->_total($contents);
		//$contents[]
		return $contents;
	}
	#----------------------------------------------------------------------------------------------------
	#
	#----------------------------------------------------------------------------------------------------
	public function total_items()
	{
		$contents = $this->CI->session->userdata("ecart");
		return (int)count($contents);
	}
	#----------------------------------------------------------------------------------------------------
	#
	#----------------------------------------------------------------------------------------------------
	private function _total($contents = array())
	{
		$total = 0;

		if(!$contents) return 0;
		foreach($contents as $content)
		{
			$total += $content["subtotal"];
		}
		return $total;
	}
	#----------------------------------------------------------------------------------------------------
	#
	#----------------------------------------------------------------------------------------------------
	public function total()
	{
		$contents = $this->CI->session->userdata("ecart");
		return $this->_total($contents);
	}

}