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
    sirenList = [];
    idEstablishmentList = [];
    extractions = extraction_1.extractionsList;
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
        let idEstablishment = 1;
        let numSS = '';
        let siret = '';
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
                            date: this.date
                        };
                        this.workContractList.push(addRoWWorkContract);
                        break;
                    case 'Mutual':
                        let addMutual = {
                            ...findStructure,
                            value,
                            siren: this.siren,
                            date: this.date
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
                        let addEmployee = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date
                        };
                        this.employeeList.push(addEmployee);
                }
            }
        }
        //Delete File 
        if (options.deleteFile) {
            node_fs_1.default.unlinkSync(dir);
        }
    }
    get dsn() {
        const dsnObject = {
            softwareName: this.dsnList.find(d => d.dsnStructure === 'S10.G00.00.001')?.value,
            provider: this.dsnList.find(d => d.dsnStructure === 'S10.G00.00.002')?.value,
            softwareVersion: this.dsnList.find(d => d.dsnStructure === 'S10.G00.00.003')?.value,
            dsnVersion: this.dsnList.find(d => d.dsnStructure === 'S10.G00.00.006')?.value,
            type: this.dsnList.find(d => d.dsnStructure === 'S10.G00.00.008')?.value,
            totalRows: this.dsnList.find(d => d.dsnStructure === 'S90.G00.90.001')?.value,
        };
        return dsnObject;
    }
    get society() {
        const societyObjet = {
            siren: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.001')?.value,
            nic: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.002')?.value,
            apen: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.003')?.value,
            adress1: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.004')?.value,
            zipCode: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.005')?.value,
            city: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.006')?.value,
            adress2: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.007')?.value,
            adress3: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.008')?.value,
        };
        return societyObjet;
    }
    get establishment() {
        //idEstablishmentList contient l'ensemble des id établissements qu'on a pu traiter.
        const establishments = [];
        for (let idEstablishment of this.idEstablishmentList) {
            let establishmentFilter = this.establishmentList.filter(e => e.idEstablishment === idEstablishment);
            let siren = this.siren;
            let nic = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.001')?.value;
            let apet = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.002')?.value;
            let adress1 = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.003')?.value;
            let zipCode = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.004')?.value;
            let city = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.005')?.value;
            let adress2 = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.006')?.value;
            let adress3 = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.007')?.value;
            let country = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.015')?.value;
            let legalStatus = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.015')?.value;
            let idcc = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.022')?.value;
            let opco = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.023')?.value;
            let establishmentObjet = {
                siren: siren,
                nic: nic ? nic : '',
                apet: apet ? apet : '',
                adress1: adress1 ? adress1 : '',
                zipCode: zipCode ? zipCode : '',
                city: city ? city : '',
                adress2: adress2 ? adress2 : '',
                adress3: adress3 ? adress3 : '',
                country: country ? country : '',
                legalStatus: legalStatus ? legalStatus : '',
                idcc: idcc ? idcc : '',
                opco: opco ? opco : '',
                date: this.date
            };
            establishments.push(establishmentObjet);
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
    get workContract() {
        return this.workContractList;
    }
}
exports.DsnParser = DsnParser;
