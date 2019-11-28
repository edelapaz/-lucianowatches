//< !--AUTHOR: Yorki E. Encarnacion Moquete-- >
(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('AlmacenController', AlmacenController);

    AlmacenController.$inject = ['$scope', 'API', '$mdDialog', '$mdEditDialog'];

    function AlmacenController($scope, API, $mdDialog, $mdEditDialog) {
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

        View.Almacenes = [];

        View.NewAlmacenes = {};
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

                    API.Almacen.Update(DTO).then(r => {
                        item[property] = input.$modelValue;

                        HideLoader();
                    }, ShowError);

                },
                ok: 'Guardar Cambios',
                title: 'Editar' + propertyDisplayName,
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

        View.CreateAlmacen = (NewAlmacenes) => {
            View.isCreatingAnAlmacen = true;
            API.Almacen.Create(NewAlmacenes).then((r) => {
                View.Almacen = (View.Almacen || []).concat([r.data]);
                View.NewAlmacenes = {};
                View.GetAlmacenes();
                this.NewAlmacen.NombreAlmacen = '';
                View.isCreatingAnAlmacen = false;
            }, (e) => {
                View.isCreatingAnAlmacen = false;

            });
        };

        View.Delete = (Almacenes, ev) => {
            console.log(Almacenes);
            const confirm = $mdDialog.confirm()
                .title('¿Eliminamos esta almacen?')
                .textContent(`${Almacenes.nombreAlmacen} no podrá ser utilizada al momento de registrar un nuevo documento.`)
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                API.Almacen.Delete(Almacenes.idAlmacen ).then((r) => {
                    View.Almacenes = _.without(View.Almacenes, Almacenes)
                });
            });
        };

        View.GetAlmacenes = (page, qntity) => {

            API.Almacen.GetAlmacenPaginated(page, qntity).then((r) => {
                View.Almacenes = r.data.data;
                View.total = r.data.qntity;
            });

            //API.Almacen.GetAlmacen().then((r) => {
            //    View.Almacenes = r.data;
            //    View.total = r.data.qntity;
            //    //console.log(View.Almacenes);
            //    //console.log('View.GetAlmacen / API.Almacen.GetAlmacen', r.data)
            //    //console.log('View.GetAlmacen / API.Almacen.GetAlmacen', r.data.data)
            //});
        };

        View.GetAlmacenes();
    }
})();
