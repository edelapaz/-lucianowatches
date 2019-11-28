//< !--AUTHOR: Yorki E. Encarnacion Moquete-- >
(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('SolicitudOrdenCompraController', SolicitudOrdenCompraController);

    SolicitudOrdenCompraController.$inject = ['$scope', '$routeParams', 'API', '$mdDialog', '$mdEditDialog'];

    function SolicitudOrdenCompraController($scope, $routeParams, API, $mdDialog, $mdEditDialog) {
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

        View.SolicitudOrdenCompra = [];

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })

        View.formatDate = (date) => {
            return moment(date).local().format('DD/MMMM/YYYY');
        }

        View.formatMoney = (money) => {

            return formatter.format(money);
        }

        View.NewSolicitudOrdenCompra = {};
        View.page = 1;
        View.limit = 10;

        View.IdSolicitudEdit = $routeParams.IdSolicitudEdit;

        API.SolicitudOrdenCompra.GetSolicitudCompraEdit(View.IdSolicitudEdit)
            .then((r) => {

                if (r.data == "") {
                    View.NewSolicitudOrdenCompra = {};
                }
                else {
                    View.NewSolicitudOrdenCompra = r.data;
                    if (r.data.fechaRepcSolicitudOrdenCompra)
                        View.NewSolicitudOrdenCompra.fechaRepcSolicitudOrdenCompra = new Date(r.data.fechaRepcSolicitudOrdenCompra);

                    View.GetSolicitudCompraDet(View.IdSolicitudEdit);
                }

            });

        View.Edit = (item, property, propertyDisplayName) => {

            var promise = $mdEditDialog.large({
                type: 'text',
                modelValue: item[property],
                placeholder: 'Ingresa el nuevo valor',
                save: function (input) {
                    let DTO = angular.copy(item);

                    DTO[property] = input.$modelValue;

                    ShowLoader();

                    API.SolicitudOrdenCompra.Update(DTO).then(r => {
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

        View.UpdateEstado = (NewSolicitudOrdenCompra) => {
            ShowLoader();
            API.SolicitudOrdenCompra.Update(NewSolicitudOrdenCompra)
                .then((r) => {
                    HideLoader();
                    View.NewSolicitudOrdenCompra = (View.NewSolicitudOrdenCompra || []).concat([r.data]);
                });
        };

        View.CreateSolicitudOrdenCompra = (NewSolicitudOrdenCompra) => {
            View.isCreatingAnSolicitudOrdenCompra = true;
            API.SolicitudOrdenCompra.Create(NewSolicitudOrdenCompra).then((r) => {
                View.SolicitudOrdenCompra = (View.SolicitudOrdenCompra || []).concat([r.data]);
                View.NewSolicitudOrdenCompra = {};
                View.GetSolicitudOrdenCompra();
                this.NewSolicitudOrdenCompra.NombreSolicitudOrdenCompra = '';
                View.isCreatingAnSolicitudOrdenCompra = false;
            }, (e) => {
                View.isCreatingAnSolicitudOrdenCompra = false;

            });
        };

        View.Delete = (SolicitudOrdenCompra, ev) => {
            console.log(SolicitudOrdenCompra);
            const confirm = $mdDialog.confirm()
                .title('¿Eliminamos esta institución?')
                .textContent(`${SolicitudOrdenCompra.nombreSolicitudOrdenCompra} no podrá ser utilizada al momento de registrar un nuevo documento.`)
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                API.SolicitudOrdenCompra.Delete(SolicitudOrdenCompra.idSolicitudOrdenCompra ).then((r) => {
                    View.SolicitudOrdenCompra = _.without(View.SolicitudOrdenCompra, SolicitudOrdenCompra)
                });
            });
        };

        View.GetArticulo = () => {
            API.Articulo.GetArticulo().then((r) => {

                View.Articulos = (r.data);
            }, e => {
                    console.error('Error at API.Articulo.GetArticulo', e)

            });
        }

        View.GetAlmacen = () => {
            API.Almacen.GetAlmacen().then((r) => {

                View.Almacen = (r.data);
            }, e => {
                    console.error('Error at API.Almacen.GetAlmacen', e)

            });
        }

        View.GetArticuloSearch = (searchTermn) => {
            API.Articulo.GetArticuloSearch(searchTermn).then((r) => {
                View.Articulos = (r.data);
            }, e => {
                    console.error('Error at API.Articulo.GetArticuloSearch', e)

            });
        }

        View.GetDepartamento = () => {
            API.Departamento.GetDepartamento().then((r) => {
                View.Departamento = (r.data);
            }, e => {
                console.error('Error at API.Departamento.GetDepartamento', e)

            });
        }

        View.GetSolicitudCompraDet = (IdSolicitud) => {

            API.SolicitudOrdenCompra.GetSolicitudDetallePaginated(IdSolicitud, View.page, View.limit).then((r) => {
                    View.SolicitudDet = r.data.data;
                    View.totalSolDet = r.data.qntity;
                });

        //    if (typeof View.IdRequerimientoEdit === 'undefined') {

        //        //IdRequerimiento = View.IdRequerimientoEdit
        //      API.Requerimiento.GetRequerimientoDetallePaginated(IdSolicitud, View.page, View.limit).then((r) => {
        //            View.RequerimientosDetalle = r.data.data;
        //            View.totalReqDet = r.data.qntity;
        //        });
        //    } else {
        //        API.Requerimiento.GetRequerimientoDetallePaginated(View.IdRequerimientoEdit, View.page, View.limit).then((r) => {
        //            View.RequerimientosDetalle = r.data.data;
        //            View.totalReqDet = r.data.qntity;
        //        });
        //    }
        }

        function Activate() {
            View.GetArticulo();
            View.GetDepartamento();
            View.GetAlmacen();
        }
        Activate();

        View.GetSolicitudOrdenCompras = (page, qntity) => {

            if (typeof View.filtro === 'undefined' || View.filtro == null) {
                View.filtro = {};
            }

            API.SolicitudOrdenCompra.GetSolicitudOrdenCompraPaginated(View.filtro,page, qntity).then((r) => {
                View.SolicitudOrdenCompra = r.data.data;
                View.total = r.data.qntity;
            });

        };

        View.GetSolicitudOrdenCompras();

        View.GetDepartamentoSearch = (searchTermn) => {
            API.Departamento.GetDepartamentoSearch(searchTermn).then((r) => {
                View.Departamento = (r.data);
            }, e => {
                console.error('Error at API.Departamento.GetDepartamentoSearch', e)

            });
        }
    }
})();
