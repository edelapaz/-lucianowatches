//< !--AUTHOR: Brawny Javier Mateo Reyes-- >
(function () {
    'use strict';

    angular
        .module('MicmApp')
        .controller('DocumentController', InternalRegistController);

    InternalRegistController.$inject = ['$scope', 'API', '$routeParams', '$sce', '$mdDialog'];

    function InternalRegistController($scope, API, $routeParams, $sce, $mdDialog) {
        const View = this;
        const AppStates = {
            Loading: 2,
            Normal: 3,
            LoadingDocTypes: 4,
            Submitted: 5,
            DownloadingViewModel: 6
        };
        View.state = AppStates.DownloadingViewModel;
        View.DocumentSequence = $routeParams.SequenceCode;

        API.Records.GetDocumentBySequenceCode(View.DocumentSequence)
            .then((r) => {
                View.Document = r.data;

                if (r.data.documentDate)
                    r.data.documentDate = new Date(r.data.documentDate);


                View.RecordType = r.data.recordTypeID;
                View.state = AppStates.Normal;
                console.log('R', r)
            });

        View.formatDate = (date) => {
            return moment.utc(date).local().format('DD/MMMM/YYYY, hh:mm a');
        }
        View.openArchive = (archive) => {       
            API.Files.GET(archive.archiveID).then((r) => {             
                const file = new Blob([r.data], { type: archive.contentType });
                const FileUrl = URL.createObjectURL(file);
                View.File = {
                    Content: $sce.trustAsResourceUrl(FileUrl),
                    Type: archive.contentType,
                    FileName: archive.fileName + archive.fileExtension,
                    Download: () => window.open('/File/' + archive.archiveID)
                };
            }, (e) => {
                console.error('File error', e)
            })
        }

        View.DownloadArchive = (archive) => {
            window.open('/File/' + archive.archiveID);
        }
        View.DeleteArchive = (archive) => {
            console.log(archive)
            $.sweetModal.confirm('Eliminar archivo "' + archive.fileName + archive.fileExtension + '"',
                `¿Estás Segur@ que deseas borrar el archivo "${archive.fileName + archive.fileExtension}"?, </br> esta acción no podrá ser revertida...`,
                function () {
                    $scope.$safeApply(() => {
                        API.Files.DeleteFile(archive.archiveID).then(() => {
                            View.Document.archives = _.without(View.Document.archives, archive);
                            $.sweetModal({
                                content: 'El archivo fue eliminado.',
                                icon: $.sweetModal.ICON_SUCCESS
                            });
                        })
                    });
                });
        }
        View.AddresseeTypes = [{ Type: 'Destinatario', Id: 1 }, { Type: 'Copia', Id: 2 }, { Type: 'Via', Id: 3 }, { Type: 'Atencion', Id: 4 }];
        View.showAdresseesAddform = true;
        View.NewAddressee = {};
        View.NewSender = {};
        View.files = [];
        View.showSendersAddform = true;

        console.log(View)

        View.States = AppStates;

        View.newDocument = {
            addressees: [],
            senders: []
        };

        View.states = AppStates;


        View.AddSender = (sender) => {
            console.log('Adding sender', sender)
            View.Document.senders = View.Document.senders || [];
            const newsender = $.extend(true, { state: 'added' }, sender);
            View.Document.senders.push(newsender);
            View.NewSender = {};
            View.showSendersAddform = false;
        }

        View.addAddressee = (NewAddressee) => {
            $scope.$safeApply(() => {
                View.Document.addressees = View.Document.addressees || [];
                const newAdrsee = $.extend(true, { state: 'added' }, NewAddressee);
                View.Document.addressees.push(newAdrsee);
                NewAddressee = {};
                View.showAdresseesAddform = false;
                View.NewAddressee = {};
                console.log('newAdrsee', newAdrsee)
            });
        }
        View.DeleteAddressee = (Addressee) => {
            const Remove = () => {
                View.Document.addressees = View.Document.addressees || [];
                View.Document.addressees = _.without(View.Document.addressees, Addressee);
            }
            if (Addressee.documentActorID)
                API.Records.DeleteDocumentActor(Addressee.documentActorID)
                    .then((r) => {
                        console.log(r)
                        Remove()
                    }, (e) => {
                        alert('Ha ocurrido un error al intentar eliminar el destinatario.');
                    });
            else Remove();

        }

        View.DeleteSender = (sender) => {
            const Remove = () => {
                View.Document.senders = View.Document.senders || [];
                View.Document.senders = _.without(View.Document.senders, sender);
            }
            if (sender.documentActorID)
                API.Records.DeleteDocumentActor(sender.documentActorID)
                    .then((r) => {
                        console.log(r)
                        Remove()
                    }, (e) => {
                        alert('Ha ocurrido un error al intentar eliminar el remitente.');
                    });
            else Remove()
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
        //View.Institutions = {
        //    InstitutionsStore: [],
        //    onTextChange: (searchTermn) => {
        //        try {
        //            API.Institutions.GetInstitutions(searchTermn).then((r) => {
        //                console.warn('r', r)
        //                View.Institutions.InstitutionsStore = r.data;
        //            }, (e) => onErrorOccurred(e));
        //        } catch (e) {
        //            console.error('Could not fetch Institutions for >"' + searchTermn + '"<')
        //        }
        //    },
        //    LookUpText: '',
        //    cacheDisabled: true,
        //    selectedTitle: null
        //}
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
        View.SENDER_Departments = {
            Departments: [],
            onTextChange: (searchTermn) => {
                try {
                    API.Departments.GetDepartments(searchTermn).then((r) => {
                        console.warn('r', r)
                        View.SENDER_Departments.Departments = r.data;
                    }, (e) => onErrorOccurred(e));
                } catch (e) {
                    console.error('Could not fetch Departments for >"' + searchTermn + '"<')
                }
            },
            LookUpText: '',
            cacheDisabled: true,
            selectedTitle: null
        };
        View.submit = (doc) => {
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

                const DTO = {
                    DocumentTypeID: doc.DocumentType,
                    annexes: View.newDocument.annexes,
                    subject: View.newDocument.subject,
                    files: View.files,
                    addressees: JSON.stringify(mappedAddressees),
                    senders: JSON.stringify(mappedSenders)
                }

                console.log('posting DTO ->', DTO)

                API.Records.CreateRecord(DTO).then((r) => {
                 
                    console.log('CreateRecord(DTO)', r);

                    View.state = AppStates.Normal;

                    $.sweetModal({
                        content: 'El documento ha sido registrado exitosamente.',
                        icon: $.sweetModal.ICON_SUCCESS
                    });

                    doc.DocumentID = r.data.documentID;
                    doc.SequenceCode = r.data.sequenceCode;


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


        View.UpdateDocument = (doc, ev) => {

            const confirm = $mdDialog.confirm()
                .title('¿Actualizamos este registro?')
                .textContent(`Esta acción no podrá ser revertida.`)
                .targetEvent(ev)
                .ok('Actualizar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                console.log('doc.senders', doc.senders)
            
                View.state = AppStates.Loading;

                try {
                    // Retrives intitutionID or departmentID from objects filtered by the new ones (added)
                    const mappedAddressees = $.map(_.where(doc.addressees, { state: 'added' }), (ads) => {
                        return {
                            names: ads.names,
                            lastNames: ads.lastNames,
                            type: ads.type,
                            institutionID: (ads.institution) ? ads.institution.institutionID : null,
                            departmentID: (ads.area) ? ads.area.departmentID : null
                        }
                    });
                    // Retrives departmentID from object
                    const mappedSenders = $.map(_.where(doc.senders, { state: 'added' }), (ads) => {
                        return {
                            names: ads.names,
                            lastNames: ads.lastNames,
                            departmentID: (ads.area) ? ads.area.departmentID : null,
                            institutionID: (ads.institution) ? ads.institution.institutionID : null
                        }
                    });

                    console.log('doc ->', doc, 'files ->', View.files);

                    const DTO = {
                        annexes: View.Document.annexes,
                        subject: View.Document.subject,
                        files: View.files,
                        addressees: JSON.stringify(mappedAddressees),
                        senders: JSON.stringify(mappedSenders),
                        DocumentDate: moment(doc.documentDate).format('YYYY/MM/DD'),
                        ReferenceNumber: doc.referenceNumber
                    }




                    console.log('posting DTO ->', DTO)

                    API.Records.UpdateDocument(doc.documentID, DTO).then((r) => {
                        angular.forEach(doc.senders, (s) => { s.state = 0 });
                        angular.forEach(doc.addressees, (s) => { s.state = 0 });
                        View.state = AppStates.Normal;
                        window.location.reload();
                    }, (e) => {
                        View.state = AppStates.Normal;
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.body))
                                .clickOutsideToClose(true)
                                .title('Lo sentimos, ha ocurrido un error.')
                                .textContent('Inténtalo una vez más, si este error persiste, comunicate con la Dirección de Tecnología.')
                                .ok('Cerrar')
                                .targetEvent(ev)
                        );
                        console.error('Ha ocurrido un error al intentar actualizar el registro, Detalles:', e)
                    });

                } catch (e) {
                    alert('Oops!, al parecer ha ocurrido un error al intentar registrar el documento.');
                    console.error('An error occurred while trying to post the document:', e)
                    View.state = AppStates.Normal;
                }

                console.log('Doc ->>>>>>>', doc)
                console.log('View.files ->>>>>>>', View.files)
            });


        }
    }
})();
