//< !--AUTHOR: Brawny Javier Mateo Reyes-- >
(function () {
    'use strict';
    angular
        .module('MicmApp')
        .factory('API', factory);
    factory.$inject = ['$http'];
    function factory($http) {
        const API = {
            Provinces: {
                Get: () => $http.get('/api/Provinces')
            },
            Home: {
                AutorizadoAprobacion: () => $http.get('HomeController/AutorizadoAprobacion'),
                RolUsuario: () => $http.get('HomeController/RolUsuario')
            },
            Municipalities: {
                GetProvinceMunicipalities: (ProvinceID) => {
                    return $http.get('/api/Municipalities/GetProvinceMunicipalities/' + ProvinceID)
                }
            },
            Sectors: {
                GetMunicipalitySectors: (MunicipalityID) => {
                    return $http.get('/api/Sectors/GetMunicipalitySectors/' + MunicipalityID)
                }
            },
            Countries: {
                Get: () => $http.get('/api/Countries')
            },
            DocumentTypes: {
                Get: () => $http.get('/api/DocumentTypes'),
                GetByRecordType: (RecordTypeID) => {
                    if (angular.isNumber(Number.parseInt(RecordTypeID)) == false) return;
                    return $http.get('/api/DocumentTypes/GetByRecordType/' + RecordTypeID);
                }
            },
            Departamento: {
                GetDepartamento: () => $http.get('api/Departamento'),

                GetDepartamentoSearch: (SearchTerm) => {
                    return $http.get(`api/Departamento/GetDepartamento/${SearchTerm}`);
                }
            },
            Notificacion: {
                GetNotificacionSinLeer: () => $http.get('/api/NotificacionesSinLeer'),
                GetNotificacion: () => $http.get('/api/Notificaciones'),
                GetNotificacionAll: (Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.get(`api/Notificaciones/Get/Page/${Page}/Qntity/${Qntity}`);
                },
                Update: (Notificaciones) => {
                    if (!Notificaciones) return;
                    return $http.put('api/Notificaciones/Update', Notificaciones);
                }
            },
            Institutions: {
                GetInstitutions: (SearchTerm, Page, Qntity) => {
                    if (SearchTerm.length < 3) return;
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    return $http.get(`api/Institutions/GetInstitutions/${SearchTerm}/?Page=${Page}&Qntity=${Qntity}`);
                },
                GetInstitutionsPaginated: (Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.get(`api/Institutions/Get/Page/${Page}/Qntity/${Qntity}`);
                },
                Create: (institution) => {
                    if (!angular.isObject(institution)) return;
                    else return $http.post(`api/Institutions/Create`, institution);
                },
                Delete: (institutionID) => {
                    if (institutionID)
                        return $http.delete('api/Institutions/Delete/' + institutionID);
                },
                Update: (institution) => {
                    if (!institution) return;
                    return $http.put('api/Institutions/Update', institution);
                }
            },
            Ajuste: {
                GetAjuste: () => {
                    return $http.get(`api/Almacen`);
                },
                GetAjustePaginated: (filtro,Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.post(`api/Ajuste/Get/Page=${Page}/Qntity=${Qntity}`, filtro);
                },
                GetAjusteEdit: (AjusteID) => {
                    return $http.get(`api/Ajuste/AjusteEdit/` + AjusteID);
                },
                Create: (Ajuste) => {
                    if (!angular.isObject(Ajuste)) return;
                    else return $http.post(`api/Ajuste/Create`, Ajuste);
                },
                Delete: (AjusteID) => {
                    if (AjusteID)
                        return $http.delete('api/Ajuste/Delete/' + AjusteID);
                },
                Update: (Ajuste) => {
                    if (!Ajuste) return;
                    return $http.put('api/Ajuste/Update', Ajuste);
                },
                GetAjusteDetallePaginated: (IdAjuste, Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.get(`api/Ajuste/Get/IdAjuste/${IdAjuste}/Page/${Page}/Qntity/${Qntity}`);
                },
                AddAjusteDet: (AjusteDet) => {
                    if (!angular.isObject(AjusteDet)) return;
                    else return $http.post(`api/Ajuste/CreateAjusteDet`, AjusteDet);
                },
                UpdateAjusteDet: (AjusteDet) => {
                    if (!AjusteDet) return;
                    return $http.put('api/Ajuste/UpdateAjusteDet', AjusteDet);
                },
                DeleteAjusteDet: (ajusteDetID) => {
                    if (ajusteDetID)
                        return $http.delete('api/Ajuste/DeleteAjusteDet/' + ajusteDetID);
                },
                Confirmado: (Ajuste) => {
                    if (Ajuste)
                        return $http.get('api/Ajuste/Confirmado/' + Ajuste);
                }
            },
            Almacen: {
                GetAlmacen: () => {
                    return $http.get(`api/Almacen`);
                },
                GetAlmacenPaginated: (Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.get(`api/Almacen/Get/Page/${Page}/Qntity/${Qntity}`);
                },
                Create: (almacen) => {
                    if (!angular.isObject(almacen)) return;
                    else return $http.post(`api/Almacen/Create`, almacen);
                },
                Delete: (almacenID) => {
                    if (almacenID)
                        return $http.delete('api/Almacen/Delete/' + almacenID );
                },
                Update: (almacen) => {
                    if (!almacen) return;
                    return $http.put('api/Almacen/Update', almacen);
                }
            },
            Ubicacion: {
                GetUbicacion: () => {
                    return $http.get(`api/Ubicacion`);
                },
                GetUbicacionAlmacenArt: (AlmacenID,UbicacionID) => {
                    return $http.get(`api/Ubicacion/IdAlmacen/${AlmacenID}/IdArticulo/${UbicacionID}`);
                },
                GetUbicacionAlmacen: (AlmacenID) => {
                    return $http.get(`api/Ubicacion/${AlmacenID}`);
                },
                GetUbicacionArticuloEdit: (UbicacionArticuloID) => {
                    return $http.get(`api/UbicacionArticulo/UbicacionArticuloEdit/` + UbicacionArticuloID);
                },
                GetUbicacionPaginated: (Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.get(`api/Ubicacion/Get/Page/${Page}/Qntity/${Qntity}`);
                },
                GetUbicacionArticulosPaginated: (Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.get(`api/UbicacionArticulo/Get/Page/${Page}/Qntity/${Qntity}`);
                },
                Create: (Ubicacion) => {
                    if (!angular.isObject(Ubicacion)) return;
                    else return $http.post(`api/Ubicacion/Create`, Ubicacion);
                },
                Delete: (UbicacionID) => {
                    if (UbicacionID)
                        return $http.delete('api/Ubicacion/Delete/' + UbicacionID);
                },
                Update: (Ubicacion) => {
                    if (!Ubicacion) return;
                    return $http.put('api/Ubicacion/Update', Ubicacion);
                },
                CreateUbicacionArt: (Ubicacion) => {
                    if (!angular.isObject(Ubicacion)) return;
                    else return $http.post(`api/UbicacionArticulo/Create`, Ubicacion);
                },
                UpdateUbicacionArt: (Ubicacion) => {
                    if (!Ubicacion) return;
                    return $http.put('api/UbicacionArticulo/Update', Ubicacion);
                },
                DeleteUbicacionArt: (UbicacionID) => {
                    if (UbicacionID)
                        return $http.delete('api/UbicacionArticulo/Delete/' + UbicacionID);
                }
            },
            Articulo: {
                GetArticulo: () => {
                    return $http.get(`api/Articulo`);
                },
                GetArticuloPaginated: (filtro,Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    //return $http.get(`api/Articulo/Get/SearchTerm/${SearchTerm}/Page/${Page}/Qntity/${Qntity}`);
                    return $http.post(`api/Articulo/Get/Page=${Page}/Qntity=${Qntity}`, filtro);
                    //return $http.post(`api/Ajuste/Get/Page=${Page}/Qntity=${Qntity}`, filtro);
                },
                GetArticuloEdit: (ArticuloID) => {
                    return $http.get(`api/Articulo/ArticuloEdit/` + ArticuloID);
                },
                Create: (Articulo) => {
                    if (!angular.isObject(Articulo)) return;
                    else return $http.post(`api/Articulo/Create`, Articulo);
                },
                Delete: (ArticuloID) => {
                    if (ArticuloID)
                        return $http.delete('api/Articulo/Delete/' + ArticuloID);
                },
                Update: (Articulo) => {
                    if (!Articulo) return;
                    return $http.put('api/Articulo/Update', Articulo);
                },
                GetSegmento: () => {
                    return $http.get(`api/CatalogoBienesServicios/GetSegmento`);
                },
                GetSegmentoSearch: (SearchTerm) => {
                    return $http.get(`api/CatalogoBienesServicios/GetSegmento/${SearchTerm}`);
                },
                GetFamilia: (Codigo) => {
                    return $http.get(`api/CatalogoBienesServicios/GetFamilia/${Codigo}`);
                },
                GetFamiliaSearch: (SearchTerm,Codigo) => {
                    return $http.get(`api/CatalogoBienesServicios/GetFamiliaSearch/${SearchTerm}/${Codigo}`);
                },
                GetClase: (Codigo) => {
                    return $http.get(`api/CatalogoBienesServicios/GetClase/${Codigo}`);
                },
                GetClaseSearch: (SearchTerm, Codigo) => {
                    return $http.get(`api/CatalogoBienesServicios/GetClaseSearch/${SearchTerm}/${Codigo}`);
                },
                GetMaterial: (Codigo) => {
                    return $http.get(`api/CatalogoBienesServicios/GetMaterial/${Codigo}`);
                },
                GetMaterialSearch: (SearchTerm, Codigo) => {
                    return $http.get(`api/CatalogoBienesServicios/GetMaterialSearch/${SearchTerm}/${Codigo}`);
                },
                GetArticuloSearch: (SearchTerm) => {
                    return $http.get(`api/Articulo/GetArticuloSearch/${SearchTerm}`);
                },
                GetMaterialSearch: (SearchTerm) => {
                    return $http.get(`api/CatalogoBienesServicios/GetMaterialSearch/${SearchTerm}`);
                },
                GetMaterialId: (MaterialID) => {
                    return $http.get(`api/CatalogoBienesServicios/GetMaterialId/` + MaterialID);
                },
                GetClasificadorId: (ClasificadorID) => {
                    return $http.get(`api/ClasificadorObjetoGastosController/GetClasificadorId/` + ClasificadorID);
                },

            },
            UnidadMedida: {
                GetUnidadMedida: () => {
                    return $http.get(`api/UnidadMedida`);
                },
                GetUnidadMedidaPaginated: (Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.get(`api/UnidadMedida/Get/Page/${Page}/Qntity/${Qntity}`);
                },
                Create: (unidadmedida) => {
                    if (!angular.isObject(unidadmedida)) return;
                    else return $http.post(`api/UnidadMedida/Create`, unidadmedida);
                },
                Delete: (unidadmedidaID) => {
                    if (unidadmedidaID)
                        return $http.delete('api/UnidadMedida/Delete/' + unidadmedidaID);
                },
                Update: (unidadmedida) => {
                    if (!unidadmedida) return;
                    return $http.put('api/UnidadMedida/Update', unidadmedida);
                }
            },
            TransEstadoRequerimiento: {
                Create: (transEstadoRequerimiento) => {
                    if (!angular.isObject(transEstadoRequerimiento)) return;
                    else return $http.post(`api/TransEstadoRequerimiento/Create`, transEstadoRequerimiento);
                }
            },
            EstadoArticulo: {
                GetEstadoArticulo: () => {
                    return $http.get(`api/EstadoArticulo`);
                }
            },
            ClasificadorObjetoGasto:{
                GetClasificadorObjetoGasto: (Codigo) => {
                    return $http.get(`api/ClasificadorObjetoGasto/GetClasificadorObjetoGasto/${Codigo}`);;
                }
            },
            EstadoRequerimiento: {
                GetEstadoRequerimiento: () => {
                    return $http.get(`api/EstadoRequerimiento`);
                }
            },
            Records: {
                CreateRecord: (recordDTO) => {

                    if (!recordDTO) return;

                    var formdata = new FormData();

                    angular.forEach(recordDTO.files, function (obj) {
                        if (!obj.isRemote)
                            formdata.append('files[]', obj.lfFile);
                    });

                    for (var key in recordDTO)
                        if (key != 'files')
                            formdata.append(key, recordDTO[key]);

                    return $http.post('api/Records/CreateRecord', formdata,
                        {
                            transformRequest: angular.identity,
                            headers: { 'Content-Type': undefined }
                        })

                },
                GetTodaysDocumentsCount: cedula => {
                    return $http.get('/api/Records/GetTodaysDocumentsCount/' + cedula);
                },
                //GetDocuments: (filters, page, qntity) => {

                //    if (!page) page = 1;
                //    if (!qntity) qntity = 10;

                //    return $http.post(`api/Records/GetDocuments/Page=${page}/Qntity=${qntity}`, filters)

                //},
                GetDocumentBySequenceCode: (sequenceCode) => {
                    if (!sequenceCode) return;
                    return $http.get('api/Records/GetDocumentBySequenceCode/SequenceCode=' + sequenceCode)
                },
                DeleteDocumentActor: (documentActorID) => {
                    if (!documentActorID) return;
                    else return $http.put(`api/Records/DeleteDocumentActor/DocumentActorID=${documentActorID}`);
                },
                AddActor: (RecordID, ActorDTO) => {
                    if (RecordID && ActorDTO)
                        return $http.put(`api/Records/AddActor/RecordID=${RecordID}`, ActorDTO)
                },
                UploadFiles: (RecordID, Files) => {

                    var formdata = new FormData();

                    angular.forEach(Files, function (obj) {
                        if (!obj.isRemote)
                            formdata.append('files[]', obj.lfFile);
                    });
                    return $http.put(`api/Records/UploadDocuments/RecordID=${RecordID}`,
                        formdata,
                        {
                            transformRequest: angular.identity,
                            headers: { 'Content-Type': undefined }
                        });

                },
                UpdateDocument: (RecordID, params) => {
                    if (!RecordID || !params) return;

                    var formdata = new FormData();

                    angular.forEach(params.files, function (obj) {
                        if (!obj.isRemote)
                            formdata.append('files[]', obj.lfFile);
                    });

                    for (var key in params)
                        if (key != 'files')
                            formdata.append(key, params[key]);

                    return $http.put(`api/Records/UpdateDocument/RecordID=${RecordID}`, formdata,
                        {
                            transformRequest: angular.identity,
                            headers: { 'Content-Type': undefined }
                        })
                },
                Exists: (referenceNumber) => {
                    if (!referenceNumber) return;
                    return $http.get(`api/Records/Exists/RN=${referenceNumber}`)
                }
            },
            Requerimiento: {
                GetRequerimiento: () => {
                    return $http.get(`api/Requerimiento`);
                },
                //GetRequerimientoPaginated: (filtro,Page, Qntity) => {
                //    if (!Page) Page = 1;
                //    if (!Qntity) Qntity = 10;

                //    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                //    return $http.post(`api/Requerimiento/Get/Page=${Page}/Qntity=${Qntity}`, filtro);
                //},



                GetRequerimientoPaginated: (filtro, Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.post(`api/Requerimiento/GetRequerimientoEst1Y3/Page=${Page}/Qntity=${Qntity}`, filtro);
                },
                GetRequerimientoCompPaginated: (filtro, Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.post(`api/Requerimiento/GetRequerimientoEst1Y3Comp/Page=${Page}/Qntity=${Qntity}`, filtro);
                },
                GetAprobacionPaginated: (filtro, Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.post(`api/Requerimiento/GetRequerimientoEst4/Page=${Page}/Qntity=${Qntity}`, filtro);
                },
                GetDespachoPaginated: (filtro, Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.post(`api/Requerimiento/GetRequerimientoEst2Y5/Page=${Page}/Qntity=${Qntity}`, filtro);
                },
                Create: (requerimiento) => {
                    if (!angular.isObject(requerimiento)) return;
                    else return $http.post(`api/Requerimiento/Create`, requerimiento);
                },
                CreateComp: (requerimiento) => {
                    if (!angular.isObject(requerimiento)) return;
                    else return $http.post(`api/Requerimiento/CreateCompra`, requerimiento);
                },
                Delete: (requerimientoID) => {
                    if (requerimientoID)
                        return $http.delete('api/Requerimiento/Delete/' + requerimientoID);
                },
                Update: (requerimiento) => {
                    if (!requerimiento) return;
                    return $http.put('api/Requerimiento/Update', requerimiento);
                },
                GetRequerimientoDetallePaginated: (IdRequerimiento, Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.get(`api/Requerimiento/Get/IdRequerimiento/${IdRequerimiento}/Page/${Page}/Qntity/${Qntity}`);
                },
                GetRequerimientoDetallePaginatedDespacho: (IdRequerimiento, Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.get(`api/RequerimientoDespacho/Get/IdRequerimiento/${IdRequerimiento}/Page/${Page}/Qntity/${Qntity}`);
                },
                EnviarAprobacion: (requerimiento) => {
                    if (requerimiento)
                        return $http.put('api/Requerimiento/EnviarAprobacion', requerimiento);
                },
                GetRequerimientoEdit: (RequerimientoID) => {
                    return $http.get(`api/Requerimiento/RequerimientoEdit/` + RequerimientoID);
                },
                AddRequeDet: (RequerimientoDet) => {
                    if (!angular.isObject(RequerimientoDet)) return;
                    else return $http.post(`api/Requerimiento/CreateRequDet`, RequerimientoDet);
                },
                UpdateReqDet: (requerimientoDet) => {
                    if (!requerimientoDet) return;
                    return $http.put('api/Requerimiento/UpdateRequDet', requerimientoDet);
                },
                DeleteReqDet: (requerimientoDetID) => {
                    if (requerimientoDetID)
                        return $http.delete('api/Requerimiento/DeleteRequDet/' + requerimientoDetID);
                },
                Despacho: (requerimiento) => {
                    if (!requerimiento) return;
                    return $http.put('api/Requerimiento/Despacho', requerimiento);
                },
                GetRequerimientoEnProceso: () => {
                    return $http.get(`api/Requerimiento/RequerimientoEnProceso` );
                },
                GetRequerimientoPendienteAprobacion: () => {
                    return $http.get(`api/Requerimiento/RequerimientoPendienteAprobacion`);
                },
                GetRequerimientoPendienteDespacho: () => {
                    return $http.get(`api/Requerimiento/RequerimientoPendienteDespacho`);
                },
                GetRequerimientoDespachado: () => {
                    return $http.get(`api/Requerimiento/RequerimientoDespachado`);
                },
                GetRequerimientoRechazado: () => {
                    return $http.get(`api/Requerimiento/RequerimientoRechazado`);
                },
                GetRequerimientoAprobadoCompra: () => {
                    return $http.get(`api/Requerimiento/RequerimientoAprobadoCompra`);
                },
                GetRequerimientoEnProcesoAll: () => {
                    return $http.get(`api/Requerimiento/RequerimientoEnProcesoAll`);
                },
                GetRequerimientoPendienteAprobacionAll: () => {
                    return $http.get(`api/Requerimiento/RequerimientoPendienteAprobacionAll`);
                },
                GetRequerimientoPendienteDespachoAll: () => {
                    return $http.get(`api/Requerimiento/RequerimientoPendienteDespachoAll`);
                },
                GetRequerimientoDespachadoAll: () => {
                    return $http.get(`api/Requerimiento/RequerimientoDespachadoAll`);
                },
                GetRequerimientoRechazadoAll: () => {
                    return $http.get(`api/Requerimiento/RequerimientoRechazadoAll`);
                },
                GetRequerimientoAprobadoCompraAll: () => {
                    return $http.get(`api/Requerimiento/RequerimientoAprobadoCompraAll`);
                }
            },
            SolicitudOrdenCompra: {
                GetSolicitudOrdenCompra: () => {
                    return $http.get(`api/SolicitudOrdenCompra`);
                },
                GetSolicitudOrdenCompraPaginated: (filtro,Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.post(`api/SolicitudOrdenCompra/Get/Page=${Page}/Qntity=${Qntity}`, filtro);
                },
                Create: (SolicitudOrdenCompra) => {
                    if (!angular.isObject(SolicitudOrdenCompra)) return;
                    else return $http.post(`api/SolicitudOrdenCompra/Create`, SolicitudOrdenCompra);
                },
                Delete: (SolicitudOrdenCompraID) => {
                    if (SolicitudOrdenCompraID)
                        return $http.delete('api/SolicitudOrdenCompra/Delete/' + SolicitudOrdenCompraID);
                },
                Update: (SolicitudOrdenCompra) => {
                    if (!SolicitudOrdenCompra) return;
                    return $http.put('api/SolicitudOrdenCompra/Update', SolicitudOrdenCompra);
                },
                GetSolicitudCompraEdit: (SolicitudCompraID) => {
                    return $http.get(`api/SolicitudOrdenCompra/SolicitudCompraEdit/` + SolicitudCompraID);
                },
                GetSolicitudDetallePaginated: (IdSolicitud, Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.get(`api/SolicitudOrdenCompra/Get/IdSolicitud/${IdSolicitud}/Page/${Page}/Qntity/${Qntity}`);
                }

            },
            Files: {
                DeleteFile: (fileID) => {
                    if (!fileID) return;
                    else return $http.delete('api/Files/' + fileID)
                },
                GET: (FileId) => {
                    if (!angular.isNumber(FileId)) return;
                    const Request = { responseType: 'arraybuffer', url: '/File/' + FileId, method: "GET" }
                    return $http(Request);
                }
            },
            Actor: {
                GetActors: (SearchTermn, Page = 1, Qntity = 20) => {
                    return $http.get('api/Actors?' + $.param({ SearchTermn, Page, Qntity }));
                }
            },
            Encargado: {
                GetEncargado: () => {
                    return $http.get(`api/Encargado`);
                },
                GetEncargadoPaginated: (Page, Qntity) => {
                    if (!Page) Page = 1;
                    if (!Qntity) Qntity = 10;

                    if (angular.isNumber(Number.parseInt(Page)) === false) return;

                    return $http.get(`api/Encargado/Get/Page/${Page}/Qntity/${Qntity}`);
                },
                GetEncargadoEdit: (encargadoID) => {
                    return $http.get(`api/Encargado/EncargadoEdit/` + encargadoID);
                },
                Create: (encargado) => {
                    if (!angular.isObject(encargado)) return;
                    else return $http.post(`api/Encargado/Create`, encargado);
                },
                Delete: (encargadoID) => {
                    if (encargadoID)
                        return $http.delete('api/Encargado/Delete/' + encargadoID);
                },
                Update: (encargado) => {
                    if (!encargado) return;
                    return $http.put('api/Encargado/Update', encargado);
                }
            },
        }
        //console.log('API Definition', API);
        return API;
    }
})();