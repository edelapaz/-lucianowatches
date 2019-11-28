<?php  
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$config['Sandbox'] = FALSE;
$config['APIVersion'] = '85.0';



$config['APIUsername'] = $config['Sandbox'] ? '' : 'rosariog_api1.hotmail.com';
$config['APIPassword'] = $config['Sandbox'] ? '' : 'L7M8Z7964PAG834W';
$config['APISignature'] = $config['Sandbox'] ? '' : 'Av-QKQUv0OS7J6LpS8r8bwScIZR2AopO--O8ElEcpzCPdI1WGua6RzsP';


/*
$config['DeviceID'] = $config['Sandbox'] ? '' : 'PRODUCTION_DEVICE_ID_GOES_HERE';
$config['ApplicationID'] = $config['Sandbox'] ? 'APP-80W284485P519543T' : 'PRODUCTION_APP_ID_GOES_HERE';
$config['DeveloperEmailAccount'] = $config['Sandbox'] ? '' : 'PRODUCTION_DEV_EMAIL_GOES_HERE';
*/

/* End of file paypal.php */
/* Location: ./system/application/config/paypal.php */