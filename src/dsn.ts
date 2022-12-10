import { throws } from 'node:assert';
import fs from 'node:fs';
import readline from 'node:readline';

type societyList = society[]
type establishmentList = establishment[]
type dsnList = dsn[]

type dsnObject = {
    softwareName: string | undefined,
    provider: string | undefined,
    softwareVersion: string | undefined,
    dsnVersion: string | undefined,
    type: string | undefined,

}
type dsn = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string
}

type societyObjet = {
    siren: string | undefined,
    nic: string | undefined,
    apen: string | undefined,
    adress1: string | undefined,
    adress2: string | undefined,
    adress3: string | undefined,
    zipCode: string | undefined,
    city: string | undefined
}

type society = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string
}

type establishmentObjet = {
    siren: string | undefined,
    nic: string | undefined,
    apet: string | undefined,
    adress1: string | undefined,
    adress2: string | undefined,
    adress3: string | undefined,
    zipCode: string | undefined,
    country: string | undefined,
    idcc: string | undefined,
    legalStatus: string | undefined,
    opco: string | undefined,
    city: string | undefined,
    idEstablishment: number | undefined
}
type establishment = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    idEstablishment: number
}
type extractions = extraction[]

type extraction = {
    collection: string,
    field: string,
    dsnStructure: string
}
//Norme DSN 2022 = https://www.net-entreprises.fr/media/documentation/dsn-cahier-technique-2022.1.pdf
//NodeJs readline =https://nodejs.org/api/readline.html

export class DsnParser {
    private societyList: societyList = []
    private establishmentList: establishmentList = []
    private dsnList: dsnList = []
    private extractions: extractions = [
        {
            collection: 'Dsn',
            field: 'softwareName',
            dsnStructure: 'S20.G00.05.001',
        },
        {
            collection: 'Dsn',
            field: 'provider',
            dsnStructure: 'S20.G00.05.002',
        },
        {
            collection: 'Dsn',
            field: 'softwareVersion',
            dsnStructure: 'S20.G00.05.003',
        },
        {
            collection: 'Dsn',
            field: 'dsnVersion',
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
    ]
    async init(dir: string) {
        const fileStream = fs.createReadStream(dir);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        for await (const line of rl) {
            let siren: string | null = null
            let lineSplit = line.split(',\'');
            let dsnStructure = lineSplit[0]
            let findStructure = this.extractions.find(d => d.dsnStructure === dsnStructure)
            let idEstablishment = 0
            if (findStructure) {
                let value = lineSplit[1].replace('\'', '')
                switch (findStructure.collection) {
                    case 'Dsn':
                        if (lineSplit[0] === 'S21.G00.06.001') {
                            siren = value
                        }
                        let addDsn: dsn = {
                            ...findStructure,
                            value: value
                        }
                        this.addDsn(addDsn)
                        break
                    case 'Society':
                        if (lineSplit[0] === 'S21.G00.06.001') {
                            siren = value
                        }
                        let addRowSociety: society = {
                            ...findStructure,
                            value: value
                        }
                        this.addSociety(addRowSociety)
                        break
                    case 'Establishment':
                        if (line[0] === 'S.21.GOO.11.0001') {
                            idEstablishment += 1
                        }
                        let addRowEstablishment: establishment = {
                            ...findStructure,
                            value: value,
                            siren: siren ? siren : '',
                            idEstablishment
                        }
                        this.addEstablishment(addRowEstablishment)
                        break

                }

                console.log(`Line from file: ${line}`);

            }
        }
    }
    addSociety(row: society): void {
        const findRow = this.societyList.find(r => r?.collection === row.collection && r.field === row.field && r.dsnStructure === row.dsnStructure)
        if (!findRow) {
            this.societyList.push(row)
        }
        return
    }
    addEstablishment(row: establishment): void {
        const findRow = this.establishmentList.find(r => r?.collection === row.collection && r.field === row.field && r.dsnStructure === row.dsnStructure)
        if (!findRow) {
            this.establishmentList.push(row)
        }
        return
    }
    addDsn(row: dsn): void {
        const findRow = this.dsnList.find(r => r?.collection === row.collection && r.field === row.field)
        if (!findRow) {
            this.dsnList.push(row)
        }
    }

    get dsn(): dsnObject {
        const dsnObject: dsnObject = {
            softwareName: this.dsnList.find(d => d.dsnStructure === 'S20.G00.05.001')?.value,
            provider: this.dsnList.find(d => d.dsnStructure === 'S20.G00.05.002')?.value,
            softwareVersion: this.dsnList.find(d => d.dsnStructure === 'S20.G00.05.003')?.value,
            dsnVersion: this.dsnList.find(d => d.dsnStructure === 'S20.G00.05.006')?.value,
            type: this.dsnList.find(d => d.dsnStructure === 'S20.G00.05.008')?.value,
        }
        return dsnObject
    }

    get society(): societyObjet {
        const societyObjet: societyObjet = {
            siren: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.001')?.value,
            nic: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.002')?.value,
            apen: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.003')?.value,
            adress1: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.004')?.value,
            zipCode: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.005')?.value,
            city: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.006')?.value,
            adress2: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.007')?.value,
            adress3: this.societyList.find(s => s.dsnStructure === 'S21.G00.06.008')?.value,
        }
        return societyObjet
    }

    get establishment(): establishmentObjet {
        //Attention dans une DSN on peut avoir X établissements
        const establishmentObjet: establishmentObjet = {
            siren: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.001')?.siren,
            nic: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.001')?.value,
            apet: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.002')?.value,
            adress1: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.003')?.value,
            zipCode: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.004')?.value,
            city: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.005')?.value,
            adress2: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.006')?.value,
            adress3: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.007')?.value,
            country: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.015')?.value,
            legalStatus: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.015')?.value,
            idcc: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.022')?.value,
            opco: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.023')?.value,
            idEstablishment: this.establishmentList.find(e => e.dsnStructure === 'S21.G00.11.001')?.idEstablishment
        }
        return establishmentObjet
    }

}

