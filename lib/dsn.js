"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DsnParser = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_readline_1 = __importDefault(require("node:readline"));
const ops_1 = require("./utils/ops");
const extraction_1 = require("./utils/extraction");
//Norme DSN 2022 = https://www.net-entreprises.fr/media/documentation/dsn-cahier-technique-2022.1.pdf
//NodeJs readline =https://nodejs.org/api/readline.html
class DsnParser {
    dsnVersion = ['P22V01', 'P23V01'];
    societyList = [];
    establishmentList = [];
    dsnList = [];
    statementList = [];
    contributionFundList = [];
    workContractList = [];
    mutualList = [];
    mutualEmployeeList = [];
    employeeList = [];
    numSSList = [];
    idEstablishmentList = [];
    extractions = extraction_1.extractionsList;
    mutualIdList = [];
    baseList = [];
    baseSubjectList = [];
    numSSEmployeeIdList = [];
    contributionList = [];
    workStoppingList = [];
    aggregateContributionList = [];
    bonusList = [];
    establishmentContributionList = [];
    changeWorkContractList = [];
    payroolList = [];
    otherPaymentList = [];
    individualPayementList = [];
    contactList = [];
    siren = '';
    date = '';
    contactIdList = [];
    aggregateContributionIdList = [];
    senderList = [];
    contactSenderList = [];
    specificBankDetailsList = [];
    async asyncInit(dir, options = {
        controleDsnVersion: true,
        deleteFile: false
    }) {
        const fileStream = node_fs_1.default.createReadStream(dir);
        const rl = node_readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        let mutualId = 0;
        let idEstablishment = 1;
        let numSS = '';
        let siret = '';
        let employeeId = '';
        let idContribution = '';
        let idBase = '';
        let typeBaseSubject = '';
        let contractId = '';
        let optionIdMutual = '';
        let aggregateContributionId = '';
        const employeeDatas = []; //On va stocker temporairement les valeurs du salarié pour la gestion des NTT
        const mutualEmployeeTmp = [];
        let contactId = 0;
        for await (const line of rl) {
            //let lineSplit = line.split(',\'')
            //Exemple d'une structure S10.G00.00.004,'OK'
            let lineSplit = line.split(`,'`);
            let dsnStructure = lineSplit[0];
            let findStructure = this.extractions.find(d => d.dsnStructure === dsnStructure);
            if (findStructure) {
                //Il faut supprimer les ' qu'on trouve sur la valeur afin de pouvoir la lire
                let value = lineSplit[1].replace(/'/g, "");
                switch (findStructure.collection) {
                    case 'Dsn':
                        if (lineSplit[0] === 'S10.G00.00.006' && options.controleDsnVersion) {
                            const testVersion = this.dsnVersion.find(d => d === value);
                            if (!testVersion) {
                                throw new Error(`La version du fichier DSN n'est pas supportée`);
                            }
                        }
                        if (lineSplit[0] === 'S20.G00.05.005') {
                            this.date = value;
                        }
                        let addDsn = {
                            ...findStructure,
                            value: value
                        };
                        this.dsnList.push(addDsn);
                        break;
                    case 'Statement':
                        let addRowStatement = {
                            ...findStructure,
                            value
                        };
                        this.statementList.push(addRowStatement);
                        break;
                    case 'Society':
                        if (lineSplit[0] === 'S21.G00.06.001') {
                            this.siren = value;
                        }
                        let addRowSociety = {
                            ...findStructure,
                            value: value,
                            date: this.date
                        };
                        this.societyList.push(addRowSociety);
                        break;
                    case 'Sender':
                        let addRowSender = {
                            ...findStructure,
                            value: value,
                            date: this.date
                        };
                        this.senderList.push(addRowSender);
                        break;
                    case 'ContactSender':
                        let addRowContactSender = {
                            ...findStructure,
                            value: value,
                            date: this.date
                        };
                        this.contactSenderList.push(addRowContactSender);
                        break;
                    case 'Contact':
                        if (lineSplit[0] === 'S20.G00.07.001') {
                            contactId += 1;
                            this.contactIdList.push(contactId);
                        }
                        let addRowContact = {
                            ...findStructure,
                            value: value,
                            id: contactId
                        };
                        this.contactList.push(addRowContact);
                        break;
                    case 'Establishment':
                        if (lineSplit[0] === 'S21.G00.11.001') {
                            idEstablishment += 1;
                            this.idEstablishmentList.push(idEstablishment);
                            siret = this.siren + value;
                        }
                        let addRowEstablishment = {
                            ...findStructure,
                            value: value,
                            siret,
                            idEstablishment,
                            date: this.date
                        };
                        this.establishmentList.push(addRowEstablishment);
                        break;
                    case 'specificBankDetails':
                        let addRowSpecificBankDetails = {
                            ...findStructure,
                            value,
                            siret,
                        };
                        this.specificBankDetailsList.push(addRowSpecificBankDetails);
                        break;
                    case 'AggregateContribution':
                        if (lineSplit[0] === 'S21.G00.23.001') {
                            aggregateContributionId = value;
                            this.aggregateContributionIdList.push(aggregateContributionId);
                        }
                        let addRowAggregate = {
                            ...findStructure,
                            value: value,
                            siret,
                            idEstablishment,
                            aggregateContributionId,
                            date: this.date
                        };
                        this.aggregateContributionList.push(addRowAggregate);
                        break;
                    case 'ContributionFund':
                        let addContributionFund = {
                            ...findStructure,
                            value,
                            idEstablishment,
                            siret,
                            date: this.date
                        };
                        this.contributionFundList.push(addContributionFund);
                        break;
                    case 'WorkContract':
                        if (lineSplit[0] === 'S21.G00.40.009') {
                            contractId = value;
                        }
                        let addRoWWorkContract = {
                            ...findStructure,
                            value,
                            siren: this.siren,
                            date: this.date,
                            numSS,
                            siret
                        };
                        this.workContractList.push(addRoWWorkContract);
                        break;
                    case 'ChangWorkContract':
                        let addRowChangWorkContract = {
                            ...findStructure,
                            value,
                            siren: this.siren,
                            date: this.date,
                            siret,
                            numSS,
                            contractId
                        };
                        this.changeWorkContractList.push(addRowChangWorkContract);
                        break;
                    case 'Mutual':
                        if (lineSplit[0] === 'S21.G00.15.001') {
                            mutualId += 1;
                            this.mutualIdList.push(mutualId);
                        }
                        let addMutual = {
                            ...findStructure,
                            value,
                            date: this.date,
                            techId: mutualId
                        };
                        this.mutualList.push(addMutual);
                        break;
                    case 'MutualEmployee':
                        /**
                         * S21.G00.70.013 contient permet de faire le lien avec la structure S15
                         * Attention pour la première valeur elle n'est pas connu
                         * Le premier segment est toujours S21.G00.70.04 le dernier est S21.G00.70.13
                        */
                        //Si on trouve S21.G00.70.04 et optionIdMutual est vide alors on est sur la première ligne du salarié.
                        if (lineSplit[0] === 'S21.G00.70.004') {
                            //Début d'une nouvelle affiliation
                            //Remise à 0 du tableau
                            let lenMutualEmployeeTmp = mutualEmployeeTmp.length;
                            mutualEmployeeTmp.splice(0, lenMutualEmployeeTmp);
                            optionIdMutual = '';
                        }
                        //On ajoute la valeur
                        let addMutualEmployee = {
                            ...findStructure,
                            numSS,
                            value,
                            optionIdMutual,
                            siren: this.siren,
                            date: this.date
                        };
                        mutualEmployeeTmp.push(addMutualEmployee);
                        if (lineSplit[0] === 'S21.G00.70.013') {
                            //Fin d'une affiliation
                            optionIdMutual = value;
                            //on va ajouter l'option Id sur les autres enregistrements
                            for (let mutualEmployeeTmpValue of mutualEmployeeTmp) {
                                mutualEmployeeTmpValue.optionIdMutual = optionIdMutual;
                            }
                            //on ajouter les informations 
                            this.mutualEmployeeList.push(...mutualEmployeeTmp);
                        }
                        break;
                    case 'WorkStopping':
                        let addWorkStopping = {
                            ...findStructure,
                            numSS,
                            value,
                            siren: this.siren,
                            date: this.date
                        };
                        this.workStoppingList.push(addWorkStopping);
                        break;
                    case 'Employee':
                        //Si le salarié a un NTT on aura pas la structure S21.G00.30.001
                        //Il faut pouvoir remettre à blanc numSS. Si le numéro SS à déjà un contrat de travail ca signifie qu'on traite un nouveau salarié
                        //Pour un salarié qui n'a pas de numSS on commence par S21.G00.30.002
                        const findNumSSWorkContract = this.workContractList.find(contract => contract.numSS === numSS);
                        if (findNumSSWorkContract) {
                            numSS = '';
                            employeeDatas.splice(0, employeeDatas.length);
                        }
                        if (lineSplit[0] === 'S21.G00.30.001') {
                            numSS = value;
                            this.numSSList.push(numSS);
                        }
                        if (numSS) {
                            if (lineSplit[0] === 'S21.G00.30.019') {
                                employeeId = value;
                                this.numSSEmployeeIdList.push({
                                    numSS,
                                    employeeId
                                });
                            }
                            let addEmployee = {
                                ...findStructure,
                                value,
                                numSS,
                                siren: this.siren,
                                date: this.date
                            };
                            this.employeeList.push(addEmployee);
                        }
                        else {
                            //Gestion avec un NTT on doit attendre la structure S21.G00.30.020
                            let datas = {
                                ...findStructure,
                                value
                            };
                            employeeDatas.push(datas);
                            if (lineSplit[0] === 'S21.G00.30.019') {
                                employeeId = value;
                            }
                            if (lineSplit[0] === 'S21.G00.30.020') {
                                numSS = value;
                                this.numSSList.push(numSS);
                                this.numSSEmployeeIdList.push({
                                    numSS,
                                    employeeId
                                });
                                employeeDatas.forEach(employee => this.employeeList.push({
                                    ...employee,
                                    siren: this.siren,
                                    date: this.date,
                                    numSS
                                }));
                            }
                        }
                        break;
                    case 'Bonus':
                        let addBonus = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date
                        };
                        this.bonusList.push(addBonus);
                        break;
                    case 'Base':
                        if (lineSplit[0] === 'S21.G00.78.001') {
                            idBase = value;
                        }
                        let addBase = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date,
                            idBase
                        };
                        this.baseList.push(addBase);
                        break;
                    case 'BaseSubject':
                        if (lineSplit[0] === 'S21.G00.79.001') {
                            typeBaseSubject = value;
                        }
                        let addBaseSubject = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date,
                            typeBaseSubject
                        };
                        this.baseSubjectList.push(addBaseSubject);
                        break;
                    case 'Contribution':
                        if (lineSplit[0] === 'S21.G00.81.001') {
                            idContribution = value;
                        }
                        let addContribution = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date,
                            idContribution,
                            siret
                        };
                        this.contributionList.push(addContribution);
                        break;
                    case 'IndividualPayment':
                        let addIndividualPayement = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date,
                            contractId
                        };
                        this.individualPayementList.push(addIndividualPayement);
                        break;
                    case 'Payrool':
                        let addPayrool = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date,
                            contractId
                        };
                        this.payroolList.push(addPayrool);
                        break;
                    case 'OtherPayment':
                        let otherPayment = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date,
                            contractId
                        };
                        this.otherPaymentList.push(otherPayment);
                        break;
                    case 'EstablishmentContribution':
                        let addEstablishementContrubution = {
                            ...findStructure,
                            value,
                            siren: this.siren,
                            date: this.date
                        };
                        this.establishmentContributionList.push(addEstablishementContrubution);
                        break;
                    default:
                        throw new Error(`Le code collection n'existe pas`);
                }
            }
        }
        //Delete File 
        if (options.deleteFile) {
            node_fs_1.default.unlinkSync(dir);
        }
    }
    /**
     * Retourne les informations de base de la DSN bloc S10.G00.00
     */
    get dsn() {
        let dsnObject = {};
        for (let dsn of this.dsnList) {
            dsnObject[dsn.field] = dsn.value;
        }
        dsnObject['date'] = this.date;
        return dsnObject;
    }
    /**
     * Retourne les informations du bloc S20.G00.05
     */
    get statement() {
        let statementObject = {};
        for (let statement of this.statementList) {
            statementObject[statement.field] = statement.value;
        }
        statementObject['date'] = this.date;
        return statementObject;
    }
    /**
     * Retourne les informations du bloc S10.G00.01
     */
    get sender() {
        let senderObject = {};
        for (let sender of this.senderList) {
            senderObject[sender.field] = sender.value;
        }
        senderObject['date'] = this.date;
        return senderObject;
    }
    /**
     * Retourne les informations du bloc S10.G00.02
     */
    get contactSender() {
        let contactSenderObject = {};
        for (let contactSender of this.contactSenderList) {
            contactSenderObject[contactSender.field] = contactSender.value;
        }
        contactSenderObject['date'] = this.date;
        return contactSenderObject;
    }
    /**
     * Retourne les informations du bloc S21.G00.12
     */
    get specificBankDetails() {
        const specificBankDetailsObjectList = [];
        const establishmentList = this.establishment;
        for (let establishment of establishmentList) {
            let specificBankDetailsObject = {};
            let siret = establishment.siren + establishment.nic;
            let specificBankDetailsFilter = this.specificBankDetailsList.filter(spec => spec.siret === siret);
            if (specificBankDetailsFilter) {
                for (let specificBankDetails of specificBankDetailsFilter) {
                    specificBankDetailsObject[specificBankDetails.field] = specificBankDetails.value;
                }
                specificBankDetailsObject['date'] = this.date;
                specificBankDetailsObjectList.push(specificBankDetailsObject);
            }
        }
        return specificBankDetailsObjectList;
    }
    /**
     * Retourne les informations de la société bloc S21.G00.06
     */
    get society() {
        let societyObjet = {};
        for (let society of this.societyList) {
            societyObjet[society.field] = society.value;
        }
        societyObjet['date'] = this.date;
        return societyObjet;
    }
    /**
     * Retourne la liste des établissements de la DSN bloc S21.G00.11
     */
    get establishment() {
        //idEstablishmentList contient l'ensemble des id établissements qu'on a pu traiter.
        const establishments = [];
        for (let idEstablishment of this.idEstablishmentList) {
            let establishmentObject = {};
            let establishmentFilter = this.establishmentList.filter(e => e.idEstablishment === idEstablishment);
            for (let establishment of establishmentFilter) {
                establishmentObject[establishment.field] = establishment.value;
            }
            establishmentObject['date'] = this.date;
            establishments.push(establishmentObject);
        }
        return establishments;
    }
    /**
     * Retourne la liste des organismes sociaux
     */
    get contributionFund() {
        const contributionFundList = [];
        for (let idEstablishment of this.idEstablishmentList) {
            let siret = this.establishmentList.find(e => e.idEstablishment === idEstablishment)?.siret;
            if (siret) {
                let contributionFundFilter = this.contributionFundList.filter(c => c.idEstablishment === idEstablishment);
                let idDsn = contributionFundFilter.find(c => c.dsnStructure === 'S21.G00.20.001')?.value;
                if (idDsn) {
                    const contributionDsn = ops_1.ops.find(o => o.codeDsn === idDsn);
                    if (contributionDsn) {
                        let contributionFundObject = {
                            ...contributionDsn,
                            siret,
                            date: this.date
                        };
                        contributionFundList.push(contributionFundObject);
                    }
                }
            }
        }
        return contributionFundList;
    }
    /**
     * Retourne la liste des employés bloc S21.G00.30
     */
    get employee() {
        const employeeList = [];
        for (let numSS of this.numSSList) {
            let employeeFilter = this.employeeList.filter(e => e.numSS === numSS);
            if (employeeFilter) {
                let employeeObject = {};
                for (let employee of employeeFilter) {
                    employeeObject[employee.field] = employee.value;
                }
                employeeObject['date'] = this.date;
                employeeList.push(employeeObject);
            }
        }
        return employeeList;
    }
    /**
     * Retourne les cotisations agrégée bloc S21.G00.23
     */
    get aggregateContribution() {
        const aggregateContributionList = [];
        //On filtre par établissement
        for (let idEstablishment of this.idEstablishmentList) {
            let aggregateContributionFilterEstablishment = this.aggregateContributionList.filter(aggregate => aggregate.idEstablishment === idEstablishment);
            //On tourne par cotisation
            for (let aggregateContributionId of this.aggregateContributionIdList) {
                let aggregateContributionFilter = aggregateContributionFilterEstablishment.filter(contributionId => contributionId.aggregateContributionId === aggregateContributionId);
                let siret = aggregateContributionFilter[0].siret;
                let aggregateContributionRow = {};
                for (let aggregateContribution of aggregateContributionFilter) {
                    aggregateContributionRow[aggregateContribution.field] = aggregateContribution.value;
                }
                aggregateContributionRow['date'] = this.date;
                aggregateContributionRow['siret'] = siret;
                aggregateContributionList.push(aggregateContributionRow);
            }
        }
        return aggregateContributionList;
    }
    /**
     * Retourne la liste des contacts de la DSN structure S20.G00.007
     */
    get contact() {
        const contactList = [];
        for (let contactId of this.contactIdList) {
            let contactListFilter = this.contactList.filter(contact => contact.id === contactId);
            let contactObject = {};
            for (let contact of contactListFilter) {
                contactObject[contact.field] = contact.value;
            }
            contactObject['siren'] = this.siren;
            contactObject['date'] = this.date;
            contactList.push(contactObject);
        }
        return contactList;
    }
    /**
     * Retourne la liste des contrats de travails bloc S21.G00.40
     */
    get workContract() {
        const workContractList = [];
        for (let numSS of this.numSSList) {
            let workContractFilter = this.workContractList.filter(w => w.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (workContractFilter && employeeId) {
                let workContractObject = {};
                for (let workContract of workContractFilter) {
                    workContractObject[workContract.field] = workContract.value;
                }
                workContractObject['employeeId'] = employeeId.employeeId;
                workContractObject['numSS'] = employeeId.numSS;
                workContractObject['date'] = this.date;
                workContractList.push(workContractObject);
            }
        }
        return workContractList;
    }
    get changWorkContract() {
        const changeWorkContractList = [];
        for (let numSS of this.numSSList) {
            let changeWorkContractFilter = this.changeWorkContractList.filter(contract => contract.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (changeWorkContractFilter.length > 0 && employeeId) {
                let changeWorContractObject = {};
                for (let change of changeWorkContractFilter) {
                    changeWorContractObject[change.field] = change.value;
                }
                changeWorContractObject['employeeId'] = employeeId.employeeId;
                changeWorContractObject['date'] = this.date;
                changeWorContractObject['numSS'] = employeeId.numSS;
                changeWorkContractList.push(changeWorContractObject);
            }
        }
        return changeWorkContractList;
    }
    get workStopping() {
        const workStoppingList = [];
        for (let numSS of this.numSSList) {
            let workStoppingFilter = this.workStoppingList.filter(workStopping => workStopping.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (workStoppingFilter.length != 0 && employeeId) {
                let workStoppingObject = {};
                for (let workStopping of workStoppingFilter) {
                    workStoppingObject[workStopping.field] = workStopping.value;
                }
                workStoppingObject['employeeId'] = employeeId.employeeId;
                workStoppingObject['date'] = this.date;
                workStoppingObject['numSS'] = employeeId.numSS;
                workStoppingList.push(workStoppingObject);
            }
        }
        return workStoppingList;
    }
    get employeeMutual() {
        const employeesMutualList = [];
        const employeesMutualListComplete = [];
        const mutualList = this.mutual;
        //On se place sur un salarié
        for (let numSS of this.numSSList) {
            let mutualEmployeeFilter = this.mutualEmployeeList.filter(m => m.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (employeeId) {
                //Un salarié peut avoir X contrats de mutuelles
                for (let mutualIdEstablishment of this.mutualIdList) {
                    let mutualIdEstablishmentString = String(mutualIdEstablishment);
                    let employeeMutualIdFilter = mutualEmployeeFilter.filter(mutualId => mutualId.optionIdMutual === mutualIdEstablishmentString);
                    //On boucle sur le contrat de mutuelle
                    if (employeeMutualIdFilter.length > 0) {
                        let mutualEmployeeObject = {};
                        for (let mutualEmployee of employeeMutualIdFilter) {
                            mutualEmployeeObject[mutualEmployee.field] = mutualEmployee.value;
                        }
                        mutualEmployeeObject['employeeId'] = employeeId.employeeId;
                        mutualEmployeeObject['date'] = this.date;
                        mutualEmployeeObject['numSS'] = employeeId.numSS;
                        mutualEmployeeObject['idTechAffiliationMutual'] = mutualIdEstablishmentString;
                        employeesMutualList.push(mutualEmployeeObject);
                    }
                }
            }
        }
        //Dans la DSN les éléments sont stockés dans les blocs S15
        for (let mutualEmployeeDetail of employeesMutualList) {
            let mutualFilter = mutualList.find(mutual => mutual.techId === mutualEmployeeDetail.idTechAffiliationMutual);
            if (mutualFilter) {
                let mutualEmployeeRowComplete = {
                    ...mutualEmployeeDetail,
                    ...mutualFilter
                };
                employeesMutualListComplete.push(mutualEmployeeRowComplete);
            }
        }
        return employeesMutualListComplete;
    }
    get mutual() {
        const mutualList = [];
        for (let mutualId of this.mutualIdList) {
            let mutalFilter = this.mutualList.filter(m => m.techId === mutualId);
            let mutuelObject = {};
            if (mutalFilter) {
                for (let mutual of mutalFilter) {
                    mutuelObject[mutual.field] = mutual.value;
                }
                mutuelObject['date'] = this.date;
                mutualList.push(mutuelObject);
            }
        }
        return mutualList;
    }
    get base() {
        const baseList = [];
        const setIdBase = new Set();
        const filterIdBase = this.baseList.filter(c => c.field === 'idBase');
        filterIdBase.forEach(c => setIdBase.has(c.value) ? '' : setIdBase.add(c.value));
        //On tourne par salarié
        for (let numSS of this.numSSList) {
            let baseEmployeeFilter = this.baseList.filter(m => m.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (baseEmployeeFilter && employeeId) {
                //On filtre sur une base 
                for (let idBase of setIdBase) {
                    let employeeBase = baseEmployeeFilter.filter(e => e.idBase === idBase);
                    let baseObject = {};
                    for (let base of employeeBase) {
                        baseObject[base.field] = base.value;
                    }
                    baseObject['employeeId'] = employeeId.employeeId;
                    baseObject['date'] = this.date;
                    baseObject['numSS'] = employeeId.numSS;
                    baseList.push(baseObject);
                }
            }
        }
        return baseList;
    }
    get baseSubject() {
        const baseSubjectList = [];
        const setTypeBaseSubject = new Set();
        const filterTypeBaseSubject = this.baseSubjectList.filter(c => c.field === 'typeBaseSubject');
        filterTypeBaseSubject.forEach(c => setTypeBaseSubject.has(c.value) ? '' : setTypeBaseSubject.add(c.value));
        //On tourne par salarié
        for (let numSS of this.numSSList) {
            let baseEmployeeFilter = this.baseSubjectList.filter(m => m.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (baseEmployeeFilter && employeeId) {
                //On filtre sur une base 
                for (let typeBaseSubject of setTypeBaseSubject) {
                    let employeeBase = baseEmployeeFilter.filter(e => e.typeBaseSubject === typeBaseSubject);
                    let baseSubjectObject = {};
                    for (let base of employeeBase) {
                        baseSubjectObject[base.field] = base.value;
                    }
                    baseSubjectObject['employeeId'] = employeeId.employeeId;
                    baseSubjectObject['date'] = this.date;
                    baseSubjectObject['numSS'] = employeeId.numSS;
                    baseSubjectList.push(baseSubjectObject);
                }
            }
        }
        return baseSubjectList;
    }
    /**
     *    get establishmentContribution(): EstablishmentContributionObject[] {
        const establishmentContributionList: EstablishmentContributionObject[] = []

        for (let establishmentContribution of this.establishmentContributionList) {

        }

        return establishmentContributionList
    }
     */
    get contribution() {
        const contributionList = [];
        const setIdContribution = new Set();
        const filterIdContribution = this.contributionList.filter(c => c.field === 'idContribution');
        filterIdContribution.forEach(c => setIdContribution.has(c.value) ? '' : setIdContribution.add(c.value));
        //On tourne par salarié
        for (let numSS of this.numSSList) {
            let contributionEmployeeFilter = this.contributionList.filter(m => m.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (contributionEmployeeFilter && employeeId) {
                //On tourne par code de cotisation
                for (let contributionId of setIdContribution) {
                    let employeeContribution = contributionEmployeeFilter.filter(e => e.idContribution === contributionId);
                    let contributionObject = {};
                    //On alimente la cotisation
                    for (let contribution of employeeContribution) {
                        contributionObject[contribution.field] = contribution.value;
                    }
                    contributionObject['employeeId'] = employeeId.employeeId;
                    contributionObject['date'] = this.date;
                    contributionObject['numSS'] = employeeId.numSS;
                    contributionList.push(contributionObject);
                }
            }
        }
        return contributionList;
    }
    get assignement() {
        const assignementList = [];
        const assignementFilter = this.workContractList.filter(a => a.field === 'employmentLabel');
        const assignementSet = new Set();
        for (let assignement of assignementFilter) {
            if (!assignementSet.has(assignement.value)) {
                assignementSet.add(assignement.value);
                let assignementObject = {};
                assignementObject[assignement.field] = assignement.value;
                assignementObject['date'] = this.date;
                assignementList.push(assignementObject);
            }
        }
        return assignementList;
    }
    get rateMobility() {
        //Attention la structure idInsee est avant le taux. 
        const rateMobilityList = [];
        const idInseeList = [];
        const setInsee = new Set();
        const setRateMobility = new Set();
        for (let contribution of this.contributionList) {
            //IdInsee est avant le taux
            let idInsee = contribution.field === 'idInsee' ? contribution.value : undefined;
            let rateMobility = contribution.field === 'rateContribution' && contribution.idContribution === '081' ? contribution.value : undefined;
            if (idInsee) {
                if (!setInsee.has(idInsee)) {
                    setInsee.add(idInsee);
                    idInseeList.push(idInsee);
                }
            }
            if (rateMobility) {
                let siret = contribution.siret;
                let date = contribution.date;
                let lastIdInsee = idInseeList.reverse();
                let concatIdInseeRate = `${lastIdInsee[0]}-${rateMobility}`;
                if (!setRateMobility.has(concatIdInseeRate)) {
                    setRateMobility.add(concatIdInseeRate);
                    rateMobilityList.push({
                        rate: rateMobility,
                        insee: lastIdInsee[0],
                        siret,
                        date
                    });
                }
            }
        }
        return rateMobilityList;
    }
    get rateAt() {
        /**
         * Les taux AT sont dans les contrats de travail field: 'rateAt',
         * Les codes risques sont dans  field: 'idWorkAccidentRisk',
         */
        const rateAtList = [];
        const setIdWorkAccidentRisk = new Set();
        const setRateAt = new Set();
        const setIdWorkAccidentRiskList = [];
        for (let at of this.workContractList) {
            let siret = at.siret;
            let date = at.date;
            let idWorkAccidentRisk = at.field === 'idWorkAccidentRisk' ? at.value : undefined;
            let rateAT = at.field === 'rateAt' ? at.value : undefined;
            if (idWorkAccidentRisk) {
                if (!setIdWorkAccidentRisk.has(idWorkAccidentRisk)) {
                    setIdWorkAccidentRisk.add(idWorkAccidentRisk);
                    setIdWorkAccidentRiskList.push(idWorkAccidentRisk);
                }
            }
            if (rateAT) {
                let lastIdWorkAccidentRisk = setIdWorkAccidentRiskList.reverse();
                let concatLastIdWorkAccidentRiskRateAt = `${lastIdWorkAccidentRisk[0]}-${rateAT})`;
                if (!setRateAt.has(concatLastIdWorkAccidentRiskRateAt)) {
                    setRateAt.add(concatLastIdWorkAccidentRiskRateAt);
                    rateAtList.push({
                        code: lastIdWorkAccidentRisk[0],
                        rate: rateAT,
                        siret,
                        date
                    });
                }
            }
        }
        return rateAtList;
    }
    get extraction() {
        return this.extractions;
    }
    get bonus() {
        const bonusList = [];
        //On tourne par salarié
        for (let numSS of this.numSSList) {
            let bonusEmployeeFilter = this.bonusList.filter(m => m.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (bonusEmployeeFilter && employeeId) {
                let bonusObject = {};
                for (let bonus of bonusEmployeeFilter) {
                    bonusObject[bonus.field] = bonus.value;
                }
                bonusObject['employeeId'] = employeeId.employeeId;
                bonusObject['date'] = this.date;
                bonusObject['numSS'] = employeeId.numSS;
                if (bonusObject.amountBonus) {
                    bonusList.push(bonusObject);
                }
            }
        }
        return bonusList;
    }
    get individualPayment() {
        const individualPaymentList = [];
        for (let numSS of this.numSSList) {
            let individualPaymentFilter = this.individualPayementList.filter(payment => payment.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (individualPaymentFilter && employeeId) {
                let individualPaymentObject = {};
                for (let invidualPayment of individualPaymentFilter) {
                    individualPaymentObject[invidualPayment.field] = invidualPayment.value;
                }
                individualPaymentObject['employeeId'] = employeeId.employeeId;
                individualPaymentObject['numSS'] = employeeId.numSS;
                individualPaymentObject['date'] = this.date;
                individualPaymentList.push(individualPaymentObject);
            }
        }
        return individualPaymentList;
    }
    get payrool() {
        const payroolList = [];
        for (let numSS of this.numSSList) {
            let payroolFilter = this.payroolList.filter(payrool => payrool.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (payroolFilter && employeeId) {
                let payroolObject = {};
                for (let payrool of payroolFilter) {
                    payroolObject[payrool.field] = payrool.value;
                }
                payroolObject['employeeId'] = employeeId.employeeId;
                payroolObject['numSS'] = employeeId.numSS;
                payroolObject['date'] = this.date;
                payroolList.push(payroolObject);
            }
        }
        return payroolList;
    }
    get otherPayment() {
        const otherPaymentList = [];
        for (let numSS of this.numSSList) {
            let otherPaymentList = this.otherPaymentList.filter(other => other.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (otherPaymentList && employeeId) {
                let otherObject = {};
                for (let other of otherPaymentList) {
                    otherObject[other.field] = other.value;
                }
                otherObject['employeeId'] = employeeId.employeeId;
                otherObject['numSS'] = employeeId.numSS;
                otherObject['date'] = this.date;
                otherPaymentList.push(otherObject);
            }
        }
        return otherPaymentList;
    }
    get smartExtraction() {
        const sender = this.sender;
        const contactSender = this.contactSender;
        const employeesList = this.employee;
        const workContractsList = this.workContract;
        const mutualEmployeeList = this.employeeMutual;
        const contactList = this.contact;
        const aggregateContribution = this.aggregateContribution;
        const dsn = this.dsn;
        const statement = this.statement;
        const society = this.society;
        const establishmentsList = this.establishment;
        const specificBankDetails = this.specificBankDetails;
        //const establishmentsContributionList = this.establishmentContribution
        const workChangeContractsList = this.changWorkContract;
        const workStoppingList = this.workStopping;
        const bonusList = this.bonus;
        const smartEmployeeList = [];
        //Consolidation des données salariés
        for (let employee of employeesList) {
            let workContractFilter = workContractsList.filter(work => work.employeeId === employee.employeeId);
            let mutualFilter = mutualEmployeeList.filter(mutual => mutual.employeeId === employee.employeeId);
            let workContractChangeFilter = workChangeContractsList.filter(change => change.employeeId === employee.employeeId);
            let workStoppingFilter = workStoppingList.filter(stopping => stopping.employeeId === employee.employeeId);
            let bonusFilter = bonusList.filter(bonus => bonus.employeeId === employee.employeeId);
            let employeeWorkContract = [];
            for (let workContract of workContractFilter) {
                let changeList = workContractChangeFilter.filter(change => change.contractId === workContract.contractId);
                let workContractRow = {
                    ...workContract,
                    change: [...changeList]
                };
                employeeWorkContract.push(workContractRow);
            }
            let employeeRow = {
                ...employee,
                workContracts: [...employeeWorkContract],
                workStopping: [...workStoppingFilter],
                mutual: [...mutualFilter],
                bonus: [...bonusFilter]
            };
            smartEmployeeList.push(employeeRow);
        }
        //On ajoute les cotisations aux établissements
        const smartEstablishmentList = [];
        for (let establishment of establishmentsList) {
            let siret = society.siren + establishment.nic;
            let specificBankDetailsEstablishment = specificBankDetails.find(specEstablishement => specEstablishement.siret === siret);
            let aggregateContributionFilter = aggregateContribution.filter(aggregate => aggregate.siret === siret);
            let smartEstablishment = {
                ...establishment,
                aggreagreContribution: [...aggregateContributionFilter],
                specificBankDetails: specificBankDetailsEstablishment
            };
            smartEstablishmentList.push(smartEstablishment);
        }
        const smartDsn = {
            dsn,
            statement,
            sender: {
                ...sender,
                contactSender
            },
            contact: [...contactList],
            society: {
                ...society,
                establishments: [
                    ...smartEstablishmentList
                ]
            },
            employees: [...smartEmployeeList]
        };
        return smartDsn;
    }
}
exports.DsnParser = DsnParser;
