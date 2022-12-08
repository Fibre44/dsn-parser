"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DsnParser = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_readline_1 = __importDefault(require("node:readline"));
//Norme DSN 2022 = https://www.net-entreprises.fr/media/documentation/dsn-cahier-technique-2022.1.pdf
//NodeJs readline =https://nodejs.org/api/readline.html
class DsnParser {
    societyList = [];
    establishmentList = [];
    extractions = [
        {
            collection: 'Dsn',
            field: 'version',
            dsnStructure: 'S10.G00.00.006',
        },
        {
            collection: 'Dsn',
            field: 'type',
            dsnStructure: 'S20.G00.05.001',
        },
        {
            collection: 'Society',
            field: 'siren',
            dsnStructure: 'S21.G00.06.001',
        },
        {
            collection: 'Society',
            field: 'nic',
            dsnStructure: 'S21.G00.06.002',
        },
        {
            collection: 'Society',
            field: 'apen',
            dsnStructure: 'S21.G00.06.003',
        },
        {
            collection: 'Society',
            field: 'adress1',
            dsnStructure: 'S21.G00.06.004',
        },
        {
            collection: 'Society',
            field: 'adress2',
            dsnStructure: 'S21.G00.06.007',
        },
        {
            collection: 'Society',
            field: 'adress3',
            dsnStructure: 'S21.G00.06.008',
        },
        {
            collection: 'Society',
            field: 'zipCode',
            dsnStructure: 'S21.G00.06.005',
        },
        {
            collection: 'Society',
            field: 'city',
            dsnStructure: 'S21.G00.06.006',
        },
        {
            collection: 'Society',
            field: 'idcc',
            dsnStructure: 'S21.G00.06.015',
        },
        {
            collection: 'Society',
            field: 'idcc',
            dsnStructure: 'S21.G00.06.015',
        },
        {
            collection: 'Establishment',
            field: 'nic',
            dsnStructure: 'S21.G00.11.001',
        },
        {
            collection: 'Establishment',
            field: 'apet',
            dsnStructure: 'S21.G00.11.002',
        },
        {
            collection: 'Establishment',
            field: 'adress1',
            dsnStructure: 'S21.G00.11.003',
        },
        {
            collection: 'Establishment',
            field: 'codeZip',
            dsnStructure: 'S21.G00.11.004',
        },
        {
            collection: 'Establishment',
            field: 'city',
            dsnStructure: 'S21.G00.11.005',
        },
        {
            collection: 'Establishment',
            field: 'adress2',
            dsnStructure: 'S21.G00.11.006',
        },
        {
            collection: 'Establishment',
            field: 'adress3',
            dsnStructure: 'S21.G00.11.007',
        },
        {
            collection: 'Establishment',
            field: 'country',
            dsnStructure: 'S21.G00.11.015',
        },
        {
            collection: 'Establishment',
            field: 'legalStatus',
            dsnStructure: 'S21.G00.11.017',
        },
        {
            collection: 'Establishment',
            field: 'idcc',
            dsnStructure: 'S21.G00.11.022',
        },
        {
            collection: 'Establishment',
            field: 'opco',
            dsnStructure: 'S21.G00.11.023',
        },
    ];
    async init(dir) {
        const fileStream = node_fs_1.default.createReadStream(dir);
        const rl = node_readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        for await (const line of rl) {
            let siren = null;
            let lineSplit = line.split(',\'');
            let dsnStructure = lineSplit[1];
            let findStructure = this.extractions.find(d => d.dsnStructure === dsnStructure);
            if (findStructure) {
                let value = lineSplit[1].replace('\'', '');
                switch (findStructure.collection) {
                    case 'Society':
                        if (lineSplit[0] === 'S21.G00.06.001') {
                            siren = value;
                        }
                        let addRowSociety = {
                            ...findStructure,
                            value: value
                        };
                        this.addSociety(addRowSociety);
                        break;
                    case 'Establishment':
                        let addRowEstablishment = {
                            ...findStructure,
                            value: value,
                            siren: siren ? siren : ''
                        };
                        this.addEstablishment(addRowEstablishment);
                        break;
                }
                console.log(`Line from file: ${line}`);
            }
        }
    }
    addSociety(row) {
        const findRow = this.societyList.find(r => r?.collection === row.collection && r.field === row.field && r.dsnStructure === row.dsnStructure);
        if (!findRow) {
            this.societyList.push(row);
        }
        return;
    }
    addEstablishment(row) {
        const findRow = this.establishmentList.find(r => r?.collection === row.collection && r.field === row.field && r.dsnStructure === row.dsnStructure);
        if (!findRow) {
            this.establishmentList.push(row);
        }
        return;
    }
    get society() {
        return this.societyList;
    }
    get establishment() {
        return this.establishmentList;
    }
}
exports.DsnParser = DsnParser;
