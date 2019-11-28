//< !--AUTHOR: Brawny Javier Mateo Reyes-- >
(function () {
    'use strict';

    angular
        .module('MicmApp')
        .controller('ExternalRegistController', ExternalRegistController);

    ExternalRegistController.$inject = ['$scope', 'API', '$timeout'];

    function ExternalRegistController($scope, API, $timeout) {
        const View = this;
        const RecordTypes = {
            Enviados: 2,
            Recibidos: 3
        }
        View.RecordType = RecordTypes.Recibidos;
        View.RecordTypes = RecordTypes;

        View.AddresseeTypes = [{ Type: 'Destinatario', Id: 1 }, { Type: 'Copia', Id: 2 }, { Type: 'Via', Id: 3 }, { Type: 'Atencion', Id: 4 }];
        View.showAdresseesAddform = true;
        View.NewAddressee = {};
        View.NewSender = {};
        View.files = [];
        View.showSendersAddform = true;

        console.log(View)
        const AppStates = {
            Loading: 2,
            Normal: 3,
            LoadingDocTypes: 4,
            Submitted: 5
        };
        View.States = AppStates;
        View.state = AppStates.Normal;
        View.newDocument = {
            addressees: [],
            senders: []
        };
        View.state = AppStates.Normal;
        View.states = AppStates;


        View.AddSender = (sender) => {
            console.log('Adding sender', sender)
            View.newDocument.senders = View.newDocument.senders || [];
            const newsender = $.extend(true, {}, sender);
            View.newDocument.senders.push(newsender);
            View.NewSender = {};
            View.showSendersAddform = false;
        }
        View.DeleteSender = (sender) => {
            View.newDocument.senders = View.newDocument.senders || [];
            View.newDocument.senders = _.without(View.newDocument.senders, sender);
            View.NewSender = {};
        }
        View.addAddressee = (NewAddressee) => {
            $scope.$safeApply(() => {
                View.newDocument.addressees = View.newDocument.addressees || [];
                const newAdrsee = $.extend(true, {}, NewAddressee);
                View.newDocument.addressees.push(newAdrsee);
                NewAddressee = {};
                View.NewAddressee = {};
                View.showAdresseesAddform = false;
                View.NewAddressee = {};
                console.log('newAdrsee', newAdrsee)
            });
        }
        View.DeleteAddressee = (Addressee) => {
            View.newDocument.addressees = View.newDocument.addressees || [];
            View.newDocument.addressees = _.without(View.newDocument.addressees, Addressee);
        }
        View.LoadDocumentTypes = () => {
            View.state = AppStates.LoadingDocTypes;
            API.DocumentTypes.GetByRecordType(View.RecordType).then((r) => {
                console.log(r)
                View.DocumentTypes = r.data;
                View.state = AppStates.Normal;
            });
        }
        View.Institutions = {
            InstitutionsStore: [],
            onTextChange: (searchTermn) => {
                try {
                    API.Institutions.GetInstitutions(searchTermn).then((r) => {
                        console.warn('r', r)
                        View.Institutions.InstitutionsStore = r.data.data;
                    }, (e) => onErrorOccurred(e));
                } catch (e) {
                    console.error('Could not fetch Institutions for >"' + searchTermn + '"<')
                }
            },
            LookUpText: '',
            cacheDisabled: true,
            selectedTitle: null
        }
        View.Departments = {
            Departments: [],
            onTextChange: (searchTermn) => {
                try {
                    API.Departments.GetDepartments(searchTermn).then((r) => {
                        console.warn('r', r)
                        View.Departments.Departments = r.data;
                    }, (e) => onErrorOccurred(e));
                } catch (e) {
                    console.error('Could not fetch Departments for >"' + searchTermn + '"<')
                }
            },
            LookUpText: '',
            cacheDisabled: true,
            selectedTitle: null
        };
        View.SENDER_INSTITUTIONS = {
            InstitutionsStore: [],
            onTextChange: (searchTermn) => {
                try {
                    //API.Departments.GetDepartments(searchTermn).then((r) => {
                    //    console.warn('r', r)
                    //    vm.SENDER_INSTITUTIONS.InstitutionsStore = r.data;
                    //}, (e) => onErrorOccurred(e));

                    API.Institutions.GetInstitutions(searchTermn).then((r) => {
                        console.warn('r', r)
                        View.SENDER_INSTITUTIONS.InstitutionsStore = r.data.data;
                    }, (e) => onErrorOccurred(e));

                } catch (e) {
                    console.error('Could not fetch institutions for >"' + searchTermn + '"<\n Error details as follows:', e)
                }
            },
            LookUpText: '',
            cacheDisabled: true,
            selectedTitle: null
        };

        let CheckReferenceNumberTimeout;
        View.CheckReferenceNumber = (referenceNumber) => {
            $timeout.cancel(CheckReferenceNumberTimeout);
            View.isCheckingReferenceNumber = true;

            try {
                CheckReferenceNumberTimeout = $timeout(() => {
                    API.Records
                        .Exists(referenceNumber)
                        .then((r) => {
                            console.log('Exists r', r)
                            View.isCheckingReferenceNumber = false;
                            View.ReferenceNumberExists = r.data;
                        }, (e) => {
                            alert('Oops!, al parecer ha ocurrido un error al intentar verificar el No. de Documento.');
                            View.isCheckingReferenceNumber = false;
                        })
                }, 1500)

            } catch (e) {
                alert('Oops!, al parecer ha ocurrido un error al intentar verificar el No. de Documento.');
                View.isCheckingReferenceNumber = false;
                console.error(e)
            }


            //$timeout(() => View.isCheckingReferenceNumber = false, 1000)
        }
        View.submit = (doc) => {
            debugger;
            View.state = AppStates.Loading;
            try {
                // Retrives intitutionID or departmentID from objects
                const mappedAddressees = $.map(doc.addressees, (ads) => {
                    return {
                        names: ads.names,
                        lastNames: ads.lastNames,
                        type: ads.type,
                        institutionID: (ads.institution) ? ads.institution.institutionID : null,
                        departmentID: (ads.area) ? ads.area.departmentID : null
                    }
                });
                // Retrives departmentID from object
                const mappedSenders = $.map(doc.senders, (ads) => {
                    return {
                        names: ads.names,
                        lastNames: ads.lastNames,
                        departmentID: (ads.area) ? ads.area.departmentID : null,
                        institutionID: (ads.institution) ? ads.institution.institutionID : null

                    }
                });

                console.log('doc ->', doc, 'files ->', View.files);


                const ParsedmappedAddressees = JSON.stringify(mappedAddressees);

                const DTO = {
                    DocumentTypeID: doc.DocumentType,
                    annexes: View.newDocument.annexes,
                    subject: View.newDocument.subject,
                    files: View.files,
                    addressees: ParsedmappedAddressees ? ParsedmappedAddressees : null,
                    senders: JSON.stringify(mappedSenders),
                    ReferenceNumber: doc.ReferenceNumber,
                    DocumentDate: moment(doc.DocumentDate).format('YYYY/MM/DD')
                }

                console.log('posting DTO ->', DTO)

                API.Records.CreateRecord(DTO).then((r) => {
                    debugger;
                    console.log('CreateRecord(DTO)', r);

                    View.state = AppStates.Normal;
                    View.sequenceCode = r.data.sequenceCode
                    $.sweetModal({
                        content: 'El documento ha sido registrado exitosamente.',
                        icon: $.sweetModal.ICON_SUCCESS
                    });

                    doc.DocumentID = r.data.documentID;
                    doc.SequenceCode = r.data.sequenceCode;

                    $.sweetModal({
                        content: `El registro ha sido creado exitosamente. </br> 
                                  <strong>ID de Registro: ${doc.DocumentID} </strong>. </br>
                                  <strong>Secuencia: ${doc.SequenceCode} </strong>. </br>`,
                        icon: $.sweetModal.ICON_SUCCESS
                    });

                    View.state = AppStates.Submitted;

                }, (e) => {
                    View.state = AppStates.Normal;
                    alert('Oops!, al parecer ha ocurrido un error al intentar registrar el documento.');
                    console.error('Error al registrar documento:', e)
                })
            } catch (e) {
                alert('Oops!, al parecer ha ocurrido un error al intentar registrar el documento.');
                console.error('An error occurred while trying to post the document:', e)
                View.state = AppStates.Normal;
            }
        }
    }
})();
