//< !--AUTHOR: Brawny Javier Mateo Reyes-- >
(function () {
    'use strict';
    angular
        .module('MicmApp')
        .controller('InternalRegistController', InternalRegistController);

    InternalRegistController.$inject = ['$scope', 'API'];

    function InternalRegistController($scope, API) {

        const vm = this;
        vm.showNewLabel = new Date() < new Date("2019-03-22T13:10:31.575Z");
        vm.showAdresseesAddform = true;

        const RecordTypes = {
            Enviados: 2,
            Recibidos: 3
        }
        vm.RecordType = RecordTypes.Enviados;
        vm.RecordTypes = RecordTypes;
        vm.AddresseeTypes = [{ Type: 'Destinatario', Id: 1 }, { Type: 'Copia', Id: 2 }, { Type: 'Via', Id: 3 }, { Type: 'Atencion', Id: 4 }];
        vm.showAdresseesAddform = true;
        vm.NewAddressee = {};
        vm.NewSender = {};
        vm.files = [];
        vm.showSendersAddform = true;

        console.log(vm)
        const AppStates = {
            Loading: 2,
            Normal: 3,
            LoadingDocTypes: 4,
            Submitted: 5
        };
        vm.States = AppStates;
        vm.state = AppStates.Normal;
        vm.newDocument = {
            addressees: [],
            senders: []
        };
        vm.state = AppStates.Normal;
        vm.states = AppStates;


        vm.AddSender = (sender) => {
            console.log('Adding sender', sender)
            vm.newDocument.senders = vm.newDocument.senders || [];
            const newsender = $.extend(true, {}, sender);
            vm.newDocument.senders.push(newsender);
            vm.NewSender = {};
            vm.NewSender = vm.NewAddressee = {};
            vm.showSendersAddform = false;
            vm.Remitente_Actors.Store = [];
            vm.Remitente_Actors.SelectedValue = null;
        }
        vm.DeleteSender = (sender) => {
            vm.newDocument.senders = vm.newDocument.senders || [];
            vm.newDocument.senders = _.without(vm.newDocument.senders, sender);
            vm.NewSender = {};
        }
        vm.addAddressee = (NewAddressee) => {
            $scope.$safeApply(() => {
                vm.newDocument.addressees = vm.newDocument.addressees || [];
                const newAdrsee = $.extend(true, {}, NewAddressee);
                vm.newDocument.addressees.push(newAdrsee);
                vm.NewSender = vm.NewAddressee = null;
                vm.showAdresseesAddform = false;
                vm.NewAddressee = {};
                vm._Actors.Store = [];
                vm._Actors.SelectedValue = null;
                console.log('newAdrsee', newAdrsee)
            });
        }
        vm.DeleteAddressee = (Addressee) => {
            vm.newDocument.addressees = vm.newDocument.addressees || [];
            vm.newDocument.addressees = _.without(vm.newDocument.addressees, Addressee);
        }
        vm.LoadDocumentTypes = () => {
            vm.state = AppStates.LoadingDocTypes;
            API.DocumentTypes.GetByRecordType(vm.RecordType).then((r) => {
                console.log(r)
                vm.DocumentTypes = r.data;
                vm.state = AppStates.Normal;
            });
        }



        vm._Actors = {
            Store: [],
            SelectedValue: null,
            onTextChange: (text, isRemitente) => {
                if (!text) return;
                if (isRemitente) {
                    API.Actor.GetActors(text).then(r => {
                        console.warn('data', r);
                        // si es remitente, solo puede ser del ministerio.
                        vm._Actors.Store = _(r.data).filter(t => t.departmentID);
                    });
                } else {
                    API.Actor.GetActors(text).then(r => {
                        console.warn('data', r)
                        vm._Actors.Store = r.data;
                    });
                }
            },
            LookupText: '',
            onItemChange: (item, isRemitente) => {
                if (!item) return;

                //vm.NewSender.names = item.names;
                //vm.NewSender.lastNames = item.lastNames;
                //vm.NewSender.actorID = item.actorID;
                //vm.Departments.Departments = [{
                //    departmentName: item.departmentName,
                //    departmentID: item.departmentID
                //}];
                //vm.NewSender.area = vm.Departments.Departments[0];
                ////////////////////
                console.log('ITEM CHANGE', item);
                vm.NewAddressee.names = item.names;
                vm.NewAddressee.lastNames = item.lastNames;
                vm.NewAddressee.actorID = item.actorID;
                if (item.institutionID) {
                    vm.NewAddressee.origin = 3;
                    vm.Institutions.InstitutionsStore = [{
                        institutionID: item.institutionID,
                        institutionName: item.institution
                    }];
                    vm.NewAddressee.institution = vm.Institutions.InstitutionsStore[0];
                }
                if (item.departmentID) {
                    vm.NewAddressee.origin = 2;
                    vm.Departments.Departments = [{
                        departmentName: item.departmentName,
                        departmentID: item.departmentID
                    }];
                    vm.NewAddressee.area = vm.Departments.Departments[0];
                }
                //vm.NewAddressee.names = item.names;

                vm.NewAddressee.REUSED_SOURCE = item;

                vm._Actors.Store = [];
            }
        }


        vm.Remitente_Actors = {
            Store: [],
            SelectedValue: null,
            onTextChange: (text, isRemitente) => {
                if (!text) return;

                API.Actor.GetActors(text).then(r => {
                    console.warn('data', r);
                    // si es remitente, solo puede ser del ministerio.
                    vm.Remitente_Actors.Store = _(r.data).filter(t => t.departmentID);
                });

            },
            LookupText: '',
            onItemChange: (item, isRemitente) => {
                if (!item) return;

                vm.NewSender.names = item.names;
                vm.NewSender.lastNames = item.lastNames;
                vm.NewSender.actorID = item.actorID;
                vm.Departments.Departments = [{
                    departmentName: item.departmentName,
                    departmentID: item.departmentID
                }];
                vm.NewSender.area = vm.Departments.Departments[0];
            }
        }

        vm.Institutions = {
            InstitutionsStore: [],
            onTextChange: (searchTermn) => {
                try {
                    API.Institutions.GetInstitutions(searchTermn).then((r) => {
                        console.warn('r', r)
                        vm.Institutions.InstitutionsStore = r.data.data;
                    }, (e) => onErrorOccurred(e));
                } catch (e) {
                    console.error('Could not fetch Institutions for >"' + searchTermn + '"<')
                }
            },
            LookUpText: '',
            cacheDisabled: true,
            selectedTitle: null
        }
        vm.Departments = {
            Departments: [],
            onTextChange: (searchTermn) => {
                try {
                    API.Departments.GetDepartments(searchTermn).then((r) => {
                        console.warn('r', r)
                        vm.Departments.Departments = r.data;
                    }, (e) => onErrorOccurred(e));
                } catch (e) {
                    console.error('Could not fetch Departments for >"' + searchTermn + '"<')
                }
            },
            LookUpText: '',
            cacheDisabled: true,
            selectedTitle: null
        };
        vm.SENDER_Departments = {
            Departments: [],
            onTextChange: (searchTermn) => {
                try {
                    API.Departments.GetDepartments(searchTermn).then((r) => {
                        console.warn('r', r)
                        vm.SENDER_Departments.Departments = r.data;
                    }, (e) => onErrorOccurred(e));
                } catch (e) {
                    console.error('Could not fetch Departments for >"' + searchTermn + '"<')
                }
            },
            LookUpText: '',
            cacheDisabled: true,
            selectedTitle: null
        };

        vm.Actors = {
            Actors: [],
            LookUpText: '',
            cacheDisabled: true,
            selectedTitle: null,
            onTextChange: (searchTermn) => {

            }
        }


        vm.submit = (doc) => {   
            vm.state = AppStates.Loading;
            try {
                // Retrives intitutionID or departmentID from objects
                const mappedAddressees = $.map(doc.addressees, (ads) => {
                    if (ads.actorID) return { type: ads.type, actorID: ads.actorID }
                    return {
                        names: ads.names,
                        lastNames: ads.lastNames,
                        type: ads.type,
                        institutionID: (ads.institution) ? ads.institution.institutionID : null,
                        departmentID: (ads.area) ? ads.area.departmentID : null,
                        actorID: ads.actorID
                    }
                });
                // Retrives departmentID from object
                const mappedSenders = $.map(doc.senders, (ads) => {
                    if (ads.actorID) return { actorID: ads.actorID }
                    return {
                        names: ads.names,
                        lastNames: ads.lastNames,
                        departmentID: (ads.area) ? ads.area.departmentID : null
                    }
                });

                console.log('doc ->', doc, 'files ->', vm.files);

                const DTO = {
                    DocumentTypeID: doc.DocumentType,
                    annexes: vm.newDocument.annexes,
                    subject: vm.newDocument.subject,
                    files: vm.files,
                    addressees: JSON.stringify(mappedAddressees),
                    senders: JSON.stringify(mappedSenders)
                }

                console.log('posting DTO ->', DTO)

                API.Records.CreateRecord(DTO).then((r) => {
                
                    console.log('CreateRecord(DTO)', r);

                    vm.state = AppStates.Normal;

                    doc.DocumentID = r.data.documentID;
                    doc.SequenceCode = r.data.sequenceCode;

                    $.sweetModal({
                        content: `El registro ha sido creado exitosamente. </br> 
                                  <strong>ID de Registro: ${doc.DocumentID} </strong>. </br>
                                  <strong>Secuencia: ${doc.SequenceCode} </strong>. </br>`,
                        icon: $.sweetModal.ICON_SUCCESS
                    });




                    vm.state = AppStates.Submitted;

                }, (e) => {
                    vm.state = AppStates.Normal;
                    alert('Oops!, al parecer ha ocurrido un error al intentar registrar el documento.');
                    console.error('Error al registrar documento:', e)
                })
            } catch (e) {
                alert('Oops!, al parecer ha ocurrido un error al intentar registrar el documento.');
                console.error('An error occurred while trying to post the document:', e)
                vm.state = AppStates.Normal;
            }
        }
    }
})();
