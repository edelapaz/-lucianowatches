<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Card
{
    public $DataVaultToken;
    public $DataVaultExpiration;
    public $DataVaultBrand;
    public $CardNumber;

    public function __construct($DataVaultToken = "", $DataVaultExpiration = "", $DataVaultBrand = "", $CardNumber = "") {
        $this->DataVaultToken = $DataVaultToken;
        $this->DataVaultExpiration = $DataVaultExpiration;
        $this->DataVaultBrand = $DataVaultBrand;
        $this->CardNumber = $CardNumber;
    }
}