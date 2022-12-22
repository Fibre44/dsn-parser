import fs from 'node:fs';
import readline from 'node:readline';
import { ops } from './files/ops';
import { workContract } from './files/workContract';
type societyList = society[]
type establishmentList = establishment[]
type dsnList = dsn[]
type classificationList = classification[]

type workContractDefinition = {
    typeOfContract: string,
    NameOfCOntract: string
}

type dsnObject = {
    softwareName: string | undefined,
    provider: string | undefined,
    softwareVersion: string | undefined,
    dsnVersion: string | undefined,
    type: string | undefined,
    totalRows: string | undefined

}
type dsn = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string
}

type societyObject = {
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

type establishmentObject = {
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
type at = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    idEstablishment: number
}
type classification = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    idcc: string
}

type contributionFund = {
    codeDsn: string
    name: string,
    adress1: string,
    adress2?: string,
    adress3?: string,
    codeZip: string,
    city: string,
    idEstablishment?: number
}

type assignementObject = {
    value: string,
}

type classificationObject = {
    nature: string,
    value: string,
    idcc: string,
}
type extractions = extraction[]

type extraction = {
    collection: string,
    field: string,
    dsnStructure: string
}
type atObject = {
    code: string,
    rate: string,
    idEstablishment: number
}
//Norme DSN 2022 = https://www.net-entreprises.fr/media/documentation/dsn-cahier-technique-2022.1.pdf
//NodeJs readline =https://nodejs.org/api/readline.html

export class DsnParser {
    private workContractSet = new Set<string>()
    private contributionFundSet = new Set<{ value: string, idEstablishment: number }>()
    private atSet = new Set<string>()
    private dsnVersion = ['P22V01']
    private societyList: societyList = []
    private establishmentList: establishmentList = []
    private dsnList: dsnList = []
    private classificationList: classificationList = []
    private contributionFundList: contributionFund[] = []
    private workContractList: workContractDefinition[] = []
    private atList: at[] = []

    private extractions: extractions = [
        {
            collection: 'Dsn',
            field: 'softwareName',
            dsnStructure: 'S10.G00.00.001',
        },
        {
            collection: 'Dsn',
            field: 'provider',
            dsnStructure: 'S10.G00.00.002',
        },
        {
            collection: 'Dsn',
            field: 'softwareVersion',
            dsnStructure: 'S10.G00.00.003',
        },
        {
            collection: 'Dsn',
            field: 'dsnVersion',
            dsnStructure: 'S10.G00.00.006',
        },
        {
            collection: 'Dsn',
            field: 'type',
            dsnStructure: 'S10.G00.00.008',
        },
        {
            collection: 'Dsn',
            field: 'totalRows',
            dsnStructure: 'S90.G00.90.001',
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
        {
            collection: 'Classification',
            field: 'AssignmentLabel',
            dsnStructure: 'S21.G00.40.006'
        },
        {
            collection: 'Classification',
            field: 'Echelon',
            dsnStructure: 'S21.G00.40.070'
        },
        {
            collection: 'Classification',
            field: 'Coefficient',
            dsnStructure: 'S21.G00.40.071'
        },
        {
            collection: 'ContributionFund',
            field: 'contributionFund',
            dsnStructure: 'S21.G00.22.001'
        },
        {
            collection: 'WorkContract',
            field: 'typeOfContract',
            dsnStructure: 'S21.G00.40.007'
        },
        {
            collection: 'AT',
            field: 'codeAT',
            dsnStructure: 'S21.G00.40.040'
        },
        {
            collection: 'AT',
            field: 'rateAT',
            dsnStructure: 'S21.G00.40.043'
        },
    ]
    async init(dir: string, options = {
        controleDsnVersion: true,
        deleteFile: false
    }) {
        const fileStream = fs.createReadStream(dir);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        let idEstablishment = 1
        let idcc: string | null = null
        let siren: string | null = null
        for await (const line of rl) {
            let lineSplit = line.split(',\'');
            let dsnStructure = lineSplit[0]
            let findStructure = this.extractions.find(d => d.dsnStructure === dsnStructure)
            if (findStructure) {
                let value = lineSplit[1].replace('\'', '')
                switch (findStructure.collection) {
                    case 'Dsn':
                        if (lineSplit[0] === 'S10.G00.00.006' && options.controleDsnVersion) {
                            const testVersion = this.dsnVersion.find(d => d === value)
                            if (!testVersion) {
                                throw new Error(`La version du fichier DSN n'est pas supportée`)
                            }
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
                        if (line[0] === 'S21.GOO.11.0001') {
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
                    case 'Classification':
                        if (line[0] === 'S21.G00.40.017') {
                            idcc = line[1]
                        }
                        let addClassification: classification = {
                            ...findStructure,
                            value: value,
                            idcc: idcc ? idcc : ''
                        }
                        this.addClassification(addClassification)
                        break
                    case 'ContributionFund':
                        let addContribitionFund = {
                            value,
                            idEstablishment
                        }
                        this.addContributionFund(addContribitionFund)

                        break
                    case 'WorkContract':
                        this.addWorkContract(value)
                        break
                    case 'AT':
                        let addAt: at = {
                            ...findStructure,
                            value,
                            idEstablishment
                        }
                        this.addAt(addAt)
                        break
                }
            }
        }
        //Delete File 
        if (options.deleteFile) {
            fs.unlinkSync(dir)
        }
    }
    private addSociety(row: society): void {
        const findRow = this.societyList.find(r => r?.collection === row.collection && r.field === row.field && r.dsnStructure === row.dsnStructure)
        if (!findRow) {
            this.societyList.push(row)
        }
        return
    }
    private addEstablishment(row: establishment): void {
        const findRow = this.establishmentList.find(r => r?.collection === row.collection && r.field === row.field && r.dsnStructure === row.dsnStructure)
        if (!findRow) {
            this.establishmentList.push(row)
        }
        return
    }
    private addDsn(row: dsn): void {
        const findRow = this.dsnList.find(r => r?.collection === row.collection && r.field === row.field)
        if (!findRow) {
            this.dsnList.push(row)
        }
    }
    private addClassification(row: classification): void {
        const findRow = this.classificationList.find(r => r.collection === row.collection && r.field === row.field && r.value === r.value && r.idcc === r.idcc)
        if (!findRow) {
            this.classificationList.push(row)
        }
    }
    private addAt(row: at): void {
        let uuidAt = row.dsnStructure + row.value + row.idEstablishment
        if (!this.atSet.has(uuidAt)) {
            this.atSet.add(uuidAt)
            this.atList.push(row)
        }
    }
    private addContributionFund(row: { value: string, idEstablishment: number }): void {
        const contributionFundListDefinition: contributionFund[] = ops
        let findContribubtionFund = contributionFundListDefinition.find(c => c.codeDsn === row.value)
        if (findContribubtionFund && !this.contributionFundSet.has(row)) {
            this.contributionFundSet.add(row)
            this.contributionFundList.push(findContribubtionFund)
        }
    }
    private addWorkContract(row: string): void {
        const workContractDefinition: workContractDefinition[] = workContract
        const type: workContractDefinition | undefined = workContractDefinition.find(c => c.typeOfContract === row)
        if (type && !this.workContractSet.has(row)) {
            this.workContractSet.add(row)
            this.workContractList.push(type)
        }

    }
    get dsn(): dsnObject {
        const dsnObject: dsnObject = {
            softwareName: this.dsnList.find(d => d.dsnStructure === 'S10.G00.00.001')?.value,
            provider: this.dsnList.find(d => d.dsnStructure === 'S10.G00.00.002')?.value,
            softwareVersion: this.dsnList.find(d => d.dsnStructure === 'S10.G00.00.003')?.value,
            dsnVersion: this.dsnList.find(d => d.dsnStructure === 'S10.G00.00.006')?.value,
            type: this.dsnList.find(d => d.dsnStructure === 'S10.G00.00.008')?.value,
            totalRows: this.dsnList.find(d => d.dsnStructure === 'S90.G00.90.001')?.value,
        }
        return dsnObject
    }

    get society(): societyObject {
        const societyObjet: societyObject = {
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

    get establishment(): establishmentObject {
        //Attention dans une DSN on peut avoir X établissements
        const establishmentObjet: establishmentObject = {
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
    get at(): atObject[] {
        const codeAtFilter = this.atList.filter(a => a.field === 'codeAT')
        const rateAtFilter = this.atList.filter(a => a.field === 'rateAT')
        const atObjectList: atObject[] = []
        for (let i = 0; i < codeAtFilter.length; i++) {
            let code = codeAtFilter[i]?.value
            let rate = rateAtFilter[i]?.value
            let idEstablishment = rateAtFilter[i]?.idEstablishment
            if (code && rate && idEstablishment) {
                let atObject: atObject = {
                    code,
                    rate,
                    idEstablishment
                }
                atObjectList.push(atObject)
            }

        }
        return atObjectList
    }
    get assignement(): assignementObject[] {
        const classificationsFilter = this.classificationList.filter(c => c.field === 'AssignmentLabel')
        const assignementList: assignementObject[] = []
        classificationsFilter.forEach(c => assignementList.push({
            value: c.value
        }))
        return assignementList
    }

    get classifications(): classificationObject[] {
        const coeffFilter = this.classificationList.filter(c => c.dsnStructure === 'S21.G00.40.071')
        const echelonFilter = this.classificationList.filter(c => c.dsnStructure === 'S21.G00.40.070')
        const allClassList = coeffFilter.concat(echelonFilter)
        const classList: classificationObject[] = []
        for (let classRow of allClassList) {
            let nature
            switch (classRow.dsnStructure) {
                case 'S21.G00.40.071':
                    nature = 'Coefficient'
                    break
                case 'S21.G00.40.070':
                    nature = 'Echelon'
                    break
            }
            classList.push({
                nature: nature ? nature : '',
                value: classRow.value,
                idcc: classRow.idcc,
            })
        }
        return classList
    }

    get contributionFund(): contributionFund[] {
        return this.contributionFundList
    }

    get workContract(): workContractDefinition[] {
        return this.workContractList
    }

}


