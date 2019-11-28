//< !--AUTHOR: Yorki E. Encarnacion Moquete-- >
(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('RequerimientoController', RequerimientoController);

    RequerimientoController.$inject = ['$scope', 'API', '$routeParams', '$mdDialog',  '$mdEditDialog'];

    function RequerimientoController($scope, API, $routeParams, $mdDialog, $mdEditDialog) {
        var View = this;
        function HideLoader() {
            $mdDialog.hide();
        }
        function ShowError(){
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

        View.Requerimientos = [];

        View.formatDate = (date) => {
            return moment(date).local().format('DD/MMMM/YYYY');
        }

        View.IdRequerimientoEdit = $routeParams.IdRequerimientoEdit;
        
        View.NewRequerimientoDet = {};
        $scope.selected = [];
        View.page = 1;
        View.limit = 10;

        View.OpenReport2 = (report, ev) => {


            const confirm = $mdDialog.confirm()
                .title('¿Esta seguro?')
                .textContent('Recuerde eliminar los articulos que no tengan existencia antes de impirmir el documento.')
                .targetEvent(ev)
                .ok('Aceptar')

            $mdDialog.show(confirm).then(function () {
                //console.log(View.IdRequerimientoEdit);
                window.open(`${report.url}?${$.param({
                    IdRequerimiento: report.IdRequerimiento
                })}`, report.ReportName, 'width=1000,height=950,scrollbars=yes,resizable=no')
            });
            
        }


        API.Requerimiento.GetRequerimientoEdit(View.IdRequerimientoEdit)
        .then((r) => {

            if (r.data == "") {
                View.NewRequerimiento = {};
            }
            else {
                View.NewRequerimiento = r.data;
                if (r.data.fechaRequerimiento)
                    View.NewRequerimiento.fechaRequerimiento = new Date(r.data.fechaRequerimiento);

                View.GetRequerimientoDet(View.IdRequerimientoEdit);
                View.GetRequerimientoDetDespacho(View.IdRequerimientoEdit);
            }

        });

        View.AprobacionEdit = ()=>{
            window.location = "/#!/Registrar/RequerimientoDet";
        };

        View.DespachoEdit = ()=>{
            window.location = "/#!/Registrar/RequerimientoDet";
        };

        View.AddRequerimientoDet = (NewRequerimientoDet,ev) => {
            View.isCreatingAnRequerimiento = true;


            View.NewRequerimientoDet.idRequerimiento = View.NewRequerimiento.idRequerimiento;

            View.NewRequerimientoDet.idArticulo = View.NewRequerimientoDet.idArticulo.idArticulo;
            View.NewRequerimientoDet.idAlmacen = View.NewRequerimiento.idAlmacen;

            if (NewRequerimientoDet.idArticulo == 0) {

                const confirm = $mdDialog.confirm()
                    .title('Alerta')
                    .textContent(`Debe seleccionar un articulo.`)
                    .targetEvent(ev)
                    .cancel('Ok');

                $mdDialog.show(confirm)

                View.isCreatingAnRequerimiento = false;
            } else {
            API.Requerimiento.AddRequeDet(NewRequerimientoDet).then((r) => {
                View.RequerimientosDetalle = (View.Requerimiento || []).concat([r.data]);
                View.NewRequerimientoDet = {};
                View.Articulo.LookUpText = '';
                if (typeof View.IdRequerimientoEdit === 'undefined') {

                    View.GetRequerimientoDet(View.NewRequerimiento.idRequerimiento);
                }
                else {
                    View.GetRequerimientoDet(View.IdRequerimientoEdit);
                }

                
                View.isCreatingAnRequerimiento = false;
            }, (e) => {
                View.isCreatingAnRequerimiento = false;

                });
            }
        };

        View.EditRequerimientoDet = (item, property, propertyDisplayName) => {

            if (property == "cantidadSolicitadaReqDet") {
                var promise = $mdEditDialog.large({
                    type: 'number',
                    modelValue: item[property],
                    placeholder: 'Ingresa el nuevo valor',
                    save: function (input) {
                        let DTO = angular.copy(item);

                        DTO[property] = input.$modelValue;

                        ShowLoader();

                        API.Requerimiento.UpdateReqDet(DTO).then(r => {
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
            }
            else if (property == "cantidadAprobadaReqDet") {
                var promise = $mdEditDialog.large({
                    type: 'number',
                    modelValue: item[property],
                    placeholder: 'Ingresa el nuevo valor',
                    save: function (input) {
                        let DTO = angular.copy(item);

                        DTO[property] = input.$modelValue;

                        ShowLoader();

                        API.Requerimiento.UpdateReqDet(DTO).then(r => {
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
            }
            else {
                var promise = $mdEditDialog.large({
                    type: 'text',
                    modelValue: item[property],
                    placeholder: 'Ingresa el nuevo valor',
                    save: function (input) {
                        let DTO = angular.copy(item);

                        DTO[property] = input.$modelValue;

                        ShowLoader();

                        API.Requerimiento.UpdateReqDet(DTO).then(r => {
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
            }
            

            promise.then(function (ctrl) {
                var input = ctrl.getInput();

                input.$viewChangeListeners.push(function () {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        };

        View.DeleteRequerimientoDet = (RequerimientoDet, ev) => {

            const confirm = $mdDialog.confirm()
                .title('¿Eliminamos este articulo?')
                .textContent(`Se eliminara este registro y no podrá ser utilizada al momento de registrar un nuevo documento.`)
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                API.Requerimiento.DeleteReqDet(RequerimientoDet.idRequerimientoDetalle).then((r) => {
                    View.GetRequerimientoDet(View.IdRequerimientoEdit);
                    //View.Almacenes = _.without(View.Almacenes, Almacenes)
                });
            });
        };

        View.CreateRequerimiento = (NewRequerimiento) => {
            View.isCreatingAnRequerimiento = true;
            ShowLoader();
            API.Requerimiento.Create(NewRequerimiento).then((r) => {
                View.Requerimiento = (View.Requerimiento || []).concat([r.data]);
                View.NewRequerimiento = r.data;
                HideLoader();
                View.isCreatingAnRequerimiento = false;
            }, (e) => {
                View.isCreatingAnRequerimiento = false;

            });
        };

        View.CreateRequerimientoComp = (NewRequerimiento) => {
            View.isCreatingAnRequerimiento = true;
            ShowLoader();
            API.Requerimiento.CreateComp(NewRequerimiento).then((r) => {
                View.Requerimiento = (View.Requerimiento || []).concat([r.data]);
                View.NewRequerimiento = r.data;
                HideLoader();
                View.isCreatingAnRequerimiento = false;
            }, (e) => {
                View.isCreatingAnRequerimiento = false;

            });
        };

        View.UpdateRequerimiento = (NewRequerimiento) => {
            ShowLoader();
            //NewRequerimiento.idEstadoRequerimiento = 1;
            API.Requerimiento.Update(NewRequerimiento)
                .then((r) => {
                    HideLoader();
                    View.NewRequerimiento = (View.NewRequerimiento || []).concat([r.data]);
                });
        };

        View.EnviarRequerimiento = (NewRequerimiento, ev) => {
            var Destino;

            if (NewRequerimiento.destinoRequerimiento == 'Almacen' || NewRequerimiento.destinoRequerimiento == 1)
                { NewRequerimiento.destinoRequerimiento = 1 }
            else
                { NewRequerimiento.destinoRequerimiento = 2 };

            if (NewRequerimiento.idEstadoRequerimiento == 1) {
                Destino = 'Esta registro sera enviado a aprobacion de las cantidades solicitadas. Luego se le estara notificando sobre la aprobacion del mismo.';
            } else {
                Destino = 'Esta registro sera enviado a aprobacion y luego a despacho.';
            }
            //if (NewRequerimiento.destinoRequerimiento == 1) {
            //    Destino = ' a aprobacion.';
            //    NewRequerimiento.idEstadoRequerimiento = 2;
            //} else {
            //    Destino = ' a aprobacion de solicitud de compra.';
            //    NewRequerimiento.idEstadoRequerimiento =2;
            //}

            

            const confirm = $mdDialog.confirm()
                .title('¿Esta seguro?')
                .textContent(Destino)
                .targetEvent(ev)
                .ok('Aprobar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {

                if (NewRequerimiento.idEstadoRequerimiento == 1) {
                    NewRequerimiento.idEstadoRequerimiento = 2;
                } else {
                    NewRequerimiento.idEstadoRequerimiento = 4;
                }


                API.Requerimiento.Update(NewRequerimiento)
                    .then((r) => {

                        window.location = "/#!/Registrar/Requerimientos";

                    });
            });

            //API.Requerimiento.Update(NewRequerimiento)
            //.then((r) => {

            //    window.location = "/#!/Registrar/Requerimientos";

            //});

        };

        View.EnviarAprobacion = (NewRequerimiento, ev) => {
            var Destino;

            if (NewRequerimiento.destinoRequerimiento == 1) {
                Destino = ' al almacen para ser despachado.';
            } else {
                Destino = ' a la solicitud de compra.';
            }

            const confirm = $mdDialog.confirm()
                .title('¿Esta seguro?')
                .textContent(`Esta registro sera enviado` + Destino)
                .targetEvent(ev)
                .ok('Aprobar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {

                if (NewRequerimiento.destinoRequerimiento == 1) {
                    NewRequerimiento.idEstadoRequerimiento = 5;
                } else {
                    NewRequerimiento.idEstadoRequerimiento = 8;
                }

                API.Requerimiento.Update(NewRequerimiento)
                    .then((r) => {
                        window.location = "/#!/Registrar/IndexAprobacion";
                    });
            });

            //API.Requerimiento.Update(NewRequerimiento)
            //    .then((r) => {
            //        if (NewRequerimiento.idEstadoRequerimiento == 2) {
            //            window.location = "/#!/Registrar/IndexAprobacion";
            //        } else {
            //            window.location = "/#!/Registrar/IndexAprobacionCompra";
            //        }
                    
            //    });
        };

        View.EnviarRechazo = (NewRequerimiento, ev) => {

            const confirm = $mdDialog.confirm()
                .title('¿Esta seguro?')
                .textContent(`Este registro será rechazado, no podrá volver a este estado.`)
                .targetEvent(ev)
                .ok('Rechazar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                NewRequerimiento.idEstadoRequerimiento = 7;
                API.Requerimiento.Update(NewRequerimiento)
                    .then((r) => {
                        window.location = "/#!/Registrar/IndexAprobacion";
                    });
            });


        };

        View.Despachar = (NewRequerimiento, ev) => {

            const confirm = $mdDialog.confirm()
                .title('¿Esta seguro?')
                .textContent(`Esta registro sera despachado y no podrá volver a este punto.`)
                .targetEvent(ev)
                .ok('Despachar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                NewRequerimiento.idEstadoRequerimiento = 6;
                API.Requerimiento.Despacho(NewRequerimiento)
                    .then((r) => {

                        window.location = "/#!/Registrar/IndexDespacho";
                    });
            });

            //API.Requerimiento.Despacho(NewRequerimiento)
            //    .then((r) => {

            //        window.location = "/#!/Registrar/IndexDespacho";
            //    });

        };

        View.EnviarAprobacionRequerimiento = (NewRequerimiento, ev) => {

            const confirm = $mdDialog.confirm()
                .title('¿Esta seguro?')
                .textContent(`Esta registro sera enviado a su departamento correspondiente para la confirmacion de los cambios.`)
                .targetEvent(ev)
                .ok('Aprobar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                NewRequerimiento.idEstadoRequerimiento = 3;

                API.Requerimiento.Update(NewRequerimiento)
                    .then((r) => {
                        window.location = "/#!/Registrar/IndexDespacho";
                    });
            });


        };

        View.EnviarSolicitudCompra = (NewRequerimiento, ev) => {


            const confirm = $mdDialog.confirm()
                .title('¿Esta seguro?')
                .textContent(`Esta registro sera enviado a aprobacion.`)
                .targetEvent(ev)
                .ok('Enviar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                NewRequerimiento.idEstadoRequerimiento = 4;
                API.Requerimiento.Update(NewRequerimiento)
                    .then((r) => {

                        window.location = "/#!/Registrar/RequerimientoCompra/RequerimientosComp";
                    });
            });
        };

        View.VolverRequerimiento = (NewRequerimiento, ev) => {

            const confirm = $mdDialog.confirm()
                .title('¿Esta seguro?')
                .textContent(`Esta registro sera enviado a requerimiento.`)
                .targetEvent(ev)
                .ok('Enviar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {

                if (NewRequerimiento.idEstadoRequerimiento == 2) {

                    NewRequerimiento.idEstadoRequerimiento = 1;
                } else {
                    NewRequerimiento.idEstadoRequerimiento = 3;
                }               

                API.Requerimiento.Update(NewRequerimiento)
                    .then((r) => {
   
                        window.location = "/#!/Registrar/IndexAprobacion";
                    });
            });
        };

        View.VolverAprobacion = (NewRequerimiento, ev) => {
            const confirm = $mdDialog.confirm()
                .title('¿Esta seguro?')
                .textContent(`Esta registro sera enviado aprobacion.`)
                .targetEvent(ev)
                .ok('Enviar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                NewRequerimiento.idEstadoRequerimiento = 4;
                API.Requerimiento.Update(NewRequerimiento)
                    .then((r) => {

                        window.location = "/#!/Registrar/IndexDespacho";
                    });
            });

        };

        View.VolverAprobacionCantidades = (NewRequerimiento, ev) => {
            const confirm = $mdDialog.confirm()
                .title('¿Esta seguro?')
                .textContent(`Esta registro sera enviado a aprobacion de las cantidades solicitadas. Luego se le estara notificando sobre la aprobacion del mismo.`)
                .targetEvent(ev)
                .ok('Enviar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                NewRequerimiento.idEstadoRequerimiento = 2;
                API.Requerimiento.Update(NewRequerimiento)
                    .then((r) => {

                        window.location = "/#!/Registrar/Requerimientos";
                    });
            });

        };

        View.GetRequerimientoDet = (IdRequerimiento) => {

            if (typeof View.IdRequerimientoEdit === 'undefined') {

                //IdRequerimiento = View.IdRequerimientoEdit
                API.Requerimiento.GetRequerimientoDetallePaginated(IdRequerimiento, View.page, View.limit).then((r) => {
                    View.RequerimientosDetalle = r.data.data;
                    View.totalReqDet = r.data.qntity;
                });
            } else {
                API.Requerimiento.GetRequerimientoDetallePaginated(View.IdRequerimientoEdit, View.page, View.limit).then((r) => {
                    View.RequerimientosDetalle = r.data.data;
                    View.totalReqDet = r.data.qntity;
                });
            }
        }

        View.GetRequerimientoDetDespacho = (IdRequerimiento) => {

            if (typeof View.IdRequerimientoEdit === 'undefined') {

                //IdRequerimiento = View.IdRequerimientoEdit
                API.Requerimiento.GetRequerimientoDetallePaginated(IdRequerimiento, View.page, View.limit).then((r) => {
                    View.RequerimientosDetalleDespacho = r.data.data;
                    View.totalReqDetDesp = r.data.qntity;
                });
            } else {
                API.Requerimiento.GetRequerimientoDetallePaginated(View.IdRequerimientoEdit, View.page, View.limit).then((r) => {
                    View.RequerimientosDetalleDespacho = r.data.data;
                    View.totalReqDetDesp = r.data.qntity;
                });
            }

            //IdRequerimiento = View.IdRequerimientoEdit
            //API.Requerimiento.GetRequerimientoDetallePaginatedDespacho(IdRequerimiento, View.page, View.limit).then((r) => {
            //    View.RequerimientosDetalleDespacho = r.data.data;
            //    View.totalReqDetDesp = r.data.qntity;
            //});



        }

        View.Articulo = {
            ArticuloStore: [],
            onTextChange: (searchTermn) => {
                try {
                    if (searchTermn.length > 0) {
                        API.Articulo.GetArticuloSearch(searchTermn).then((r) => {
                            View.Articulo.ArticuloStore = r.data;
                        }, (e) => onErrorOccurred(e));
                    }
                } catch (e) {
                    console.error('Could not fetch Material for >"' + searchTermn + '"<')
                }
            },
            LookUpText: '',
            cacheDisabled: true,
            selectedTitle: null
        }

        View.GetAlmacen = () => {
            API.Almacen.GetAlmacen().then((r) => {

                View.Almacen = (r.data);
            }, e => {
                console.error('Error at API.Almacen.GetAlmacen', e)

            });
        }

        View.GetEstadoRequerimiento = () => {
            API.EstadoRequerimiento.GetEstadoRequerimiento().then((r) => {
                View.EstadoRequerimiento = (r.data);
            }, e => {
                console.error('Error at API.EstadoRequerimiento.GetEstadoRequerimiento', e)

            });
        }

        View.GetDepartamento = () => {
            API.Departamento.GetDepartamento().then((r) => {
                View.Departamento = (r.data);
            }, e => {
                console.error('Error at API.Departamento.GetDepartamento', e)

            });
        }

        function Activate() {
            View.GetEstadoRequerimiento();
            View.GetDepartamento();
            View.GetAlmacen();
        }

        Activate();

        View.GetDepartamentoSearch = (searchTermn) => {
            API.Departamento.GetDepartamentoSearch(searchTermn).then((r) => {
                View.Departamento = (r.data);
            }, e => {
                console.error('Error at API.Departamento.GetDepartamentoSearch', e)

            });
        }

        View.GetEnDespachos = (page, qntity) => {

            if (typeof View.filtro3 === 'undefined' || View.filtro3 == null) {
                View.filtro3 = {};
                View.filtro3.IdEstadoRequerimiento = 3;
            } else { View.filtro3.IdEstadoRequerimiento = 3; }

            //API.Requerimiento.GetRequerimientoPaginated(View.filtro3,page, qntity).then((r) => {
            //    View.EnDespacho = r.data.data;
            //    View.totalDesp = r.data.qntity;
            //});
            API.Requerimiento.GetDespachoPaginated(View.filtro3, page, qntity).then((r) => {
                View.EnDespacho = r.data.data;
                View.totalDesp = r.data.qntity;
            });
        };

        View.GetEnDespachos();

        View.GetEnAprobacion = (page, qntity) => {

            if (typeof View.filtro2 === 'undefined' || View.filtro2==null) {
                View.filtro2 = {};
                View.filtro2.IdEstadoRequerimiento = 2;
            } else { View.filtro2.IdEstadoRequerimiento = 2;}

            //API.Requerimiento.GetRequerimientoPaginated(View.filtro2, page, qntity).then((r) => {
            //    View.Aprobacion = r.data.data;
            //    View.totalApr = r.data.qntity;
            //});
            API.Requerimiento.GetAprobacionPaginated(View.filtro2, page, qntity).then((r) => {
                View.Aprobacion = r.data.data;
                View.totalApr = r.data.qntity;
            });

        };

        View.GetEnAprobacion();

        View.GetRequerimientos = (page, qntity) => {

            if (typeof View.filtro === 'undefined'||View.filtro == null) {
                View.filtro = {};
                View.filtro.IdEstadoRequerimiento = 1;
                View.filtro.DestinoRequerimiento = 'Almacen';
            } else {
                View.filtro.IdEstadoRequerimiento = 1;
                View.filtro.DestinoRequerimiento = 'Almacen';
            }


            //API.Requerimiento.GetRequerimientoPaginated(View.filtro,page, qntity).then((r) => {
            //    View.Requerimientos = r.data.data;
            //    View.totalReq = r.data.qntity;
            //});

            API.Requerimiento.GetRequerimientoPaginated(View.filtro, page, qntity).then((r) => {
                View.Requerimientos = r.data.data;
                View.totalReq = r.data.qntity;
            });

        };

        View.GetRequerimientos();

        View.GetRequerimientosCompra = (page, qntity) => {

            if (typeof View.filtro === 'undefined' || View.filtro == null) {
                View.filtro = {};
                View.filtro.IdEstadoRequerimiento = 1;
                View.filtro.DestinoRequerimiento = 'Compras';
            } else {
                View.filtro.IdEstadoRequerimiento = 1;
                View.filtro.DestinoRequerimiento = 'Compras';
            }

            API.Requerimiento.GetRequerimientoCompPaginated(View.filtro, page, qntity).then((r) => {
                View.RequerimientosCompr = r.data.data;
                View.totalReqComp = r.data.qntity;
            });

        };

        View.GetRequerimientosCompra();

        View.GetDepartamentoSearch = (searchTermn) => {
            API.Departamento.GetDepartamentoSearch(searchTermn).then((r) => {
                View.Departamento = (r.data);
            }, e => {
                console.error('Error at API.Departamento.GetDepartamentoSearch', e)

            });
        }


    }
})();
