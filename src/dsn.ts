import fs from 'node:fs';
import readline from 'node:readline';
import { ops } from './utils/ops';
import { workContract } from './utils/workContract';
import { extractionsList } from './utils/extraction';
import { throws } from 'node:assert';
type societyList = society[]
type establishmentList = establishment[]
type dsnList = dsn[]
type mutualList = mutual[]
type mutualEmployeeList = mutualEmployee[]
type contributionFundList = contributionFund[]
type workContractDefinition = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string
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
    name: string,
    value: string,
    date: string
}

type establishmentObject = {
    siren: string,
    nic: string,
    apet: string,
    adress1: string,
    adress2: string,
    adress3: string,
    zipCode: string,
    country: string,
    idcc: string,
    legalStatus: string,
    opco: string,
    city: string,
    date: string
}
type establishment = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    siret: string,
    idEstablishment: number
    date: string
}


type contributionFund = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    idEstablishment: number,
    siret: string,
    date: string
}

type mutual = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    date: string,
}

type mutualEmployee = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    numSS: string,
    date: string
}

type contributionFundObject = {
    codeDsn: string
    name: string,
    adress1: string,
    adress2?: string,
    adress3?: string,
    codeZip: string,
    city: string,
    siret: string,
    date: string
}

type classificationObject = {
    nature: string,
    value: string,
    idcc: string,
}

type mutualObject = {
    contractId?: string,
    organisme?: string,
    delegate?: string,
    covererd?: string,
    techId?: string,
    date: string
}

type mutualEmployeeObject = {
    option: string,
    pop: string,
    children: string,
    assign: string,
    numberAssign: string,
    otherAssign: string,
    idTechAffiliation: string,
    idTech: string,
    date: string
}

type atObject = {
    code: string,
    rate: string,
    idEstablishment: number
}

type employee = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    numSS: string,
    date: string
}

//Norme DSN 2022 = https://www.net-entreprises.fr/media/documentation/dsn-cahier-technique-2022.1.pdf
//NodeJs readline =https://nodejs.org/api/readline.html

export class DsnParser {
    private dsnVersion = ['P22V01']
    private societyList: societyList = []
    private establishmentList: establishmentList = []
    private dsnList: dsnList = []
    private contributionFundList: contributionFundList = []
    private workContractList: workContractDefinition[] = []
    private mutualList: mutualList = []
    private mutualEmployeeList: mutualEmployeeList = []
    private employeeList: employee[] = []
    private numSSList: string[] = []
    private sirenList: string[] = []
    private idEstablishmentList: number[] = []
    private extractions = extractionsList
    private siren: string = ''
    private date = ''
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
        let numSS: string = ''
        let siret = ''
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
                        if (lineSplit[0] === 'S20.G00.05.005') {
                            this.date = value
                        }
                        let addDsn: dsn = {
                            ...findStructure,
                            value: value
                        }
                        this.dsnList.push(addDsn)
                        break
                    case 'Society':
                        if (lineSplit[0] === 'S21.G00.06.001') {
                            this.siren = value
                        }
                        let addRowSociety: society = {
                            ...findStructure,
                            value: value,
                            date: this.date
                        }
                        this.societyList.push(addRowSociety)
                        break
                    case 'Establishment':
                        if (lineSplit[0] === 'S21.G00.11.001') {
                            idEstablishment += 1
                            this.idEstablishmentList.push(idEstablishment)
                            siret = this.siren + value
                        }
                        let addRowEstablishment: establishment = {
                            ...findStructure,
                            value: value,
                            siret,
                            idEstablishment,
                            date: this.date

                        }
                        this.establishmentList.push(addRowEstablishment)
                        break
                    case 'ContributionFund':
                        let addContributionFund = {
                            ...findStructure,
                            value,
                            idEstablishment,
                            siret,
                            date: this.date
                        }
                        this.contributionFundList.push(addContributionFund)

                        break
                    case 'WorkContract':
                        let addRoWWorkContract = {
                            ...findStructure,
                            value,
                            siren: this.siren,
                            date: this.date
                        }
                        this.workContractList.push(addRoWWorkContract)
                        break

                    case 'Mutual':
                        let addMutual = {
                            ...findStructure,
                            value,
                            siren: this.siren,
                            date: this.date

                        }
                        this.mutualList.push(addMutual)
                        break
                    case 'MutualEmployee':
                        let addMutualEmployee = {
                            ...findStructure,
                            numSS,
                            value,
                            siren: this.siren,
                            date: this.date

                        }
                        this.mutualEmployeeList.push(addMutualEmployee)
                        break
                    case 'Employee':
                        if (lineSplit[0] === 'S21.G00.30.001') {
                            numSS = value
                            this.numSSList.push(numSS)
                        }
                        let addEmployee = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date

                        }
                        this.employeeList.push(addEmployee)
                }
            }
        }
        //Delete File 
        if (options.deleteFile) {
            fs.unlinkSync(dir)
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

    get establishment(): establishmentObject[] {
        //idEstablishmentList contient l'ensemble des id établissements qu'on a pu traiter.
        const establishments = []
        for (let idEstablishment of this.idEstablishmentList) {
            let establishmentFilter = this.establishmentList.filter(e => e.idEstablishment === idEstablishment)
            let siren = this.siren
            let nic = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.001')?.value
            let apet = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.002')?.value
            let adress1 = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.003')?.value
            let zipCode = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.004')?.value
            let city = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.005')?.value
            let adress2 = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.006')?.value
            let adress3 = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.007')?.value
            let country = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.015')?.value
            let legalStatus = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.015')?.value
            let idcc = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.022')?.value
            let opco = establishmentFilter.find(e => e.dsnStructure === 'S21.G00.11.023')?.value
            let establishmentObjet: establishmentObject = {
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
            }
            establishments.push(establishmentObjet)

        }
        return establishments
    }


    get contributionFund(): contributionFundObject[] {
        const contributionFundList = []
        for (let idEstablishment of this.idEstablishmentList) {
            let siret = this.establishmentList.find(e => e.idEstablishment === idEstablishment)?.siret
            if (siret) {
                let contributionFundFilter = this.contributionFundList.filter(c => c.idEstablishment === idEstablishment)
                let idDsn = contributionFundFilter.find(c => c.dsnStructure === 'S21.G00.20.001')?.value
                if (idDsn) {
                    const contributionDsn = ops.find(o => o.codeDsn === idDsn)
                    if (contributionDsn) {
                        let contributionFundObject: contributionFundObject = {
                            ...contributionDsn,
                            siret,
                            date: this.date

                        }
                        contributionFundList.push(contributionFundObject)
                    }

                }
            }

        }
        return contributionFundList
    }

    get workContract(): workContractDefinition[] {
        return this.workContractList
    }


}


