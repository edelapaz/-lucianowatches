//< !--AUTHOR: Yorki E. Encarnacion Moquete-- >
(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('AjusteController', AjusteController);

    AjusteController.$inject = ['$scope', 'API', '$routeParams', '$mdDialog', '$mdEditDialog'];

    function AjusteController($scope, API, $routeParams, $mdDialog, $mdEditDialog) {
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

        View.IdAjusteEdit = $routeParams.IdAjusteEdit;

        //View.Ajuste = [];

        View.NewAjuste = {};
        View.page = 1;
        View.limit = 10;

        API.Home.AutorizadoAprobacion().then((r) => {
            View.Autorizado = r.data;

        });

        API.Ajuste.GetAjusteEdit(View.IdAjusteEdit)
            .then((r) => {
                if (r.data == "") {
                    View.NewEntrada = {};
                    View.NewDescargo = {};

                } else {
                    if (r.data.tipoAjuste == 'Entrada') {

                        View.NewEntrada = r.data;

                        if (View.NewEntrada.recibidaCompletaAjuste == true) {
                            $('inputCall2').on('ifChecked');
                        }
                        else {
                            $('inputCall2').on('ifUnchecked');
                        }

                        View.NewEntrada.fechaRegistroAjuste = new Date(r.data.fechaRegistroAjuste);
                        View.NewEntrada.fechaCompraAjuste = new Date(r.data.fechaCompraAjuste);
                        View.GetAjusteDet(View.IdAjusteEdit);
                        //View.GetUbicacionAlmacen(r.data.idAlmacen);

                    } else {
                        View.NewDescargo = r.data;

                        View.NewDescargo.fechaRegistroAjuste = new Date(r.data.fechaRegistroAjuste);

                        View.GetAjusteDet(View.IdAjusteEdit);
                        //View.GetUbicacionAlmacen(r.data.idAlmacen);
                    }



                    //document.getElementById("MaterialCreate").style.display = 'none';
                    //document.getElementById("MaterialEdit").style.display = 'block';


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

                    API.Ajuste.Update(DTO).then(r => {
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

        View.CreateAjusteEntrada = (NewAjuste) => {
            View.isCreatingAnAjuste = true;
            NewAjuste.TipoAjuste = "Entrada"

            API.Ajuste.Create(NewAjuste).then((r) => {
                View.Ajuste = (View.Ajuste || []).concat([r.data]);

                View.NewEntrada = r.data;

                View.isCreatingAnAjuste = false;
            }, (e) => {
                View.isCreatingAnAjuste = false;

            });
        };

        View.UpdateAjuste = (NewAjuste) => {
            View.isCreatingAnAjuste = true;
            NewAjuste.TipoAjuste = "Entrada"

            API.Ajuste.Update(NewAjuste).then((r) => {
                View.isCreatingAnAjuste = false;
            }, (e) => {
                View.isCreatingAnAjuste = false;

            });
        };

        View.DeleteAjuste = (Ajuste, ev) => {

            const confirm = $mdDialog.confirm()
                .title(`¿Eliminara este registro?`)
                .textContent(`Despues de eliminar este registro no podrá ser utilizado.`)
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');


            $mdDialog.show(confirm).then(function () {
                API.Ajuste.Delete(Ajuste.idAjuste ).then((r) => {
                    View.Ajuste = _.without(View.Ajuste, Ajuste)
                });
            });
        };

        View.CreateAjusteDescargo = (NewAjuste) => {
            View.isCreatingAnAjuste = true;
            NewAjuste.TipoAjuste = "Descargo"

            API.Ajuste.Create(NewAjuste).then((r) => {
                View.Ajuste = (View.Ajuste || []).concat([r.data]);

                View.NewDescargo = r.data;
                View.NewEntrada = null;
                View.isCreatingAnAjuste = false;
            }, (e) => {
                View.isCreatingAnAjuste = false;

            });
        };

        View.UpdateAjusteDescargo = (NewAjuste) => {
            View.isCreatingAnAjuste = true;
            NewAjuste.TipoAjuste = "Desuso"

            API.Ajuste.Update(NewAjuste).then((r) => {
                View.isCreatingAnAjuste = false;
            }, (e) => {
                View.isCreatingAnAjuste = false;

            });
        };

        View.ConfirmarEntrada = (NewAjuste, ev) => {
            var Destino;

            if (NewAjuste.tipoAjuste == 'Entrada') {
                Destino = 'Esta seguro que desea confirmar esta entrada. Una vez ejecutado no se puede volver atrás.';
            } else {
                Destino = 'Esta seguro que desea confirmar esta desuso. Una vez ejecutado no se puede volver atrás.';
            }

            const confirm = $mdDialog.confirm()
                .title('¿Esta seguro?')
                .textContent(Destino)
                .targetEvent(ev)
                .ok('Enviar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {

                NewAjuste.ConfirmadoAjuste = new Date();
                API.Ajuste.Update(NewAjuste).then((r) => {
                window.location = "/#!/Registrar/IndexAjuste";
                });
            });
        }

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

        View.GetAjusteDet = (IdAjuste) => {

            if (View.NewEntrada == null) {
                IdAjuste = View.NewDescargo.idAjuste;

                API.Ajuste.GetAjusteDetallePaginated(IdAjuste, View.page, View.limit).then((r) => {
                    View.AjusteDetalle = r.data.data;
                    View.totalAjusDet = r.data.qntity;
                });

            } else {
                IdAjuste = View.NewEntrada.idAjuste;

                API.Ajuste.GetAjusteDetallePaginated(IdAjuste, View.page, View.limit).then((r) => {
                    View.AjusteDetalle = r.data.data;
                    View.totalAjusDet = r.data.qntity;
                });

            }    

        }

        View.AddAjusteDet = (NewAjusteDet) => {
            View.isCreatingAnAjuste = true;

            if (View.NewEntrada == null) {
                View.NewAjusteDet.idAjuste = View.NewDescargo.idAjuste;
            } else {
                View.NewAjusteDet.idAjuste = View.NewEntrada.idAjuste;
            }          

            View.NewAjusteDet.idArticulo = View.NewAjusteDet.idArticulo.idArticulo;

            API.Ajuste.AddAjusteDet(NewAjusteDet).then((r) => {

                if (typeof View.IdAjusteEdit === 'undefined')
                {
                    
                    if (View.NewEntrada == null) {
                        View.GetAjusteDet(View.NewDescargo.idAjuste);
                    } else {
                        View.GetAjusteDet(View.NewEntrada.idAjuste);
                    }   
                }
                else {View.GetAjusteDet(View.IdAjusteEdit);}

                View.NewAjusteDet = {};
                View.Articulo.LookUpText = "";
                View.isCreatingAnAjuste = false;
            }, (e) => {
                View.isCreatingAnAjuste = false;

            });
        };

        View.EditAjusteDet = (item, property, propertyDisplayName) => {
            item.ubicacion = "";
            if (property == "cantidadAjuste") {
                var promise = $mdEditDialog.large({
                    type: 'number',
                    modelValue: item[property],
                    placeholder: 'Ingresa el nuevo valor',
                    save: function (input) {
                        let DTO = angular.copy(item);

                        DTO[property] = input.$modelValue;

                        ShowLoader();

                        API.Ajuste.UpdateAjusteDet(DTO).then(r => {
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
            else if (property == "costoAjuste") {
                var promise = $mdEditDialog.large({
                    type: 'number',
                    modelValue: item[property],
                    placeholder: 'Ingresa el nuevo valor',
                    save: function (input) {
                        let DTO = angular.copy(item);

                        DTO[property] = input.$modelValue;

                        ShowLoader();

                        API.Ajuste.UpdateAjusteDet(DTO).then(r => {
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
            else if (property == "fechaVencimientoAjuste") {
                var promise = $mdEditDialog.large({
                    type: 'date',
                    modelValue: item[property],
                    placeholder: 'Ingresa el nuevo valor',
                    save: function (input) {
                        let DTO = angular.copy(item);

                        DTO[property] = input.$modelValue;

                        ShowLoader();

                        API.Ajuste.UpdateAjusteDet(DTO).then(r => {
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

                        API.Ajuste.UpdateAjusteDet(DTO).then(r => {
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

        View.DeleteAjusteDet = (AjusteDet, ev) => {
            console.log(AjusteDet);
            const confirm = $mdDialog.confirm()
                .title('¿Eliminamos este articulo?')
                .textContent(`Se eliminara este registro.`)
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                API.Ajuste.DeleteAjusteDet(AjusteDet.idAjusteDetalle).then((r) => {
                    View.GetAjusteDet(View.IdAjusteEdit);
                    //View.Almacenes = _.without(View.Almacenes, Almacenes)
                });
            });
        };

        function Activate() {
            View.GetArticulo();
            View.GetAlmacen();
        }

        Activate();

        //View.CalcularTotal = (NewAjuste) => {

        //    NewAjuste.total = (NewAjuste.cantidadAjuste * NewAjuste.costoAjuste)

        //};

        View.GetAjustes = (page, qntity) => {

            if (typeof View.filtro === 'undefined') { View.filtro = null }

            API.Ajuste.GetAjustePaginated(View.filtro, page, qntity).then((r) => {
                View.Ajuste = r.data.data;
                View.totalAjust = r.data.qntity;
            });

        };

        //View.GetAjustes();

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

        View.GetUbicacionArt = (idArticulo) => {

            if (View.NewEntrada == null) {
                API.Ubicacion.GetUbicacionAlmacenArt(View.NewDescargo.idAlmacen, idArticulo).then((r) => {

                    View.UbicacionAlmacen = (r.data);
                }, e => {
                    console.error('Error at API.Ubicacion.GetUbicacionAlmacen', e)

                });
            } else {

                API.Ubicacion.GetUbicacionAlmacenArt(View.NewEntrada.idAlmacen, idArticulo).then((r) => {

                    View.UbicacionAlmacen = (r.data);
                }, e => {
                    console.error('Error at API.Ubicacion.GetUbicacionAlmacen', e)

                });
            }        

           
        }
    }
})();
