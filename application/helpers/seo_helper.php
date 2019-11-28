<?php
if( ! defined('BASEPATH')) exit('No direct script access allowed');
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('titulo')){
	function titulo()
	{
		$data = "La página que te entretiene | informa | eltaponazo.com‎";
		echo $data;
	}
}
# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('description')){
	function description()
	{
		$data = "Temas nacionales e internacionales, Foro al bienestar social, dirigido al público en general.";
		echo $data;
	}
}# -------------------------------------------------------------------
#
# -------------------------------------------------------------------
if( ! function_exists('keywords')){
	function keywords()
	{
		$data = "radiodominicana,tendencias,informa,pagina que te entretiene,informativo,ligero,divertido , humor, latinos, eltaponazo, latinos, dominicanos, entrevista, entretenimiento";
		echo $data;
	}
}