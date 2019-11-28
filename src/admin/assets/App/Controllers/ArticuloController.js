//< !--AUTHOR: Yorki E. Encarnacion Moquete-- >
(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('ArticuloController', ArticuloController);

    ArticuloController.$inject = ['$scope', 'API', '$routeParams', '$mdDialog', '$mdEditDialog'];

    function ArticuloController($scope, API, $routeParams, $mdDialog, $mdEditDialog) {
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

        var alert;
        $scope.showAlert = showAlert;
        $scope.showDialog = showDialog;
        $scope.items = [1, 2, 3];

        // Internal method
        function showAlert() {
            alert = $mdDialog.alert({
                title: 'Alerta',
                textContent: 'Este articulo no se puede eliminar, tiene articulos en existencia.',
                ok: 'Cerrar'
            });

            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
        }

        function showDialog($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                escapeToClose: true,
                clickOutsideToClose: true,
                template:
                    ``
                ,
                locals: {
                    items: $scope.items
                },
                controller: ArticuloController
            });

            function DialogController($scope, $mdDialog, items) {
                $scope.items = items;
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }
            }
        }
    
        $scope.showAdvanced = function (ev) {
            $mdDialog.show({
                controller: ArticuloController,
                templateUrl: '/assets/App/Templates/Auxiliares/BuscarMaterial.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (answer) {

                    if (typeof answer === 'undefined') { answer=0}

                    if (answer != 0) {
                        MaterialStore: [];

                        API.Articulo.GetMaterialId(answer).then((r) => {

                            View.NewArticulo.idCBS = r.data.idCBS

                            document.getElementById("MaterialCreate").style.display = 'none';
                            document.getElementById("MaterialEdit").style.display = 'block';

                            View.Material = (r.data);

                            View.ClasificadorObjetoGasto(r.data.codigoCOG)
                        }, e => {
                            console.error('Error at  API.Articulo.GetMaterialId', e)

                        });

                    }
                    {
                        View.Articulo.LookUpText = "";
                        View.Clasificador = []
                    }

                }, function () {
                        $scope.status = 'You cancelled the dialog.';
                        $mdDialog.hide();
                });
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };

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

        View.IdArticuloEdit = $routeParams.IdArticuloEdit;

        View.page = 1;
        View.limit = 10;
        $scope.selected = [];

        API.Articulo.GetArticuloEdit(View.IdArticuloEdit)
        .then((r) => {
            if (r.data == "") {
                View.NewArticulo = {};

                document.getElementById("MaterialEdit").style.display = 'none';
                document.getElementById("MaterialCreate").style.display = 'block';

            } else {
                View.NewArticulo = r.data;

                if (View.NewArticulo.perecederoArticulo == true) {
                    $('inputCall2').on('ifChecked');
                }
                else {
                    $('inputCall2').on('ifUnchecked');
                }

                document.getElementById("MaterialCreate").style.display = 'none';
                document.getElementById("MaterialEdit").style.display = 'block';

                API.Articulo.GetMaterialId(r.data.idCBS).then((r) => {

                    View.Material = (r.data);
                }, e => {
                    console.error('Error at  API.Articulo.GetMaterialId', e)

                });

                API.Articulo.GetClasificadorId(r.data.idCOG).then((r) => {

                    View.Clasificador = (r.data);
                }, e => {
                    console.error('Error at  API.Articulo.GetClasificadorId', e)

                });

            }  

        });


        View.CreateArticulo = (NewArticulo) => {
            View.isCreatingAnArticulo = true;

            if (NewArticulo.idCBS > 0) {} else {
                NewArticulo.idCBS = NewArticulo.idCBS.idCBS;
            }

            API.Articulo.Create(NewArticulo).then((r) => {
                View.NewArticulo = {};
                View.Clasificador = {};
                View.Articulo.LookUpText = "";
                View.isCreatingAnArticulo = false;
                document.getElementById("MaterialCreate").style.display = 'block';
            }, (e) => {
                View.isCreatingAnArticulo = false;
            });
        };

        View.UpdateArticulo = (NewArticulo) => {
            View.isCreatingAnArticulo = true;
            ShowLoader();
            API.Articulo.Update(NewArticulo).then((r) => {
                HideLoader();
                View.isCreatingAnArticulo = false;
            }, (e) => {
                View.isCreatingAnArticulo = false;

            });
        };

        View.Delete = (Articulos, ev) => {
            if (Articulos.existencias == 0) {

                const confirm = $mdDialog.confirm()
                    .title('¿Eliminamos este articulo?')
                    .textContent(`Se eliminara el articulo ${Articulos.descripcionArticulo}, ¿Esta seguro de que desea eliminarlo?`)
                    .targetEvent(ev)
                    .ok('Eliminar')
                    .cancel('Cancelar');

                $mdDialog.show(confirm).then(function () {
                    API.Articulo.Delete(Articulos.idArticulo).then((r) => {
                        View.Articulos = _.without(View.Articulos, Articulos)
                        View.GetArticulos();
                    });
                });
            }
            else {
                showAlert();
            }
        };

        View.GetUnidadMedidas = () => {
            API.UnidadMedida.GetUnidadMedida().then((r) => {

                View.UnidadMedidas = (r.data);
            }, e => {
                 console.error('Error at API.UnidadMedida.GetUnidadMedida', e)

            });
        }

        View.GetEstadoArticulo = () => {
            API.EstadoArticulo.GetEstadoArticulo().then((r) => {
                View.EstadoArticulo = (r.data);
            }, e => {
                console.error('Error at API.EstadoArticulo.GetEstadoArticulo', e)

            });
        }

        View.GetSegmento = () => {
            API.Articulo.GetSegmento().then((r) => {

                View.Segmento = (r.data);
            }, e => {
                console.error('Error at API.Articulo.GetSegmento', e)

            });
        }

        View.GetSegmentoSearch = (searchTermn) => {
            API.Articulo.GetSegmentoSearch(searchTermn).then((r) => {
                View.Segmento = (r.data);
            }, e => {
                console.error('Error at API.Articulo.GetSegmento', e)

            });
        }

        View.GetFamilia = (Codigo) => {
            API.Articulo.GetFamilia(Codigo).then((r) => {

                View.Familia = (r.data);
            }, e => {
                    console.error('Error at API.Articulo.GetFamilia', e)

            });
        }

        View.GetFamiliaSearch = (searchTermn,codigo) => {
            API.Articulo.GetFamiliaSearch(searchTermn, codigo).then((r) => {
                View.Familia = (r.data);
            }, e => {
                    console.error('Error at API.Articulo.GetFamiliaSearch', e)

            });
        }

        View.GetClase = (Codigo) => {
            API.Articulo.GetClase(Codigo).then((r) => {

                View.Clase = (r.data);
            }, e => {
                    console.error('Error at API.Articulo.GetClase', e)

            });
        }

        View.GetClasesSearch = (searchTermn, codigo) => {
            API.Articulo.GetClasesSearch(searchTermn, codigo).then((r) => {
                View.Clase = (r.data);
            }, e => {
                    console.error('Error at API.Articulo.GetClasesSearch', e)

            });
        }

        View.GetMaterial = (Codigo) => {
            API.Articulo.GetMaterial(Codigo).then((r) => {

                View.Material = (r.data);
            }, e => {
                    console.error('Error at  API.Articulo.Material', e)

            });
        }

        View.GetMaterialSearch = (searchTermn, codigo) => {
            API.Articulo.GetMaterialSearch(searchTermn, codigo).then((r) => {
                View.Material = (r.data);
            }, e => {
                    console.error('Error at API.Articulo.GetMaterialSearch', e)

            });
        }

        View.GetArticulos = (page, qntity) => {
            if (typeof View.filtro === 'undefined') { View.filtro = null }

            API.Articulo.GetArticuloPaginated(View.filtro ,page, qntity).then((r) => {
                View.loadingDocuments = true;
                View.Articulos = r.data.data;
                View.total = r.data.qntity;
                View.loadingDocuments = false;
            });
        };

        View.Materials = {
            MaterialStore: [],
            onTextChange: (searchTermn) => {
                try {
                    if (searchTermn.length > 3){
                        API.Articulo.GetMaterialSearch(searchTermn).then((r) => {
                            View.Materials.MaterialStore = r.data;
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

        View.ClasificadorObjetoGasto = (Codigo) => {
            if (Codigo != undefined || Codigo != null) {
                console.log(Codigo);
                API.ClasificadorObjetoGasto.GetClasificadorObjetoGasto(Codigo).then((r) => {
                    View.Clasificador = [],
                        View.Clasificador = (r.data);
                }, e => {
                    console.error('Error at API.ClasificadorObjetoGasto.GetClasificadorObjetoGasto', e)

                });
            }
        }

        //View.GetFamilia2 = () => {
        //    API.Articulo.GetMaterial2().then((r) => {

        //        View.Material2 = (r.data);
        //    }, e => {
        //        console.error('Error at API.Articulo.GetMaterial2', e)

        //    });
        //}

        //View.GetFamiliaSearch2 = (searchTermn) => {
        //    API.Articulo.GetMaterialSearch2(searchTermn).then((r) => {
        //        View.Material2 = (r.data);
        //    }, e => {
        //        console.error('Error at API.Articulo.GetMaterialSearch2', e)

        //    });
        //}


        function Activate() {
            View.GetSegmento();
            View.GetArticulos();
            View.GetUnidadMedidas();
            View.GetEstadoArticulo();
        }

        Activate();


    }
})();
