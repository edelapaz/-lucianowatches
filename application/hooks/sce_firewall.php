<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');
class sce_firewall
{
	private $ci = array();
	private $sceClass = '';
	private $sceMethod = '';
	private $sceDirectory = '';
	private $sceUserId = '';
	private $sceRol = '';
	private $sceRoute = '';
	#-------------------------------------------------------------------
	#
	#-------------------------------------------------------------------
	public function __construct()
	{
		$this->ci =& get_instance();
		$this->sceClass = $this->ci->router->class;
		$this->sceMethod = $this->ci->router->method;
		$this->sceDirectory = $this->ci->router->directory;
		$this->sceUserId = $this->ci->session->userdata('idUsuario');
		$this->sceRol = $this->ci->session->userdata('rol');
		$this->sceRoute = str_replace('/','',$this->sceDirectory.'.'.$this->sceClass);
		$this->sceRouteFull = str_replace('/','',$this->sceDirectory.'.'.$this->sceClass.'.'.$this->sceMethod);
	}
	#-------------------------------------------------------------------
	#
	#-------------------------------------------------------------------
	public function security()
	{
		if($this->checkLogin() === FALSE) return FALSE;
		$this->permission();
	}
	#-------------------------------------------------------------------
	#
	#-------------------------------------------------------------------
	private function checkLogin()
	{
		$access_level_1 = array(
			'.secure',
			'frontend.services',
			'frontend.intcomex',
			'.home'
		);
		$access_level_2 = array(
			'backend.users.logIn',
			'backend.users.logOut',
			'backend.users.processLogin',
			'backend.users.confirmRegisterAccount',
			'backend.products.saveXml',
			'backend.products.saveIntcomexCatalog',
			'backend.products.saveCSVCnet',
			'backend.products.generarCatalogoCnet',
			'backend.products.generarCatalogoZoovu',
			'backend.rating_questions.saveAnswer',
			'backend.orders.rateProduct',
			'frontend.cart.registerProcess',
			'frontend.cart.register',
			'frontend.cart.login',
			'frontend.cart.logOut',
			'frontend.cart.LoginProcess',
			'frontend.cart.formRecoveryPassword',
			'frontend.cart.sendRecoveryPassword',
			'frontend.cart.confirmRecoveryPassword',
			'frontend.cart.recoverSavePassword',
			'frontend.cart.poShip',
			'frontend.cart.responseBotonBPD',
			'frontend.cart.success',
			'frontend.cart.view_deals',
			'frontend.cart.list_deals',
			'frontend.cart.tracking',
			'frontend.cart.orderStatus',
			'frontend.cart.loginJson',
			'frontend.cart.searchJson',
			'frontend.cart.categoryJson',
			'frontend.cart.productsJson',
			'frontend.cart.propertyDetailJson',
			'frontend.cart.changeShipping',
			'frontend.cart.wishlist',
			'frontend.cart.addWishlist',
			'frontend.cart.deleteWishlist',
			'frontend.cart.tpl',
			'frontend.cart.search',
			'frontend.cart.index',
			'frontend.cart.category',
			'frontend.cart.products',
			'frontend.cart.productDetail',
			'frontend.cart.addToCart',
			'frontend.cart.updateCart',
			'frontend.cart.updateMiniHead',
			'frontend.cart.basket',
			'frontend.cart.register',
			'frontend.cart.registerProcess',
			'frontend.cart.loginProcess',
			'frontend.cart.checkout',
			'frontend.cart.getZoneChildByZoneId',
			'frontend.cart.sendNotifCart',
			'frontend.cart.orderFeedback',
			'frontend.cart.sendNotifRate',
			'frontend.cart.response_bpd',
			'frontend.payment.index',
			'frontend.cart.view_promo',
			'frontend.cart.view_promo_2'
		);

		if(in_array($this->sceRoute,$access_level_1)) return FALSE;
		if(in_array($this->sceRouteFull,$access_level_2)) return FALSE;
		if( ! $this->sceUserId && $this->sceDirectory == 'frontend')redirect(site_url('registrarse-iniciar-sesion'));
		if( ! $this->sceUserId && $this->sceDirectory == 'backend')redirect(site_url('backend/users/logIn'));
		return TRUE;
	}
	#-------------------------------------------------------------------
	#
	#-------------------------------------------------------------------
	private function permission()
	{
		#-------------------------------
		#
		#-------------------------------
		if($this->sceRol == 'CLIENTE'){
			$access = array(
				'frontend.cart.account',
				'frontend.cart.order',
				'frontend.cart.updateAccount',
				'frontend.cart.updatePassword',
				'frontend.cart.history',
				'frontend.cart.orderDetail',
				'frontend.cart.soporteDetail',
				'frontend.cart.checkout',
				'frontend.cart.soporte_checkout',
				'frontend.cart.validStep',
				'frontend.cart.sendPaymentCardnet',
				'frontend.cart.sendPaymentAzul',
				'frontend.cart.sendAddCardAzul',
				'frontend.cart.deleteCardAzul',
				'frontend.cart.sendPaymentBotonBPD',
				'frontend.cart.responseCardnet',
				'frontend.cart.responseAzul',
				'frontend.cart.responseAddCardAzul',
				'frontend.cart.responseTpago',
				'frontend.cart.responseBotonBPD',
				'frontend.cart.success',
				'frontend.cart.soporte_success',
				'frontend.cart.chippingAddress',
				'frontend.cart.processShippingAdress',
				'frontend.cart.sendPayment',
				'frontend.cart.addCoupon',
				'frontend.cart.quitCoupon',
				'frontend.cart.basket_branch',
				'frontend.payment.index',
				'frontend.payment.__paypalForm',
				'frontend.payment.cancel',
				'frontend.payment.success',
				'frontend.payment.ipnCheckout',
				'frontend.payment.ipnPay',

				'backend.branches.getProductsByBranch'

			);
			if(!in_array($this->sceRouteFull,$access)) $this->accessDenied();
			return true;
		}
		#-------------------------------
		#
		#-------------------------------
		if($this->sceRol == 'OPERADOR'){
			$access = array(
				'frontend.cart.account',
				'frontend.cart.orderDetail',
				'frontend.cart.updateAccount',
				'frontend.cart.formRecoveryPassword',
				'frontend.cart.sendRecoveryPassword',
				'frontend.cart.confirmRecoveryPassword',
				'frontend.cart.recoverSavePassword',
				'frontend.cart.chippingAddress',
				'frontend.cart.processShippingAdress',
				'frontend.cart.selectShippingAddress',
				'frontend.cart.selectPaymentMethod',
				'frontend.cart.orderConfirm',
				'frontend.cart.sendOrderConfirm',
				'frontend.cart.sendPaymentCardnet',
				'frontend.cart.sendPaymentAzul',
				'frontend.cart.sendPaymentBotonBPD',
				'frontend.cart.responseCardnet',
				'frontend.cart.responseAzul',
				'frontend.cart.responseTpago',
				'frontend.cart.responseBotonBPD',
				'frontend.cart.success',
				'backend.orders.index',
				'backend.orders.view',
				'backend.orders.changeStatus',
				'backend.orders.dataGrid',
				'backend.orders.grid_status',
				'backend.orders.view_status',
				'backend.orders.sendMailConfig',
				'backend.orders.sendMailRate',
				'backend.orders.sendMailTemplate',
				'backend.dashboard.index',
				'backend.dashboard.orderAnalytics',
				'backend.dashboard.zoneAnalitics',
				'backend.dashboard.productAnalitics'

			);
			if(!in_array($this->sceRouteFull,$access)) $this->accessDenied();

			return true;
		}
		#-------------------------------
		#
		#-------------------------------
		if($this->sceRol == 'OPERADOR-STATUS'){
			$access = array(
				'frontend.cart.account',
				'frontend.cart.orderDetail',
				'frontend.cart.updateAccount',

				'frontend.cart.formRecoveryPassword',
				'frontend.cart.sendRecoveryPassword',
				'frontend.cart.confirmRecoveryPassword',
				'frontend.cart.recoverSavePassword',

				'frontend.cart.chippingAddress',
				'frontend.cart.processShippingAdress',
				'frontend.cart.selectShippingAddress',
				'frontend.cart.selectPaymentMethod',
				'frontend.cart.orderConfirm',
				'frontend.cart.sendOrderConfirm',
				'frontend.cart.sendPaymentCardnet',
				'frontend.cart.sendPaymentAzul',
				'frontend.cart.sendPaymentBotonBPD',
				'frontend.cart.responseCardnet',
				'frontend.cart.responseAzul',
				'frontend.cart.responseTpago',
				'frontend.cart.responseBotonBPD',
				'frontend.cart.success',

				'backend.orders.index',
				'backend.orders.view',
				'backend.orders.changeStatus',
				'backend.orders.dataGrid',
				'backend.orders.grid_status',
				'backend.orders.view_status',

				'backend.dashboard.index',

			);
			if(!in_array($this->sceRouteFull,$access)) $this->accessDenied();

			return true;
		}
		#-------------------------------
		#
		#-------------------------------
		if($this->sceRol == 'SOPORTE'){
			$access = array(
				'backend.orders.index',
				'backend.orders.view',
				'backend.orders.changeStatus',
				'backend.orders.dataGrid',
				'backend.orders.grid_status',
				'backend.orders.view_status',
				'backend.soporte.index',
				'backend.soporte.create_order',
				'backend.soporte.save',
				'backend.soporte.dataGrid',
				'backend.soporte.edit',
				'backend.soporte.changeStatus',
				'backend.users.index',
				'backend.users.dataGrid',
				'backend.users.save',
				'backend.users.form',
				'backend.users.cargarUsuariosById',
				'backend.dashboard.index',

			);
			if(!in_array($this->sceRouteFull,$access)) $this->accessDenied();

			return true;
		}
		#-------------------------------
		#
		#-------------------------------
		if($this->sceRol == 'ADMINISTRADOR'){
			return true;
		}
		$this->accessDenied();
	}
	#-------------------------------------------------------------------
	#
	#-------------------------------------------------------------------
	private function accessDenied()
	{
		if($this->ci->input->is_ajax_request())
		{
			die('ACCESS_DENIED~'.$this->ci->session->userdata('full_name')." No tienes los permisos necesarios para esta petici&oacute;n!");
		}
		else
		{
			redirect(site_url('secure/accessDenied'));
			die();
		}
	}
}
