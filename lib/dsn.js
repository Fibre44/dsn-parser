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
    bonusList = [];
    establishmentContributionList = [];
    siren = '';
    date = '';
    async asyncInit(dir, options = {
        controleDsnVersion: true,
        deleteFile: false
    }) {
        const fileStream = node_fs_1.default.createReadStream(dir);
        const rl = node_readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        let mutualId = '';
        let idEstablishment = 1;
        let numSS = '';
        let siret = '';
        let employeeId = '';
        let idContribution = '';
        let idBase = '';
        let typeBaseSubject = '';
        const employeeDatas = []; //On va stocker temporairement les valeurs du salarié pour la gestion des NTT
        for await (const line of rl) {
            //let lineSplit = line.split(',\'')
            //Exemple d'une structure S10.G00.00.004,'OK'
            let lineSplit = line.split(`,'`);
            let dsnStructure = lineSplit[0];
            let findStructure = this.extractions.find(d => d.dsnStructure === dsnStructure);
            if (findStructure) {
                //Il faut supprimer les ' qu'on trouve sur la valeur afin de pouvoir la liste
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
                    case 'Mutual':
                        if (lineSplit[0] === 'S21.G00.15.005') {
                            mutualId = value;
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
                        let addMutualEmployee = {
                            ...findStructure,
                            numSS,
                            value,
                            siren: this.siren,
                            date: this.date
                        };
                        this.mutualEmployeeList.push(addMutualEmployee);
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
                        break;
                }
            }
        }
        //Delete File 
        if (options.deleteFile) {
            node_fs_1.default.unlinkSync(dir);
        }
    }
    get dsn() {
        let dsnObject = {};
        for (let dsn of this.dsnList) {
            dsnObject[dsn.field] = dsn.value;
        }
        dsnObject['date'] = this.date;
        return dsnObject;
    }
    get society() {
        let societyObjet = {};
        for (let society of this.societyList) {
            societyObjet[society.field] = society.value;
        }
        societyObjet['date'] = this.date;
        return societyObjet;
    }
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
                workContractObject['date'] = this.date;
                workContractList.push(workContractObject);
            }
        }
        return workContractList;
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
                workStoppingList.push(workStoppingObject);
            }
        }
        return workStoppingList;
    }
    get employeeMutual() {
        const employeesMutualList = [];
        for (let numSS of this.numSSList) {
            let mutualEmployeeFilter = this.mutualEmployeeList.filter(m => m.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (mutualEmployeeFilter && employeeId) {
                let mutualEmployeeObject = {};
                for (let mutualEmployee of mutualEmployeeFilter) {
                    mutualEmployeeObject[mutualEmployee.field] = mutualEmployee.value;
                }
                mutualEmployeeObject['employeeId'] = employeeId.employeeId;
                mutualEmployeeObject['date'] = this.date;
                employeesMutualList.push(mutualEmployeeObject);
            }
        }
        return employeesMutualList;
    }
    get mutual() {
        const mutualList = [];
        for (let mutualId of this.mutualIdList) {
            let mutalFilter = this.mutualList.filter(m => m.techId === mutualId);
            let mutuelObject = {};
            if (mutalFilter) {
                for (let mutual of mutalFilter) {
                    mutuelObject[mutual.field] === mutual.value;
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
                    baseSubjectList.push(baseSubjectObject);
                }
            }
        }
        return baseSubjectList;
    }
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
                if (bonusObject.amountBonus) {
                    bonusList.push(bonusObject);
                }
            }
        }
        return bonusList;
    }
}
exports.DsnParser = DsnParser;
