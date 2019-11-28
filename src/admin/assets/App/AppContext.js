(function () {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    $('#logoutbtn').on('click', () => window.location.replace('Logout'));
    // Sets MomentsJS to spanish
    moment.locale('es');
    var context = angular.module("MicmApp",
        //Dependencies
        [
            'ngRoute',
            'ngSanitize',
            'ngMaterial',
            'ngMessages',
            'lfNgMdFileInput',
            'md.data.table'
        ]);
    context.filter('capitalize', function () {
        return function (s) {
            return (angular.isString(s) && s.length > 0) ? s[0].toUpperCase() + s.substr(1).toLowerCase() : s;
        }
    });
    context.filter('trustAsResourceUrl', ['$sce', function ($sce) {
        return function (val) {
            return $sce.trustAsResourceUrl(val);
        };
    }])
    context.service('Helpers', [function () {
        const Helpers = {
            FlattenObject: function (ob) {
                var toReturn = {};
                for (var i in ob) {
                    if (!ob.hasOwnProperty(i)) continue;
                    if ((typeof ob[i]) == 'object') {
                        var flatObject = Helpers.FlattenObject(ob[i]);
                        for (var x in flatObject) {
                            if (!flatObject.hasOwnProperty(x)) continue;
                            toReturn[x] = flatObject[x];
                        }
                    } else toReturn[i] = ob[i];
                }
                return toReturn;
            },
            /// Creates an unique universal identifier
            GenerateUUID: () => { // Public Domain/MIT
                var d = new Date().getTime();
                if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
                    d += performance.now(); //use high-precision timer if available
                }
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            }
        };
        return Helpers;
    }]);
    context.config(function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $routeProvider
            .when("/",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/IndexPrincipal.html'
            })
            .when("/Notificacion",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Notificacion.html'
            })
            .when("/Registrar/Enviados",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/Interno.html'
            })
            .when("/Registrar/Recibidos",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/Externo.html'
            })
            .when("/Auxiliares/Instituciones",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Auxiliares/Instituciones.html'
            })
            .when("/Consultar/Documentos",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Consultar/Interno.html'
            })
            .when("/Documento/:SequenceCode",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Document.html'
            })
            .when("/Auxiliares/Almacen",
            {
                 Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Auxiliares/Almacen.html'
            })
            .when("/Auxiliares/Ubicacion",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Auxiliares/Ubicacion.html'
            })
            .when("/Auxiliares/UbicacionArticulo",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Auxiliares/UbicacionArticulo.html'
            })
            .when("/Auxiliares/UnidadMedida",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Auxiliares/UnidadMedida.html'
            })
            .when("/Auxiliares/IndexArticulo",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Auxiliares/IndexArticulo.html'
            })
            .when("/Auxiliares/Articulo",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Auxiliares/Articulo.html'
            })
            .when("/Auxiliares/Articulo/:IdArticuloEdit",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Auxiliares/Articulo.html'
            })
            .when("/Registrar/Requerimientos",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/Requerimientos.html'
            })
            .when("/Registrar/RequerimientoDet",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/RequerimientoDet.html'
            })
            .when("/Registrar/RequerimientoDet/:IdRequerimientoEdit",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/RequerimientoDet.html'
            })
            .when("/Registrar/Entrada",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/Entrada.html'
                })
            .when("/Registrar/Descargo",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/Descargo.html'
            })
            .when("/Registrar/IndexAjuste",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/IndexAjuste.html'
            })
            .when("/Registrar/Entrada/:IdAjusteEdit",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/Entrada.html'
            })
            .when("/Registrar/Descargo/:IdAjusteEdit",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/Descargo.html'
            })
            .when("/Registrar/Solicitud",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/Solicitud.html'
            })
            .when("/Registrar/SolicitudDet/:IdSolicitudEdit",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/SolicitudDet.html'
            })
            .when("/Registrar/IndexDespacho",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/IndexDespacho.html'
            })
            .when("/Registrar/DespachoDet/:IdRequerimientoEdit",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/DespachoDet.html'
            })
            .when("/Registrar/IndexAprobacion",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/IndexAprobacion.html'
            })
            .when("/Registrar/AprobacionDet/:IdRequerimientoEdit",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/AprobacionDet.html'
            })
            .when("/Registrar/IndexAprobacionCompra",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/IndexAprobacionCompra.html'
            })
            .when("/Auxiliares/Encargado",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Auxiliares/Encargado.html'
            })

            .when("/Registrar/RequerimientoCompra/RequerimientosComp",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/RequerimientoCompra/RequerimientosComp.html'
            })
            .when("/Registrar/RequerimientoCompra/RequerimientoCompDet",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/RequerimientoCompra/RequerimientoCompDet.html'
            })
            .when("/Registrar/RequerimientoCompra/RequerimientoCompDet/:IdRequerimientoEdit",
            {
                Title: 'AuthServer',
                templateUrl: '/assets/App/Templates/Registrar/RequerimientoCompra/RequerimientoCompDet.html'
            })
            // MUST BE PLACED AT THE END
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(false).hashPrefix('!');
    });
    angular.module('ng').run(['$rootScope', function ($rootScope) {
        $rootScope.$safeApply = function () {
            var $scope, fn, force = false;
            if (arguments.length == 1) {
                var arg = arguments[0];
                if (typeof arg == 'function') {
                    fn = arg;
                }
                else {
                    $scope = arg;
                }
            }
            else {
                $scope = arguments[0];
                fn = arguments[1];
                if (arguments.length == 3) {
                    force = !!arguments[2];
                }
            }
            $scope = $scope || this;
            fn = fn || function () { };
            if (force || !$scope.$$phase) {
                $scope.$apply ? $scope.$apply(fn) : $scope.apply(fn);
            }
            else {
                fn();
            }
        };
    }]);
    context.run(['$rootScope', '$location', ($rootscope, $location) => {
        $rootscope.$on('$routeChangeSuccess', function (event, current, previous) {
            var defaultTitle = 'Auth';
            $rootscope.Title = (current.$$route.Title) ? current.$$route.Title : defaultTitle;
        });
    }]);
})();