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
    dsnVersion = ['P22V01'];
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
    numSSEmployeeIdList = [];
    contributionList = [];
    establishmentContributionList = [];
    siren = '';
    date = '';
    async init(dir, options = {
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
        for await (const line of rl) {
            let lineSplit = line.split(',\'');
            let dsnStructure = lineSplit[0];
            let findStructure = this.extractions.find(d => d.dsnStructure === dsnStructure);
            if (findStructure) {
                let value = lineSplit[1].replace('\'', '');
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
                            numSS
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
                    case 'Employee':
                        if (lineSplit[0] === 'S21.G00.30.001') {
                            numSS = value;
                            this.numSSList.push(numSS);
                        }
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
                        break;
                    case 'Base':
                        let addBase = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date
                        };
                        this.baseList.push(addBase);
                        break;
                    case 'Contribution':
                        let addContribution = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date
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
        return dsnObject;
    }
    get society() {
        let societyObjet = {};
        for (let society of this.societyList) {
            societyObjet[society.field] = society.value;
        }
        return societyObjet;
    }
    get establishment() {
        //idEstablishmentList contient l'ensemble des id établissements qu'on a pu traiter.
        const establishments = [];
        for (let idEstablishment of this.idEstablishmentList) {
            let obj = new Object();
            let establishmentFilter = this.establishmentList.filter(e => e.idEstablishment === idEstablishment);
            for (let establishment of establishmentFilter) {
                obj[establishment.field] = establishment.value;
            }
            establishments.push(obj);
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
                workContractList.push(workContractObject);
            }
        }
        return workContractList;
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
                mutualList.push(mutuelObject);
            }
        }
        return mutualList;
    }
    get base() {
        const baseList = [];
        for (let numSS of this.numSSList) {
            let baseEmployeeFilter = this.baseList.filter(m => m.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (baseEmployeeFilter && employeeId) {
                let baseObject = {};
                for (let base of baseEmployeeFilter) {
                    baseObject[base.field] = base.value;
                }
                baseObject['employeeId'] = employeeId.employeeId;
                baseList.push(baseObject);
            }
        }
        return baseList;
    }
    get contribution() {
        const contributionList = [];
        for (let numSS of this.numSSList) {
            let contributionEmployeeFilter = this.baseList.filter(m => m.numSS === numSS);
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS);
            if (contributionEmployeeFilter && employeeId) {
                let contributionObject = {};
                for (let contribution of contributionEmployeeFilter) {
                    contributionObject[contribution.field] = contribution.value;
                }
                contributionObject['employeeId'] = employeeId.employeeId;
                contributionList.push(contributionObject);
            }
        }
        return contributionList;
    }
}
exports.DsnParser = DsnParser;
