//< !--AUTHOR: Brawny Javier Mateo Reyes-- >
(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('InstitutionsController', InstitutionsController);

    InstitutionsController.$inject = ['$scope', 'API', '$mdDialog', '$mdEditDialog'];

    function InstitutionsController($scope, API, $mdDialog, $mdEditDialog) {
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



        View.Institutions = [];

        View.NewInstitution = {};
        View.page = 1;
        View.limit = 10;

        View.Edit = (item, property, propertyDisplayName) => {

            var promise = $mdEditDialog.large({
                type: 'text',
                modelValue: item[property],
                placeholder: 'Ingresa el nuevo valor',
                save: function (input) {
                    debugger
                    let DTO = angular.copy(item);

                    DTO[property] = input.$modelValue;

                    ShowLoader();

                    API.Institutions.Update(DTO).then(r => {
                        item[property] = input.$modelValue;

                        HideLoader();
                    }, ShowError);

                },
                ok: 'Guardar Cambios',
                title: 'Editar Institucion ' + propertyDisplayName,
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

        View.CreateInstitution = (NewInstitution) => {
            View.isCreatingAnInstitution = true;
            API.Institutions.Create(NewInstitution).then((r) => {
                View.Institutions = (View.Institutions || []).concat([r.data]);
                View.NewInstitution = {};
                View.isCreatingAnInstitution = false;
            }, (e) => {
                View.isCreatingAnInstitution = false;

            });
        };
        View.Delete = (Institution, ev) => {
            console.log(Institution);
            const confirm = $mdDialog.confirm()
                .title('¿Eliminamos esta institución?')
                .textContent(`${Institution.institutionName} no podrá ser utilizada al momento de registrar un nuevo documento.`)
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                API.Institutions.Delete(Institution.institutionID).then((r) => {
                    View.Institutions = _.without(View.Institutions, Institution)
                });
            });
        };

        View.GetInstitutions = (page, qntity) => {

            if (View.lookupFilter) {
                API.Institutions.GetInstitutions(View.lookupFilter, page, qntity).then((r) => {
                    View.Institutions = r.data.data;
                    View.total = r.data.qntity;
                    //console.log(View.Institutions);
                    //console.log('View.GetInstitutions / API.Institutions.GetInstitutions', r.data)
                });
            }
            else
                API.Institutions.GetInstitutionsPaginated(page, qntity).then((r) => {
                    View.Institutions = r.data.data;
                    View.total = r.data.qntity;
                    console.log(View.Institutions);
                });
        };

        View.GetInstitutions();
    }
})();
