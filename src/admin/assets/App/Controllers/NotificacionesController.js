//< !--AUTHOR: Yorki E. Encarnacion Moquete-- >

(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('NotificacionesController', NotificacionesController);
    NotificacionesController.$inject = ['$location', 'API', '$mdDialog'];

    function NotificacionesController($location, API, $mdDialog) {
        const DocumentTypes = { Enviados: 2, Recibidos: 3 };
        this.DocumentTypes = DocumentTypes;
        var $scope = this;
        $scope.TodaysDocumentsCount='CARGANDO...'
        $scope.SCGU_URI = window.MICM_AUTH_SERVER.Url;
        $scope.user = window.MICM_AUTH_SERVER.identity;
        $scope.userID = window.MICM_AUTH_SERVER.identity.UserID;
        $scope.page = 1;
        $scope.limit = 10;

        function HideLoader() {
            $mdDialog.hide();
        } function ShowError() {
            $mdDialog.show({
                template: ` 
                <div layout="column"  
                     layout-align="center center"
                     style="padding-top: 20px;padding-right: 40px;padding-left: 40px;padding-bottom: 32px;">
                     <h3>Ha ocurrido un error</h3>
                     <md-divider></md-divider>
                </div>`,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
            });
        }
        function ShowLoader() {
            $mdDialog.show({
                template: ` 
                <div layout="column"  
                     layout-align="center center"
                     style="padding-top: 20px;padding-right: 40px;padding-left: 40px;padding-bottom: 32px;">
                     <h6>Cargando</h5>
                     <md-divider></md-divider>
                     <md-progress-circular md-mode="indeterminate"></md-progress-circular>
                </div>`,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
            });
        }

        $scope.formatDate = (date) => {
            return moment(date).local().format('DD/MMMM/YYYY');
        }

        $scope.GetNotificaciones = (page, qntity) => {

            API.Notificacion.GetNotificacionAll(page, qntity).then((r) => {
                $scope.GetNotificacion = r.data.data;
                $scope.totalGetNotificacion = r.data.qntity;

                $('#CountNoti').remove("span");
                $('#CountNoti').append("<span class='counter bgc-red'>" + r.data.qntity + "</span>");

            });
        };

        $scope.GetNotificaciones();

        $scope.UpdateNotificaciones = (Notificaciones) => {
            ShowLoader();
            Notificaciones.leidoNotificacion = true;
            API.Notificacion.Update(Notificaciones)
                .then((r) => {
                    HideLoader();
                    $scope.GetNotificaciones();
                });
        };

       
    }
})();
