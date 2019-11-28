//< !--AUTHOR: Yorki Encarnacion-- >
(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('UnidadMedidaController', UnidadMedidaController);

    UnidadMedidaController.$inject = ['$scope', 'API', '$mdDialog', '$mdEditDialog'];

    function UnidadMedidaController($scope, API, $mdDialog, $mdEditDialog) {
        var View = this;
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

        View.UnidadMedidas = [];

        View.NewUnidadMedidas = {};
        View.page = 1;
        View.limit = 10;

        View.Edit = (item, property, propertyDisplayName) => {

            var promise = $mdEditDialog.large({
                type: 'text',
                modelValue: item[property],
                placeholder: 'Ingresa el nuevo valor',
                save: function (input) {
                    let DTO = angular.copy(item);

                    DTO[property] = input.$modelValue;

                    ShowLoader();

                    API.UnidadMedida.Update(DTO).then(r => {
                        item[property] = input.$modelValue;

                        HideLoader();
                    }, ShowError);

                },
                ok: 'Guardar Cambios',
                title: 'Editar ' + propertyDisplayName,
                targetEvent: event,
                validators: {
                }
            });

            promise.then(function (ctrl) {
                var input = ctrl.getInput();

                input.$viewChangeListeners.push(function () {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        };

        View.CreateUnidadMedida = (NewUnidadMedidas) => {
            View.isCreatingAnUnidadMedida = true;
            API.UnidadMedida.Create(NewUnidadMedidas).then((r) => {
                View.UnidadMedida = (View.UnidadMedida || []).concat([r.data]);
                View.NewUnidadMedidas = {};
                View.GetUnidadMedidas();
                this.NewUnidadMedida.NombreUnidadMedida = '';
                View.isCreatingAnUnidadMedida = false;
            }, (e) => {
                View.isCreatingAnUnidadMedida = false;

            });
        };

        View.Delete = (UnidadMedidas, ev) => {
            console.log(UnidadMedidas);
            const confirm = $mdDialog.confirm()
                .title('¿Eliminamos esta unidad de medida?')
                .textContent(`${UnidadMedidas.nombreUnidadMedida} no podrá ser utilizada al momento de registrar un nuevo documento.`)
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                API.UnidadMedida.Delete(UnidadMedidas.idUnidadMedida ).then((r) => {
                    View.UnidadMedidas = _.without(View.UnidadMedidas, UnidadMedidas)
                });
            });
        };

        View.GetUnidadMedidas = (page, qntity) => {

            API.UnidadMedida.GetUnidadMedidaPaginated(page, qntity).then((r) => {
                View.UnidadMedidas = r.data.data;
                View.total = r.data.qntity;
            });

            //API.Almacen.GetAlmacen().then((r) => {
            //    View.UnidadMedidas = r.data;
            //    View.total = r.data.qntity;
            //    //console.log(View.UnidadMedidas);
            //    //console.log('View.GetAlmacen / API.Almacen.GetAlmacen', r.data)
            //    //console.log('View.GetAlmacen / API.Almacen.GetAlmacen', r.data.data)
            //});
        };

        View.GetUnidadMedidas();
    }
})();
