//< !--AUTHOR: Yorki E. Encarnacion Moquete-- >

(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('IndexPrincipalController', IndexPrincipalController);
        IndexPrincipalController.$inject = ['$location', 'API'];

    function IndexPrincipalController($location, API) {
        const DocumentTypes = { Enviados: 2, Recibidos: 3 };
        this.DocumentTypes = DocumentTypes;
        var $scope = this;
        $scope.TodaysDocumentsCount='CARGANDO...'
        $scope.SCGU_URI = window.MICM_AUTH_SERVER.Url;
        $scope.user = window.MICM_AUTH_SERVER.identity;
        $scope.userID = window.MICM_AUTH_SERVER.identity.UserID;
        $scope.page = 1;
        $scope.limit = 10;
        $scope.TotalRequerimientoPendiente;

        Chart.pluginService.register({
            beforeDraw: function (chart) {
                if (chart.config.options.elements.center) {
                    //Get ctx from string
                    var ctx = chart.chart.ctx;

                    //Get options from the center object in options
                    var centerConfig = chart.config.options.elements.center;
                    var fontStyle = centerConfig.fontStyle || 'Arial';
                    var txt = centerConfig.text;
                    var color = centerConfig.color || '#000';
                    var sidePadding = centerConfig.sidePadding || 20;
                    var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                    //Start with a base font of 30px
                    ctx.font = "30px " + fontStyle;

                    //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                    var stringWidth = ctx.measureText(txt).width;
                    var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                    // Find out how much the font can grow in width.
                    var widthRatio = elementWidth / stringWidth;
                    var newFontSize = Math.floor(30 * widthRatio);
                    var elementHeight = (chart.innerRadius * 2);

                    // Pick a new font size so it will not be larger than the height of label.
                    var fontSizeToUse = Math.min(newFontSize, elementHeight);

                    //Set font settings to draw it correctly.
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                    var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                    ctx.font = fontSizeToUse + "px " + fontStyle;
                    ctx.fillStyle = color;

                    //Draw text in center
                    ctx.fillText(txt, centerX, centerY);
                }
            }
        });

        $scope.Donut = ()=> {

            API.Home.RolUsuario().then((r) => {        

                if (r.data.roleID == 24 || r.data.roleID == 28 || r.data.roleID == 25 || r.data.roleID == 30) {

                    //Administrador -- Requerimiento
                    document.getElementById('#Aprobacion').style.display = 'none';
                    document.getElementById('#Requerimiento').style.display = 'block';
                    

                    API.Requerimiento.GetRequerimientoEnProceso().then((r) => {

                        var chDonut1 = document.getElementById("chDonut1");
                        if (chDonut1) {
                            new Chart(chDonut1, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Requerimientos Pendientes'],
                                    datasets: [{
 // Se comento para que no salga el donut     data: [r.data],
                                        data: [0],
                                        backgroundColor: [
                                            "#6610f2",
                                        ],
                                        hoverBackgroundColor: [
                                            "#6610f2",
                                        ]
                                    }]
                                },
                                options: {
                                    cutoutPercentage: 85,
                                    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
                                    elements: {
                                        center: {
                                            text: r.data,
                                            color: '#252a34', // Default is #000000
                                        }
                                    }
                                }
                            });
                        }
                    });

                    API.Requerimiento.GetRequerimientoPendienteAprobacion().then((r) => {

                        var chDonut2 = document.getElementById("chDonut2");
                        if (chDonut2) {
                            new Chart(chDonut2, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Requerimientos en Aprobacion'],
                                    datasets: [{
 // Se comento para que no salga el donut     data: [r.data],
                                        data: [0],
                                        backgroundColor: [
                                            "#0076cd",
                                        ],
                                        hoverBackgroundColor: [
                                            "#0076cd",
                                        ]
                                    }]
                                },
                                options: {
                                    cutoutPercentage: 85,
                                    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
                                    elements: {
                                        center: {
                                            text: r.data,
                                            color: '#252a34', // Default is #000000
                                        }
                                    }
                                }
                            });
                        }
                    });

                    API.Requerimiento.GetRequerimientoPendienteDespacho().then((r) => {

                        var chDonut3 = document.getElementById("chDonut3");
                        if (chDonut3) {
                            new Chart(chDonut3, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Requerimientos en Despacho'],
                                    datasets: [{
 // Se comento para que no salga el donut     data: [r.data],
                                        data: [0],
                                        backgroundColor: [
                                            "#131ff2",
                                        ],
                                        hoverBackgroundColor: [
                                            "#131ff2",
                                        ]
                                    }]
                                },
                                options: {
                                    cutoutPercentage: 85,
                                    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
                                    elements: {
                                        center: {
                                            text: r.data,
                                            color: '#333333', // Default is #000000
                                        }
                                    }
                                }
                            });
                        }
                    });

                    API.Requerimiento.GetRequerimientoDespachado().then((r) => {

                        var chDonut4 = document.getElementById("chDonut4");
                        if (chDonut4) {
                            new Chart(chDonut4, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Requerimientos Despachados'],
                                    datasets: [{
 // Se comento para que no salga el donut     data: [r.data],
                                        data: [0],
                                        backgroundColor: [
                                            "#3beb61",
                                        ],
                                        hoverBackgroundColor: [
                                            "#3beb61",
                                        ]
                                    }]
                                },
                                options: {
                                    cutoutPercentage: 85,
                                    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
                                    elements: {
                                        center: {
                                            text: r.data,
                                            color: '#252a34', // Default is #000000
                                        }
                                    }
                                }
                            });
                        }
                    });

                    API.Requerimiento.GetRequerimientoRechazado().then((r) => {

                        var chDonut5 = document.getElementById("chDonut5");
                        if (chDonut5) {
                            new Chart(chDonut5, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Requerimientos Rechazados'],
                                    datasets: [{
 // Se comento para que no salga el donut     data: [r.data],
                                        data: [0],
                                        backgroundColor: [
                                            "#ed0707",
                                        ],
                                        hoverBackgroundColor: [
                                            "#ed0707",
                                        ]
                                    }]
                                },
                                options: {
                                    cutoutPercentage: 85,
                                    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
                                    elements: {
                                        center: {
                                            text: r.data,
                                            color: '#252a34', // Default is #000000
                                        }
                                    }
                                }
                            });
                        }
                    });

                    API.Requerimiento.GetRequerimientoAprobadoCompra().then((r) => {

                        var chDonut6 = document.getElementById("chDonut6");
                        if (chDonut6) {
                            new Chart(chDonut6, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Ordenes de Compra'],
                                    datasets: [{
 // Se comento para que no salga el donut     data: [r.data],
                                        data: [0],
                                        backgroundColor: [
                                            "#28a745",
                                        ],
                                        hoverBackgroundColor: [
                                            "#28a745",
                                        ]
                                    }]
                                },
                                options: {
                                    cutoutPercentage: 85,
                                    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
                                    elements: {
                                        center: {
                                            text: r.data,
                                            color: '#252a34', // Default is #000000
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
                else if (r.data.roleID == 27 || r.data.roleID == 29 || r.data.roleID == 31 || r.data.roleID == 32) {
                    //ALL
                    //Aprobacion -- Almacen
                    document.getElementById('#Requerimiento').style.display = 'none';
                    document.getElementById('#Aprobacion').style.display = 'block';

                    API.Requerimiento.GetRequerimientoEnProcesoAll().then((r) => {

                        var chDonut7 = document.getElementById("chDonut7");
                        if (chDonut7) {
                            new Chart(chDonut7, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Requerimientos Pendientes'],
                                    datasets: [{
 // Se comento para que no salga el donut     data: [r.data],
                                        data: [0],
                                        backgroundColor: [
                                            "#6610f2",
                                        ],
                                        hoverBackgroundColor: [
                                            "#6610f2",
                                        ]
                                    }]
                                },
                                options: {
                                    cutoutPercentage: 85,
                                    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
                                    elements: {
                                        center: {
                                            text: r.data,
                                            color: '#252a34', // Default is #000000
                                        }
                                    }
                                }
                            });
                        }

                        //var chDonut7 = new CanvasJS.Chart("chartContainer", {
                        //    animationEnabled: true,
                        //    data: [{
                        //        type: "doughnut",
                        //        startAngle: 60,
                        //        //innerRadius: 60,
                        //        toolTipContent: "{y}",
                        //        dataPoints: [
                        //            { y: [r.data] }
                        //        ]
                        //    }]
                        //});
                        

                        //chDonut7.render();

                        //var dps = chDonut7.options.data[0].dataPoints;
                        //var sum = 0;

                        //for (var i = 0; i < dps.length; i++) {

                        //    sum += dps[i].y;

                        //}

                        //document.getElementById("total").innerHTML = sum;

                    });

                    API.Requerimiento.GetRequerimientoPendienteAprobacionAll().then((r) => {

                        var chDonut8 = document.getElementById("chDonut8");
                        if (chDonut8) {
                            new Chart(chDonut8, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Requerimientos en Aprobacion'],
                                    datasets: [{
 // Se comento para que no salga el donut     data: [r.data],
                                        data: [0],
                                        backgroundColor: [
                                            "#0076cd",
                                        ],
                                        hoverBackgroundColor: [
                                            "#0076cd",
                                        ]
                                    }]
                                },
                                options: {
                                    cutoutPercentage: 85,
                                    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
                                    elements: {
                                        center: {
                                            text: r.data,
                                            color: '#252a34', // Default is #000000
                                        }
                                    }
                                }
                            });
                        }
                    });

                    API.Requerimiento.GetRequerimientoPendienteDespachoAll().then((r) => {

                        var chDonut9 = document.getElementById("chDonut9");
                        if (chDonut9) {
                            new Chart(chDonut9, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Requerimientos en Despacho'],
                                    datasets: [{
 // Se comento para que no salga el donut     data: [r.data],
                                        data: [0],
                                        backgroundColor: [
                                            "#131ff2",
                                        ],
                                        hoverBackgroundColor: [
                                            "#131ff2",
                                        ]
                                    }]
                                },
                                options: {
                                    cutoutPercentage: 85,
                                    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
                                    elements: {
                                        center: {
                                            text: r.data,
                                            color: '#333333', // Default is #000000
                                        }
                                    }
                                }
                            });
                        }
                    });

                    API.Requerimiento.GetRequerimientoDespachadoAll().then((r) => {

                        var chDonut10 = document.getElementById("chDonut10");
                        if (chDonut10) {
                            new Chart(chDonut10, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Requerimientos Despachados'],
                                    datasets: [{
 // Se comento para que no salga el donut     data: [r.data],
                                        data: [0],
                                        backgroundColor: [
                                            "#3beb61",
                                        ],
                                        hoverBackgroundColor: [
                                            "#3beb61",
                                        ]
                                    }]
                                },
                                options: {
                                    cutoutPercentage: 85,
                                    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
                                    elements: {
                                        center: {
                                            text: r.data,
                                            color: '#252a34', // Default is #000000
                                        }
                                    }
                                }
                            });
                        }
                    });

                    API.Requerimiento.GetRequerimientoRechazadoAll().then((r) => {

                        var chDonut11 = document.getElementById("chDonut11");
                        if (chDonut11) {
                            new Chart(chDonut11, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Requerimientos Rechazados'],
                                    datasets: [{
 // Se comento para que no salga el donut     data: [r.data],
                                        data: [0],
                                        backgroundColor: [
                                            "#ed0707",
                                        ],
                                        hoverBackgroundColor: [
                                            "#ed0707",
                                        ]
                                    }]
                                },
                                options: {
                                    cutoutPercentage: 85,
                                    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
                                    elements: {
                                        center: {
                                            text: r.data,
                                            color: '#252a34', // Default is #000000
                                        }
                                    }
                                }
                            });
                        }
                    });

                    API.Requerimiento.GetRequerimientoAprobadoCompraAll().then((r) => {

                        var chDonut12 = document.getElementById("chDonut12");
                        if (chDonut12) {
                            new Chart(chDonut12, {
                                type: 'doughnut',
                                data: {
                                    labels: ['Ordenes de Compra'],
                                    datasets: [{
 // Se comento para que no salga el donut     data: [r.data],
                                        data: [0],
                                        backgroundColor: [
                                            "#28a745",
                                        ],
                                        hoverBackgroundColor: [
                                            "#28a745",
                                        ]
                                    }]
                                },
                                options: {
                                    cutoutPercentage: 85,
                                    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
                                    elements: {
                                        center: {
                                            text: r.data,
                                            color: '#252a34', // Default is #000000
                                        }
                                    }
                                }
                            });
                        }
                    });

                }

            });

            //var chart99 = new CanvasJS.Chart("chartContainer", {
            //    animationEnabled: true,
            //    data: [{
            //        type: "doughnut",
            //        startAngle: 60,
            //        //innerRadius: 60,
            //        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            //        dataPoints: [
            //            { y: 100 }
            //        ]
            //    }]
            //});
            //chart99.render();
        }

        $scope.Donut();      

        //var colors = ['#007bff', '#28a745', '#333333', '#c3e6cb', '#dc3545', '#6c757d'];

        ///* large line chart */
        //var chLine = document.getElementById("chLine");
        //var chartData = {
        //    labels: ["S", "M", "T", "W", "T", "F", "S"],
        //    datasets: [{
        //        data: [589, 445, 483, 503, 689, 692, 634],
        //        backgroundColor: 'transparent',
        //        borderColor: colors[0],
        //        borderWidth: 4,
        //        pointBackgroundColor: colors[0]
        //    },
        //    {
        //        data: [639, 465, 493, 478, 589, 632, 674],
        //        backgroundColor: colors[3],
        //        borderColor: colors[1],
        //        borderWidth: 4,
        //        pointBackgroundColor: colors[1]
        //    }]
        //};
        //if (chLine) {
        //    new Chart(chLine, {
        //        type: 'line',
        //        data: chartData,
        //        options: {
        //            scales: {
        //                xAxes: [{
        //                    ticks: {
        //                        beginAtZero: false
        //                    }
        //                }]
        //            },
        //            legend: {
        //                display: false
        //            },
        //            responsive: true
        //        }
        //    });
        //}

        ///* large pie/donut chart */
        //var chPie = document.getElementById("chPie");
        //if (chPie) {
        //    new Chart(chPie, {
        //        type: 'pie',
        //        data: {
        //            labels: ['Desktop', 'Phone', 'Tablet', 'Unknown'],
        //            datasets: [
        //                {
        //                    backgroundColor: [colors[1], colors[0], colors[2], colors[5]],
        //                    borderWidth: 0,
        //                    data: [50, 40, 15, 5]
        //                }
        //            ]
        //        },
        //        plugins: [{
        //            beforeDraw: function (chart) {
        //                var width = chart.chart.width,
        //                    height = chart.chart.height,
        //                    ctx = chart.chart.ctx;
        //                ctx.restore();
        //                var fontSize = (height / 70).toFixed(2);
        //                ctx.font = fontSize + "em sans-serif";
        //                ctx.textBaseline = "middle";
        //                var text = chart.config.data.datasets[0].data[0] + "%",
        //                    textX = Math.round((width - ctx.measureText(text).width) / 2),
        //                    textY = height / 2;
        //                ctx.fillText(text, textX, textY);
        //                ctx.save();
        //            }
        //        }],
        //        options: { layout: { padding: 0 }, legend: { display: false }, cutoutPercentage: 80 }
        //    });
        //}

        ///* bar chart */
        //var chBar = document.getElementById("chBar");
        //if (chBar) {
        //    new Chart(chBar, {
        //        type: 'bar',
        //        data: {
        //            labels: ["S", "M", "T", "W", "T", "F", "S"],
        //            datasets: [{
        //                data: [589, 445, 483, 503, 689, 692, 634],
        //                backgroundColor: colors[0]
        //            },
        //            {
        //                data: [639, 465, 493, 478, 589, 632, 674],
        //                backgroundColor: colors[1]
        //            }]
        //        },
        //        options: {
        //            legend: {
        //                display: false
        //            },
        //            scales: {
        //                xAxes: [{
        //                    barPercentage: 0.4,
        //                    categoryPercentage: 0.5
        //                }]
        //            }
        //        }
        //    });
        //}

        ///* 3 donut charts */
        //var donutOptions = {
        //    cutoutPercentage: 85,
        //    legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
        //    elements: {
        //        center: {
        //            text: '6',
        //            color: '#333333', // Default is #000000
        //            fontStyle: 'Arial', // Default is Arial
        //            sidePadding: 5 // Defualt is 20 (as a percentage)
        //        }
        //    }
        //};

        //// donut 1
        //var chDonutData1 = {
        //    labels: ['Bootstrap'],
        //    datasets: [
        //        {
        //            backgroundColor: colors.slice(0, 1),
        //            borderWidth: 0,
        //            data: [74]
        //        }
        //    ]
        //};

       



        

        

        

        

        //var chDonutData1 = {
        //    labels: ['Bootstrap', 'Popper', 'Other'],
        //    datasets: [
        //        {
        //            backgroundColor: colors.slice(0, 3),
        //            borderWidth: 0,
        //            data: [74, 11, 40]
        //        }
        //    ]
        //};

        //var chDonut1 = document.getElementById("chDonut1");
        //if (chDonut1) {
        //    new Chart(chDonut1, {
        //        type: 'pie',
        //        data: chDonutData1,
        //        options: donutOptions
        //    });
        //}





        // donut 2
        //var chDonutData2 = {
        //    labels: ['Wips', 'Pops', 'Dags'],
        //    datasets: [
        //        {
        //            backgroundColor: colors.slice(0, 3),
        //            borderWidth: 0,
        //            data: [40, 45, 65]
        //        }
        //    ]
        //};
        //var chDonut2 = document.getElementById("chDonut2");
        //if (chDonut2) {
        //    new Chart(chDonut2, {
        //        type: 'pie',
        //        data: chDonutData2,
        //        options: donutOptions
        //    });
        //}

        // donut 3
        //var chDonutData3 = {
        //    labels: ['Angular', 'React', 'Other'],
        //    datasets: [
        //        {
        //            backgroundColor: colors.slice(0, 3),
        //            borderWidth: 0,
        //            data: [21, 45, 55, 33]
        //        }
        //    ]
        //};
        //var chDonut3 = document.getElementById("chDonut3");
        //if (chDonut3) {
        //    new Chart(chDonut3, {
        //        type: 'pie',
        //        data: chDonutData3,
        //        options: donutOptions
        //    });
        //}

        /* 3 line charts */
        var lineOptions = {
            legend: { display: false },
            tooltips: { interest: false, bodyFontSize: 11, titleFontSize: 11 },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }
                    }
                ],
                yAxes: [{ display: false }]
            },
            layout: {
                padding: {
                    left: 6,
                    right: 6,
                    top: 4,
                    bottom: 6
                }
            }
        };

        var chLine1 = document.getElementById("chLine1");
        if (chLine1) {
            new Chart(chLine1, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [
                        {
                            backgroundColor: '#ffffff',
                            borderColor: '#ffffff',
                            data: [10, 11, 4, 11, 4],
                            fill: false
                        }
                    ]
                },
                options: lineOptions
            });
        }
        var chLine2 = document.getElementById("chLine2");
        if (chLine2) {
            new Chart(chLine2, {
                type: 'line',
                data: {
                    labels: ['A', 'B', 'C', 'D', 'E'],
                    datasets: [
                        {
                            backgroundColor: '#ffffff',
                            borderColor: '#ffffff',
                            data: [4, 5, 7, 13, 12],
                            fill: false
                        }
                    ]
                },
                options: lineOptions
            });
        }

        var chLine3 = document.getElementById("chLine3");
        if (chLine3) {
            new Chart(chLine3, {
                type: 'line',
                data: {
                    labels: ['Pos', 'Neg', 'Nue', 'Other', 'Unknown'],
                    datasets: [
                        {
                            backgroundColor: '#ffffff',
                            borderColor: '#ffffff',
                            data: [13, 15, 10, 9, 14],
                            fill: false
                        }
                    ]
                },
                options: lineOptions
            });
        }




        //$scope.filters = {
        //    RecordType: DocumentTypes.Enviados,
        //    StartDate: null,
        //    EndDate: null
        //};
        //API.Records.GetTodaysDocumentsCount($scope.userID).then(r => {
        //    $scope.TodaysDocumentsCount = r.data;
        //}, e => {
        //    console.warn('ERROR', e)
        //    $scope.TodaysDocumentsCount = 'NO DISPONIBLE';
        //})
        //$scope.formatDate = (date) => {
        //    return moment(date).local().format('DD/MMMM/YYYY, hh:mm a');
        //}
        //$scope.LoadDocumentTypes = () => {
        //    console.warn('Load docs')
        //    API.DocumentTypes.GetByRecordType($scope.filters.RecordType).then((r) => {
        //        $scope.DocumentTypes = r.data;
        //    });
        //}
        //$scope.FetchInstitutions = (searchTermn) => {
        //    API.Institutions.GetInstitutions(searchTermn, 1, 30).then((r) => {
        //        $scope.Institutions = (r.data.data || []).concat($scope.filters.Institutions);

        //        console.log($scope.Institutions);
        //        console.log('View.GetInstitutions / API.Institutions.GetInstitutions', r.data)
        //    });
        //}
        //$scope.GetDocuments = (page, qntity) => {
        //    $scope.loadingDocuments = true;
        //    const _dto = angular.copy($scope.filters);
        //    _dto.Institutions = $.map(($scope.filters.Institutions || []), i => i.institutionID);
        //    API.Records.GetDocuments(_dto, $scope.page, $scope.limit).then((r) => {
        //        $scope.Documents = r.data.data;
        //        $scope.total = r.data.qntity;
        //        $scope.loadingDocuments = false;
        //        console.log(r)
        //    }, (e) => { })
        //}
        //$scope.GetDocuments();
    }
})();
