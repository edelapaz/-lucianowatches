(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('EncargadoController', EncargadoController);

    EncargadoController.$inject = ['$scope', 'API', '$mdDialog', '$mdEditDialog'];

    function EncargadoController($scope, API, $mdDialog, $mdEditDialog) {
        var View = this;

        function HideLoader() {
            $mdDialog.hide();
        }
        function ShowError() {
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


        View.Encargado = [];

        View.NewEncargado = {};
        View.page = 1;
        View.limit = 10;


        View.CreateEncargado = (NewEncargado) => {
            View.isCreatingAnEncargado = true;
            API.Encargado.Create(NewEncargado).then((r) => {
                View.Encargado = (View.Encargado || []).concat([r.data]);
                View.NewEncargado = {};
                View.GetEncargado();
                View.searchDepartamento = "";
                View.isCreatingAnEncargado = false;
            }, (e) => {
                    View.isCreatingAnEncargado = false;

            });
        };

        View.UpdateEncargado = (NewEncargado) => {
            ShowLoader();
            View.isCreatingAnEncargado = true;
            API.Encargado.Update(NewEncargado).then((r) => {
                HideLoader();
                View.NewEncargado = {};
                View.GetEncargado();
                View.searchDepartamento = "";
                View.isCreatingAnEncargado = false;
            }, (e) => {
                
                View.isCreatingAnEncargado = false;

            });
        };

        //View.Edit = (item, property, propertyDisplayName) => {

        //    var promise = $mdEditDialog.large({
        //        type: 'text',
        //        modelValue: item[property],
        //        placeholder: 'Ingresa el nuevo valor',
        //        save: function (input) {
        //            let DTO = angular.copy(item);

        //            DTO[property] = input.$modelValue;

        //            ShowLoader();

        //            API.Encargado.Update(DTO).then(r => {
        //                item[property] = input.$modelValue;

        //                HideLoader();
        //            }, ShowError);

        //        },
        //        ok: 'Guardar Cambios',
        //        title: 'Editar' + propertyDisplayName,
        //        targetEvent: event,
        //        validators: {
        //        }
        //    });

        //    promise.then(function (ctrl) {
        //        var input = ctrl.getInput();

        //        input.$viewChangeListeners.push(function () {
        //            input.$setValidity('test', input.$modelValue !== 'test');
        //        });
        //    });
        //};

        View.EditEncargado = (item) => {
            View.NewEncargado = {};
            View.GetEncargado = {};

            API.Encargado.GetEncargadoEdit(item.idEncargado)
                .then((r) => {
                    if (r.data == "") {
                        View.NewEncargado = {};
                    }
                    else {
                        View.NewEncargado = r.data;
                    }
                });
        };

        View.Delete = (Encargado, ev) => {
            const confirm = $mdDialog.confirm()
                .title('¿Eliminamos esta encargado?')
                .textContent(`Este encargado no podrá ser utilizado al momento de registrar un nuevo documento.`)
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                API.Almacen.Delete(Encargado.idEncargado).then((r) => {
                    View.Encargado = _.without(View.Encargado, Encargado)
                });
            });
        };

        View.GetEncargado = (page, qntity) => {

            API.Encargado.GetEncargadoPaginated(page, qntity).then((r) => {
                View.Encargado = r.data.data;
                View.total = r.data.qntity;
            });

        };

        View.GetEncargado();

        View.GetDepartamento = () => {
            API.Departamento.GetDepartamento().then((r) => {

                View.Departamento = (r.data);
            }, e => {
                    console.error('Error at API..GetDepartamento.GetDepartamento', e)

            });
        }

        View.GetDepartamento();

        View.GetDepartamentoSearch = (searchTermn) => {
            API.Departamento.GetDepartamentoSearch(searchTermn).then((r) => {
                View.Departamento = (r.data);
            }, e => {
                console.error('Error at API.Departamento.GetDepartamentoSearch', e)

            });
        }
    }
})();