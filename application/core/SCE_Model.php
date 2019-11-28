<?php

# -------------------------------------------------------------------
# SCE SUPER-MODELO 
# NOTA: 
# -------------------------------------------------------------------
# AUTOR: HENRY POLANCO
# FECHA: 2013-03-06 
# -------------------------------------------------------------------
class SCE_Model extends CI_Model{
	public $totalRecords = 0;
	public $scyWatchdog = true;
    public function __construct() {
        $this->load->database();
    
	
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
	public function fields($data){
		foreach ($this->db->list_fields($this->tableName) as $k1 => $v1){
				
						if(!isset($data[$v1])) continue;
						$fd[$v1] = trim($data[$v1]);	
		}
		return $fd;
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
	public function dbSearch($search = false){
		
		if(is_array($search['where']))		 		 $this->db->where($search['where']);
		if(is_array($search['or_where']))	 		 $this->db->or_where($search['or_where']);
		if(is_array($search['where_in']['list']))	 $this->db->where_in($search['where_in']['field'], $search['where_in']['list']);
		if(is_array($search['like']))		 		 $this->db->like($search['like']);
		if(is_array($search['or_like']))	 		 $this->db->or_like($search['or_like']);
		if(is_array($search['where_in']))			 $this->db->where_in($search['where_in']['field'], $search['where_in']['in']);
		if($search['group_by'])	 		 			 $this->db->group_by($search['group_by']);
		if($search['order_by'])		    		 	 $this->db->order_by($search['order_by']['field'],$search['order_by']['sord']);
		if($search['limit'])	 		             $this->db->limit($search['limit'],$search['start']);
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
    public function getRecords($limit=10,$start=1) {
		$this->db->stop_cache();
							  $this->db->select('count(*) as totalRecords');
		$this->totalRecords = $this->db->get($this->tableName)->row()->totalRecords;
	
		$this->db->limit($limit, $start);
		$records = $this->db->get($this->tableName)->result();
		
		$rec['records'] = $records;
		$rec['total'] = $this->totalRecords;
		$this->db->flush_cache();
		return $rec;
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
    public function grid($search = false) {
		$search['order_by']['field'] = ($this->input->post('sidx'))? $this->input->post('sidx') : $this->fieldPrimary;
		$search['order_by']['sord'] = ($this->input->post('sord'))? $this->input->post('sord') : 'ASC';
		$limit = ($this->input->post('rows')) ?  $this->input->post('rows') : 100;
		$page = ($this->input->post('page')) ? $this->input->post('page') : 1;									
		
		$this->db->start_cache();
		$this->dbSearch($search);
		$this->db->stop_cache();
		
		$this->db->select('count(*) as totalRecords');
		$this->totalRecords = $this->db->get($this->tableName)->row()->totalRecords;
			 $start = $limit * $page - $limit;
			 $this->db->limit($limit, $start);
					 if ($start < 0)  $start = 0;
					 if($this->totalRecords < 1) $this->totalRecords = 1;
					 $totalPages = ceil($this->totalRecords / $limit);
					 if ($page > $this->totalRecords)  $page = $totalPages;
					 $nav = array('page' => $page,'total' => $totalPages,'records' => $this->totalRecords,'rows' => array());	
		$nav['rows'] = $this->db->get($this->tableName)->result();  
		$this->db->flush_cache();
		return $nav;
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
    public function get($search=false,$isarray = true,$strict = true,$obj=true) {
		$this->dbSearch($search);
		if(!$search && $strict == true){			 
			 return false;
		}
		$rs = $this->db->get($this->tableName);

		if($isarray == true && $obj == false) 	return $rs->result_array();
		if($isarray == true && $obj == true) 	return $rs->result();
		return $rs->row();
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
	public function getById($id){
		return $this->db->get_where($this->tableName,array($this->fieldPrimary => $id))->row();
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
	public function getByField($field,$value=false,$isarray = true){
		$rs = $this->db->get_where($this->tableName,array($field => $value));
		if($isarray === false) return $rs->row();
							   return $rs->result();
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
	public function where($where=false,$isarray=true){
		if($where == false) return false;
		
		$rs = $this->db->get_where($this->tableName,$where);
		if($isarray === false) return $rs->row();
							   return $rs->result();
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
	public function insert($data){
		if(is_object($data))$data = $this->objectToArray($data);
		$data['cdate'] = time();
		$data['mdate'] = time();
				$this->db->insert($this->tableName, $this->fields($data));
				$id = $this->db->insert_id();
				//$this->sceWatchdog($data,$id,'INSERT');
		return $id;	
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
	public function delete($id=false){
		if($id === false or $id === "" or $id === NULL) return false;
		$this->sceWatchdog('',$id,'DELETE',$this->getById($id));
		return $this->db->delete($this->tableName, array($this->fieldPrimary => $id));
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
	public function update($data,$id=false){
		if(is_object($data))$data = $this->objectToArray($data);
		
		if($id === false or $id === "" or $id === NULL) return false;
		
		unset($data['cdate']);
		$data['mdate'] = time();
		$update = $this->db->update($this->tableName, $this->fields($data), array($this->fieldPrimary => $id));
		//$this->sceWatchdog($data,$id,'UPDATE',$this->getById($id));
		return $update;
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
	public function save($data){
		if(is_object($data))$data = $this->objectToArray($data);
		if($data[$this->fieldPrimary] > 0){
					return $this->update($data,$data[$this->fieldPrimary]);
			}else{
					return $this->insert($data);
		
		}
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
	public function objectToArray($data){
				$row = array();
				foreach($data as $k => $v){
					if(isset($v) == false) continue;
					if(is_array($v) == true) continue;					
						$row[$k] = $v;
					}
		return $row;
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------
	public function sceWatchdog($data,$id,$action,$before=''){
		/*printr($data);
		echo serialize((array)$data);
		echo serialize((array)$before);*/
		
			$this->db->insert('sce_watchdog', array(
				'user_id'	=> $this->session->userdata('user_id'),
				'user_name'	=> $this->session->userdata('full_name'),
				'ip'		=> $this->input->ip_address(),
				'table'		=> $this->tableName,
				'row_id'	=> $id,
				'action'	=> $action,
				'data'		=> @serialize((array)$data),
				'before_row'=> @serialize((array)$before),
				'date'		=> date('Y-m-d H:i:s'),
				'cdate'		=> time(),
				));
				$this->flushLog();
		//die();
	}
# -------------------------------------------------------------------
# 
# -------------------------------------------------------------------	
	public function flushLog(){
			$d = date('D');
			if($d == 'Mon'){
				$this->db->delete('sce_watchdog',array('cdate <=' => strtotime('-3 month')));
			}
	}		
# -------------------------------------------------------------------
# /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
# -------------------------------------------------------------------
}