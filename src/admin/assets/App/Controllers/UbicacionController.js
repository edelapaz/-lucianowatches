//< !--AUTHOR: Yorki E. Encarnacion Moquete-- >
(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('UbicacionController', UbicacionController);

    UbicacionController.$inject = ['$scope', 'API', '$mdDialog', '$mdEditDialog'];

    function UbicacionController($scope, API, $mdDialog, $mdEditDialog) {
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

        View.Ubicaciones = [];

        View.NewUbicacion = {};
        View.page = 1;
        View.limit = 10;


        View.CreateUbicacion = (NewUbicacion) => {
            View.isCreatingAnUbicacion = true;
            API.Ubicacion.Create(NewUbicacion).then((r) => {
                View.Ubicacion = (View.Ubicacion || []).concat([r.data]);
                View.NewUbicacion = {};
                View.GetUbicaciones();
                this.NewUbicacion.NombreUbicacion = '';
                View.isCreatingAnUbicacion = false;
            }, (e) => {
                View.isCreatingAnUbicacion = false;

            });
        };

        View.EditUbicacion = (item, property, propertyDisplayName) => {

            var promise = $mdEditDialog.large({
                type: 'text',
                modelValue: item[property],
                placeholder: 'Ingresa el nuevo valor',
                save: function (input) {
                    let DTO = angular.copy(item);

                    DTO[property] = input.$modelValue;

                    ShowLoader();

                    API.Ubicacion.Update(DTO).then(r => {
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

        View.Delete = (Ubicaciones, ev) => {
            console.log(Ubicaciones);
            const confirm = $mdDialog.confirm()
                .title('¿Eliminamos esta Ubicacion?')
                .textContent(`No podrá ser utilizada al momento de registrar.`)
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                API.Ubicacion.Delete(Ubicaciones.idUbicacion ).then((r) => {
                    View.Ubicaciones = _.without(View.Ubicaciones, Ubicaciones)
                });
            });
        };

        View.CreateUbicacionArticulo = (NewUbicacion) => {
            View.isCreatingAnUbicacion = true;
            API.Ubicacion.CreateUbicacionArt(NewUbicacion).then((r) => {
                View.NewUbicacionArt = {};
                View.GetUbicacionesArticulos();
                View.isCreatingAnUbicacion = false;
            }, (e) => {
                View.isCreatingAnUbicacion = false;

            });
        };

        View.UpdateUbicacionArticulo = (NewUbicacion) => {
            ShowLoader();
            API.Ubicacion.UpdateUbicacionArt(NewUbicacion)
                .then((r) => {
                    HideLoader();
                });
            View.NewUbicacionArt = {};
            View.UbicacionAlmacen = {};
            View.GetUbicacionesArticulos();
        };

        View.EditUbicacionArticulo = (item) => {
            View.NewUbicacionArt = {};
            View.UbicacionAlmacen = {};

            API.Ubicacion.GetUbicacionArticuloEdit(item.idUbicacionArticulo)
                .then((r) => {
                    if (r.data == "") {
                        View.NewUbicacionArt = {};
                    }
                    else {
                        View.NewUbicacionArt = r.data;
                        View.GetUbicacionAlmacen(r.data.idAlmacen)
                    }
                });
        };

        //View.Delete = (Ubicaciones, ev) => {
        //    console.log(Ubicaciones);
        //    const confirm = $mdDialog.confirm()
        //        .title('¿Eliminamos esta Ubicacion?')
        //        .textContent(`No podrá ser utilizada al momento de registrar.`)
        //        .targetEvent(ev)
        //        .ok('Eliminar')
        //        .cancel('Cancelar');

        //    $mdDialog.show(confirm).then(function () {
        //        API.Ubicacion.DeleteUbicacionArt: (UbicacionID) => {(Ubicaciones.idUbicacion).then((r) => {
        //            View.Ubicaciones = _.without(View.Ubicaciones, Ubicaciones)
        //        });
        //    });
        //};

        View.GetArticulo = () => {
            API.Articulo.GetArticulo().then((r) => {

                View.Articulo = (r.data);
            }, e => {
                console.error('Error at API.Articulo.GetSegmento', e)

            });
        }

        View.GetArticulo();

        View.GetUbicacionAlmacen = (idAlmacen) => {
            API.Ubicacion.GetUbicacionAlmacen(idAlmacen).then((r) => {

                View.UbicacionAlmacen = (r.data);
            }, e => {
                console.error('Error at API.Articulo.GetSegmento', e)

            });
        }

        View.GetArticuloSearch = (searchTermn) => {
            API.Articulo.GetArticuloSearch(searchTermn).then((r) => {
                View.Articulo = (r.data);
            }, e => {
                console.error('Error at API.GetArticuloSearch.GetArticuloSearch', e)

            });
        }

        View.GetUbicaciones = (page, qntity) => {

            API.Ubicacion.GetUbicacionPaginated(page, qntity).then((r) => {
                View.Ubicaciones = r.data.data;
                View.totalUb = r.data.qntity;
            });

        };

        View.GetUbicaciones();

        View.GetUbicacionesArticulos = (page, qntity) => {

            API.Ubicacion.GetUbicacionArticulosPaginated(page, qntity).then((r) => {
                View.UbicacionesArticulos = r.data.data;
                View.totalUbArt = r.data.qntity;
            });

        };

        View.GetUbicacionesArticulos();


        View.GetAlmacen = () => {
            API.Almacen.GetAlmacen().then((r) => {

                View.Almacen = (r.data);
            }, e => {
                console.error('Error at API.Almacen.GetAlmacen', e)

            });
        }

        View.GetAlmacen();
    }
})();
