//< !--AUTHOR: Brawny Javier Mateo Reyes-- >

(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('LayoutController', LayoutController);
    LayoutController.$inject = ['$location', 'API', '$mdDialog'];

    function LayoutController($location, API, $mdDialog) {
        const VIEW = this;

        VIEW.RequestReport = (ev, Report) => {
            VIEW.CurrentReport = Report;

            $mdDialog.show({
                contentElement: '#reportDesdeHastaDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                controller: LayoutController
            });
        }

        VIEW.OpenReport = (report, startDate, endDate,Year) => {
            console.warn('CurrReport:', {
                report, startDate, endDate,Year
            });
            //new Date().toISOString()
            window.open(`${report.url}?${$.param({
                Desde: startDate,
                Hasta: endDate,
                Year: Year
            })}`, report.ReportName, 'width=1000,height=950,scrollbars=yes,resizable=no')
        }


        VIEW.OpenReport2 = (report) => {
            window.open(`${report.url}?`, report.ReportName, 'width=1000,height=950,scrollbars=yes,resizable=no')
        }

        VIEW.OpenReport3 = (report) => {
            window.open(`${report.url}?`, report.ReportName, 'width=1000,height=950,scrollbars=yes,resizable=no')
        }

        VIEW.OpenReportArticulosPorAcabar= (report) => {
            window.open(`${report.url}?`, report.ReportName, 'width=1000,height=950,scrollbars=yes,resizable=no')
        }

        const DocumentTypes = { Enviados: 2, Recibidos: 3 };
        this.DocumentTypes = DocumentTypes;
        var $scope = this;
        $scope.page = 1;
        $scope.limit = 10;
        $scope.filters = {
            RecordType: DocumentTypes.Enviados,
            StartDate: null,
            EndDate: null
        };
        $scope.formatDate = (date) => {
            return moment(date).local().format('DD/MMMM/YYYY, hh:mm a');
        }
        $scope.LoadDocumentTypes = () => {
            console.warn('Load docs')
            API.DocumentTypes.GetByRecordType($scope.filters.RecordType).then((r) => {
                $scope.DocumentTypes = r.data;
            });
        }

        if (document.getElementById('IdRol').getAttribute('value') == 24 || document.getElementById('IdRol').getAttribute('value') == 28)
        {
            $('#Administrador').show();
            $('#Almacen').hide();
            $("#Requerimiento").hide();
            $("#Aprobacion").hide();
            $('#Reportes').hide();

        }
        else if (document.getElementById('IdRol').getAttribute('value') == 27 || document.getElementById('IdRol').getAttribute('value') == 29)
        {
            $('#Almacen').show();
            $('#Administrador').hide();
            $("#Requerimiento").hide();
            $("#Aprobacion").hide();
            $('#Reportes').hide();
        }
        else if (document.getElementById('IdRol').getAttribute('value') == 25 || document.getElementById('IdRol').getAttribute('value') == 30)
        {
            $("#Requerimiento").show();
            $('#Administrador').hide();
            $('#Almacen').hide();
            $("#Aprobacion").hide();
            $('#Reportes').hide();
        }
        else if (document.getElementById('IdRol').getAttribute('value') == 31 || document.getElementById('IdRol').getAttribute('value') == 32) {
            $('#Aprobacion').show();
            $('#Administrador').hide();
            $('#Almacen').hide();
            $('#Requerimiento').hide();
            $('#Reportes').hide();
        }
        else if (document.getElementById('IdRol').getAttribute('value') == 33 || document.getElementById('IdRol').getAttribute('value') == 35) {
            $('#Reportes').show();
            $('#Aprobacion').hide();
            $('#Administrador').hide();
            $('#Almacen').hide();
            $('#Requerimiento').hide();
        }

        $scope.OpenReport2 = (report) => {

            window.open(`${report.url}?`, report.ReportName, 'width=1000,height=950,scrollbars=yes,resizable=no')
        }

        $scope.Hasta = (Desde) => {

            window.open(`${report.url}?`, report.ReportName, 'width=1000,height=950,scrollbars=yes,resizable=no')
        }

        API.Notificacion.GetNotificacionSinLeer().then((r) => {
            VIEW.CantNotificaciones = r.data;

        });

        API.Notificacion.GetNotificacion().then((r) => {

            var options =r.data;
            //VIEW.CantNotificaciones = options.length;

            for (var i = 0; i < options.length; i++) {
                $('#Notificacion').append("<li><a class='peers fxw-nw td-n p-20 bdB c-grey-800 cH-blue bgcH-grey-100'><div class='peer peer-greed'><span>" + options[i].descripcionNotificacion + "</span><p class='m - 0'><small class='fsz - xs'>" + options[i].fechaNotificacion + "</small></p></div></a><li>");
            }

        }, e => {
            console.error('Error at  API.Notificacion.GetNotificacion', e)
        });

        //var options = data.data;
        //for (var i = 0; i < options.length; i++) {
        //    $('#IdCuentaCB').append('<option value=' + options[i].IdCuentaCB + '>' + options[i].CuentaString + '</option>');
        //    symbolDict[options[i].IdCuentaCB] = options[i].SimboloMoneda;
        //    tipoCuentaDict[options[i].IdCuentaCB] = options[i].NombreTipoCuentaTesoreria;
        //}


        //$("Administrador").show();
        //$("Almacen").show();
        //$("Requerimiento").show();

        //$scope.GetDocuments = (page, qntity) => {
        //    $scope.loadingDocuments = true;
        //    API.Records.GetDocuments($scope.filters, $scope.page, $scope.limit).then((r) => {
        //        $scope.Documents = r.data.data;
        //        $scope.total = r.data.qntity;
        //        $scope.loadingDocuments = false;
        //        console.log(r)
        //    }, (e) => { })
        //}
        //$scope.GetDocuments();
    }
})();
