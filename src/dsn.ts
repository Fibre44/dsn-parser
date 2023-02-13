import fs from 'node:fs';
import readline from 'node:readline';
import { ops } from './utils/ops';
import { workContract } from './utils/workContract';
import { extractionsList, field } from './utils/extraction';
type societyList = Society[]
type establishmentList = Establishment[]
type dsnList = Dsn[]
type mutualList = Mutual[]
type mutualEmployeeList = MutualEmployee[]
type contributionFundList = ContributionFund[]
type baseList = Base[]
type baseSubjectList = BaseSubject[]
type contributionList = Contribution[]
type establishmentContributionList = EstablishmentContribution[]
type WorkStoppingList = WorkStopping[]
type workContractDefinition = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    numSS: string,
    siren: string,
    date: string,
    siret: string
}

export type DsnObject = {
    softwareName: string,
    provider: string,
    softwareVersion: string,
    dsnVersion: string,
    type: string,
    totalRows: string,
    month: string

}
type Dsn = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string
}

export type SocietyObject = {
    siren: string,
    nic: string,
    apen: string,
    adress1: string,
    adress2?: string,
    adress3?: string,
    zipCode: string,
    city: string,
    date: string
}

export type EmployeeObject = {
    numSS: string,
    lastname: string,
    surname: string,
    firstname: string,
    sex: string,
    birthday: string,
    placeOfBith: string,
    address1: string,
    codeZip: string,
    city: string,
    country: string,
    codeZipBith: string,
    countryBirth: string,
    address2?: string,
    address3?: string,
    email?: string,
    employeeId: string,
    graduate?: string,
    studies?: string,
    date: string,
    ntt?: string

}

export type WorkStoppingObject = {
    reasonStop: string,
    lastDayWorked: string,
    estimatedEndDate: string,
    subrogation?: string,
    subrogationStartDate?: string,
    subrogationEndDate?: string,
    iban?: string,
    bic?: string,
    recoveryDate?: string,
    reasonRecovery?: string,
    dateWorkAccident?: string,
    SIRETCentralizer?: string
}

export type WorkContractObject = {
    employeeId: string,
    startDate: string,
    status: string,
    retirement: string,
    pcs: string,
    pcsBis: string,
    employmentLabel: string,
    contract: string,
    publicDispPolitic: string,
    contractEndDate: string,
    DNACodeUnitTime: string,
    DSNWorkQuotaEstablishment: string,
    DSNWorkQuotaWorkContract: string,
    workTime: string,
    ss: string,
    idcc: string,
    mal: string,
    estabWorkPlace: string,
    vieillesse: string,
    pattern: string,
    vacation: string,
    rateProfessionalFess: string,
    foreigner: string,
    exclusionDsn: string,
    statusEmployment: string,
    unemployment: string,
    idPublicEmployer: string,
    methodUnemployment: string,
    joiningDate: string,
    denunciationDate: string,
    dateManagementAgreement: string,
    idAgreement: string,
    healthRiskDelegate: string,
    multipleJobCode: string,
    multipleEmployerCode: string,
    workAccidentRisk: string,
    idWorkAccidentRisk: string,
    positionCollectiveAgreement: string,
    apecita: string,
    rateAt: string,
    contributingFullTime: string,
    tip: string,
    useEstablishmentId: string,
    livePerfomances: string,
    licences: string,
    showId: string,
    showrunner: string,
    fpPcs?: string,
    typePosition?: string,
    fpQuotite?: string,
    partTimeWork?: string,
    serviceCode?: string,
    fpIndice?: string,
    fpIndiceMaj?: string,
    NBI?: string,
    indiceOriginal?: string,
    article15?: string,
    oldEstablishment?: string,
    oldIndice?: string,
    SPP?: string,
    contractual?: string,
    secondment?: string,
    browsing?: string,
    activityDutyRate?: string,
    payLevel?: string,
    echelon?: string,
    coefficient?: string,
    boeth: string,
    addPublicPolicy?: string,
    arrangement?: string,
    finaly?: string,
    navy?: string,
    cnieg?: string,
    activityRate?: string,
    grade?: string,
    cti?: string,
    finess?: string,
    date: string


}
type Society = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    date: string
}

export type EstablishmentObject = {
    siren: string,
    nic: string,
    apet: string,
    adress1: string,
    adress2?: string,
    adress3?: string,
    zipCode: string,
    country: string,
    idcc: string,
    legalStatus: string,
    opco: string,
    codeZip: string
    city: string,
    date: string
}
type Establishment = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    siret: string,
    idEstablishment: number
    date: string
}


export type ContributionFund = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    idEstablishment: number,
    siret: string,
    date: string
}

type Mutual = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    date: string,
    techId: string
}

type MutualEmployee = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    numSS: string,
    date: string
}


export type ContributionFundObject = {
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


export type MutualObject = {
    contractId?: string,
    organisme?: string,
    delegate?: string,
    covererd?: string,
    techId?: string,
    date: string
}

export type MutualEmployeeObject = {
    employeeId: string,
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

export type atObject = {
    code: string,
    rate: string,
    siret: string,
    date: string
}

type Employee = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    numSS: string,
    date: string
}

export type BaseObject = {
    employeeId: string,
    idBase: string,
    startDate: string,
    endDate: string,
    amount: string,
    idTechAff?: string,
    idContract?: string,
    crm?: string,
    date: string
}

export type BaseSubjectObject = {
    employeeId: string,
    typeBaseSubject: string,
    amountBaseSubject: string,
    crmBaseSubject?: string,
    date: string
}


type Base = {

    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    numSS: string,
    date: string,
    idBase: string
}

type BaseSubject = {

    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    numSS: string,
    typeBaseSubject: string
    date: string,
}

export type ContributionObject = {
    employeeId: string,
    idContribution: string,
    ops: string,
    baseContribution: string,
    amountContribution: string,
    idInsee?: string,
    crmContribution?: string,
    rateContribution?: string,
    date: string
}

type Contribution = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    numSS: string,
    date: string,
    idContribution: string,
    siret: string
}

export type EstablishmentContributionObject = {
    codeContribution: string,
    startDat: string,
    endDate: string,
    ref?: string,
    crm?: string,
    date: string
}

type EstablishmentContribution = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    date: string
}

type WorkStopping = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    date: string,
    numSS: string,
}

type NumSSEmployeeId = {
    numSS: string,
    employeeId: string
}

type AssignementObject = {
    assignement: string,
    date: string
}

export type MobilityObject = {
    rate: string,
    insee: string
}

//Norme DSN 2022 = https://www.net-entreprises.fr/media/documentation/dsn-cahier-technique-2022.1.pdf
//NodeJs readline =https://nodejs.org/api/readline.html

export class DsnParser {
    private dsnVersion = ['P22V01', 'P23V01']
    private societyList: societyList = []
    private establishmentList: establishmentList = []
    private dsnList: dsnList = []
    private contributionFundList: contributionFundList = []
    private workContractList: workContractDefinition[] = []
    private mutualList: mutualList = []
    private mutualEmployeeList: mutualEmployeeList = []
    private employeeList: Employee[] = []
    private numSSList: string[] = []
    private idEstablishmentList: number[] = []
    private extractions = extractionsList
    private mutualIdList: string[] = []
    private baseList: baseList = []
    private baseSubjectList: baseSubjectList = []
    private numSSEmployeeIdList: NumSSEmployeeId[] = []
    private contributionList: contributionList = []
    private workStoppingList: WorkStoppingList = []
    private establishmentContributionList: establishmentContributionList = []
    private siren: string = ''
    private date = ''
    async asyncInit(dir: string, options = {
        controleDsnVersion: true,
        deleteFile: false
    }) {
        const fileStream = fs.createReadStream(dir);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        let mutualId = ''
        let idEstablishment = 1
        let numSS = ''
        let siret = ''
        let employeeId = ''
        let idContribution = ''
        let idBase = ''
        let typeBaseSubject = ''
        const employeeDatas = []//On va stocker temporairement les valeurs du salarié pour la gestion des NTT
        for await (const line of rl) {
            //let lineSplit = line.split(',\'')
            //Exemple d'une structure S10.G00.00.004,'OK'
            let lineSplit = line.split(`,'`);
            let dsnStructure = lineSplit[0]
            let findStructure = this.extractions.find(d => d.dsnStructure === dsnStructure)
            if (findStructure) {
                //Il faut supprimer les ' qu'on trouve sur la valeur afin de pouvoir la liste
                let value = lineSplit[1].replace(/'/g, "")
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
                        let addDsn: Dsn = {
                            ...findStructure,
                            value: value
                        }
                        this.dsnList.push(addDsn)
                        break
                    case 'Society':
                        if (lineSplit[0] === 'S21.G00.06.001') {
                            this.siren = value
                        }
                        let addRowSociety: Society = {
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
                        let addRowEstablishment: Establishment = {
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
                        let addRoWWorkContract: workContractDefinition = {
                            ...findStructure,
                            value,
                            siren: this.siren,
                            date: this.date,
                            numSS,
                            siret
                        }
                        this.workContractList.push(addRoWWorkContract)
                        break

                    case 'Mutual':
                        if (lineSplit[0] === 'S21.G00.15.005') {
                            mutualId = value
                            this.mutualIdList.push(mutualId)
                        }
                        let addMutual: Mutual = {
                            ...findStructure,
                            value,
                            date: this.date,
                            techId: mutualId

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
                    case 'WorkStopping':
                        let addWorkStopping = {
                            ...findStructure,
                            numSS,
                            value,
                            siren: this.siren,
                            date: this.date
                        }
                        this.workStoppingList.push(addWorkStopping)
                        break
                    case 'Employee':
                        //Si le salarié a un NTT on aura pas la structure S21.G00.30.001
                        //Il faut pouvoir remettre à blanc numSS. Si le numéro SS à déjà un contrat de travail ca signifie qu'on traite un nouveau salarié
                        //Pour un salarié qui n'a pas de numSS on commence par S21.G00.30.002
                        const findNumSSWorkContract = this.workContractList.find(contract => contract.numSS === numSS)
                        if (findNumSSWorkContract) {
                            numSS = ''
                            employeeDatas.splice(0, employeeDatas.length);

                        }
                        if (lineSplit[0] === 'S21.G00.30.001') {
                            numSS = value
                            this.numSSList.push(numSS)
                        }
                        if (numSS) {
                            if (lineSplit[0] === 'S21.G00.30.019') {
                                employeeId = value
                                this.numSSEmployeeIdList.push({
                                    numSS,
                                    employeeId
                                })
                            }
                            let addEmployee: Employee = {
                                ...findStructure,
                                value,
                                numSS,
                                siren: this.siren,
                                date: this.date

                            }
                            this.employeeList.push(addEmployee)
                        } else {
                            //Gestion avec un NTT on doit attendre la structure S21.G00.30.020
                            let datas = {
                                ...findStructure,
                                value
                            }
                            employeeDatas.push(datas)
                            if (lineSplit[0] === 'S21.G00.30.019') {
                                employeeId = value;
                            }
                            if (lineSplit[0] === 'S21.G00.30.020') {
                                numSS = value
                                this.numSSList.push(numSS)
                                this.numSSEmployeeIdList.push({
                                    numSS,
                                    employeeId
                                })
                                employeeDatas.forEach(employee => this.employeeList.push({
                                    ...employee,
                                    siren: this.siren,
                                    date: this.date,
                                    numSS
                                }))
                            }
                        }

                        break
                    case 'Base':
                        if (lineSplit[0] === 'S21.G00.78.001') {
                            idBase = value
                        }
                        let addBase: Base = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date,
                            idBase
                        }
                        this.baseList.push(addBase)
                        break
                    case 'BaseSubject':
                        if (lineSplit[0] === 'S21.G00.79.001') {
                            typeBaseSubject = value
                        }
                        let addBaseSubject: BaseSubject = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date,
                            typeBaseSubject
                        }
                        this.baseSubjectList.push(addBaseSubject)
                        break
                    case 'Contribution':
                        if (lineSplit[0] === 'S21.G00.81.001') {
                            idContribution = value
                        }
                        let addContribution: Contribution = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date,
                            idContribution,
                            siret
                        }
                        this.contributionList.push(addContribution)
                        break
                    case 'EstablishmentContribution':
                        let addEstablishementContrubution: EstablishmentContribution = {
                            ...findStructure,
                            value,
                            siren: this.siren,
                            date: this.date
                        }
                        this.establishmentContributionList.push(addEstablishementContrubution)
                        break
                    default:
                        throw new Error(`Le code collection n'existe pas`)
                        break
                }
            }
        }
        //Delete File 
        if (options.deleteFile) {
            fs.unlinkSync(dir)
        }
    }

    get dsn(): DsnObject {
        let dsnObject: any = {}
        for (let dsn of this.dsnList) {
            dsnObject[dsn.field] = dsn.value
        }
        dsnObject['date'] = this.date
        return dsnObject
    }

    get society(): SocietyObject {
        let societyObjet: any = {}
        for (let society of this.societyList) {
            societyObjet[society.field] = society.value
        }
        societyObjet['date'] = this.date
        return societyObjet
    }


    get establishment(): EstablishmentObject[] {
        //idEstablishmentList contient l'ensemble des id établissements qu'on a pu traiter.
        const establishments = []
        for (let idEstablishment of this.idEstablishmentList) {
            let establishmentObject: any = {}
            let establishmentFilter = this.establishmentList.filter(e => e.idEstablishment === idEstablishment)
            for (let establishment of establishmentFilter) {
                establishmentObject[establishment.field] = establishment.value
            }
            establishmentObject['date'] = this.date
            establishments.push(establishmentObject)
        }
        return establishments

    }


    get contributionFund(): ContributionFundObject[] {
        const contributionFundList = []
        for (let idEstablishment of this.idEstablishmentList) {
            let siret = this.establishmentList.find(e => e.idEstablishment === idEstablishment)?.siret
            if (siret) {
                let contributionFundFilter = this.contributionFundList.filter(c => c.idEstablishment === idEstablishment)
                let idDsn = contributionFundFilter.find(c => c.dsnStructure === 'S21.G00.20.001')?.value
                if (idDsn) {
                    const contributionDsn = ops.find(o => o.codeDsn === idDsn)
                    if (contributionDsn) {
                        let contributionFundObject: ContributionFundObject = {
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

    get employee(): EmployeeObject[] {
        const employeeList = []
        for (let numSS of this.numSSList) {
            let employeeFilter = this.employeeList.filter(e => e.numSS === numSS)
            if (employeeFilter) {
                let employeeObject: any = {}
                for (let employee of employeeFilter) {
                    employeeObject[employee.field] = employee.value
                }
                employeeObject['date'] = this.date
                employeeList.push(employeeObject)
            }
        }
        return employeeList
    }
    get workContract(): WorkContractObject[] {
        const workContractList = []
        for (let numSS of this.numSSList) {
            let workContractFilter = this.workContractList.filter(w => w.numSS === numSS)
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS)
            if (workContractFilter && employeeId) {
                let workContractObject: any = {}
                for (let workContract of workContractFilter) {
                    workContractObject[workContract.field] = workContract.value
                }
                workContractObject['employeeId'] = employeeId.employeeId
                workContractObject['date'] = this.date
                workContractList.push(workContractObject)
            }
        }
        return workContractList
    }

    get workStopping(): WorkContractObject[] {
        const workStoppingList: WorkContractObject[] = []

        for (let numSS of this.numSSList) {
            let workStoppingFilter = this.workStoppingList.filter(workStopping => workStopping.numSS === numSS)
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS)
            if (workStoppingFilter.length != 0 && employeeId) {
                let workStoppingObject: any = {}
                for (let workStopping of workStoppingFilter) {
                    workStoppingObject[workStopping.field] = workStopping.value
                }
                workStoppingObject['employeeId'] = employeeId.employeeId
                workStoppingObject['date'] = this.date
                workStoppingList.push(workStoppingObject)
            }
        }
        return workStoppingList
    }

    get employeeMutual(): MutualEmployeeObject[] {
        const employeesMutualList: MutualEmployeeObject[] = []
        for (let numSS of this.numSSList) {
            let mutualEmployeeFilter = this.mutualEmployeeList.filter(m => m.numSS === numSS)
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS)
            if (mutualEmployeeFilter && employeeId) {
                let mutualEmployeeObject: any = {}
                for (let mutualEmployee of mutualEmployeeFilter) {
                    mutualEmployeeObject[mutualEmployee.field] = mutualEmployee.value
                }
                mutualEmployeeObject['employeeId'] = employeeId.employeeId
                mutualEmployeeObject['date'] = this.date
                employeesMutualList.push(mutualEmployeeObject)
            }
        }
        return employeesMutualList
    }
    get mutual(): MutualObject[] {
        const mutualList: MutualObject[] = []

        for (let mutualId of this.mutualIdList) {
            let mutalFilter = this.mutualList.filter(m => m.techId === mutualId)
            let mutuelObject: any = {}
            if (mutalFilter) {
                for (let mutual of mutalFilter) {
                    mutuelObject[mutual.field] === mutual.value
                }
                mutuelObject['date'] = this.date
                mutualList.push(mutuelObject)
            }
        }
        return mutualList
    }

    get base(): BaseObject[] {
        const baseList: BaseObject[] = []
        const setIdBase = new Set()
        const filterIdBase = this.baseList.filter(c => c.field === 'idBase')
        filterIdBase.forEach(c => setIdBase.has(c.value) ? '' : setIdBase.add(c.value))
        //On tourne par salarié
        for (let numSS of this.numSSList) {
            let baseEmployeeFilter = this.baseList.filter(m => m.numSS === numSS)
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS)
            if (baseEmployeeFilter && employeeId) {
                //On filtre sur une base 
                for (let idBase of setIdBase) {
                    let employeeBase = baseEmployeeFilter.filter(e => e.idBase === idBase)
                    let baseObject: any = {}
                    for (let base of employeeBase) {
                        baseObject[base.field] = base.value
                    }
                    baseObject['employeeId'] = employeeId.employeeId
                    baseObject['date'] = this.date
                    baseList.push(baseObject)

                }
            }
        }
        return baseList
    }

    get baseSubject(): BaseSubjectObject[] {
        const baseSubjectList: BaseSubjectObject[] = []
        const setTypeBaseSubject = new Set()
        const filterTypeBaseSubject = this.baseSubjectList.filter(c => c.field === 'typeBaseSubject')
        filterTypeBaseSubject.forEach(c => setTypeBaseSubject.has(c.value) ? '' : setTypeBaseSubject.add(c.value))
        //On tourne par salarié
        for (let numSS of this.numSSList) {
            let baseEmployeeFilter = this.baseSubjectList.filter(m => m.numSS === numSS)
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS)
            if (baseEmployeeFilter && employeeId) {
                //On filtre sur une base 
                for (let typeBaseSubject of setTypeBaseSubject) {
                    let employeeBase = baseEmployeeFilter.filter(e => e.typeBaseSubject === typeBaseSubject)
                    let baseSubjectObject: any = {}
                    for (let base of employeeBase) {
                        baseSubjectObject[base.field] = base.value
                    }
                    baseSubjectObject['employeeId'] = employeeId.employeeId
                    baseSubjectObject['date'] = this.date
                    baseSubjectList.push(baseSubjectObject)

                }
            }
        }
        return baseSubjectList
    }

    get contribution(): ContributionObject[] {
        const contributionList: ContributionObject[] = []
        const setIdContribution = new Set()
        const filterIdContribution = this.contributionList.filter(c => c.field === 'idContribution')
        filterIdContribution.forEach(c => setIdContribution.has(c.value) ? '' : setIdContribution.add(c.value))
        //On tourne par salarié
        for (let numSS of this.numSSList) {
            let contributionEmployeeFilter = this.contributionList.filter(m => m.numSS === numSS)
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS)
            if (contributionEmployeeFilter && employeeId) {
                //On tourne par code de cotisation
                for (let contributionId of setIdContribution) {
                    let employeeContribution = contributionEmployeeFilter.filter(e => e.idContribution === contributionId)
                    let contributionObject: any = {}
                    //On alimente la cotisation
                    for (let contribution of employeeContribution) {
                        contributionObject[contribution.field] = contribution.value
                    }
                    contributionObject['employeeId'] = employeeId.employeeId
                    contributionObject['date'] = this.date

                    contributionList.push(contributionObject)
                }

            }
        }
        return contributionList
    }

    get assignement(): AssignementObject[] {
        const assignementList: AssignementObject[] = []
        const assignementFilter = this.workContractList.filter(a => a.field === 'employmentLabel')
        const assignementSet = new Set()
        for (let assignement of assignementFilter) {
            if (!assignementSet.has(assignement.value)) {
                assignementSet.add(assignement.value)
                let assignementObject: any = {}
                assignementObject[assignement.field] = assignement.value
                assignementObject['date'] = this.date
                assignementList.push(assignementObject)
            }
        }
        return assignementList
    }

    get rateMobility(): MobilityObject[] {
        //Attention la structure idInsee est avant le taux. 
        const rateMobilityList: MobilityObject[] = []
        const idInseeList: string[] = []
        const setInsee = new Set<string>()
        const setRateMobility = new Set<string>()
        for (let contribution of this.contributionList) {
            //IdInsee est avant le taux
            let idInsee = contribution.field === 'idInsee' ? contribution.value : undefined
            let rateMobility = contribution.field === 'rateContribution' && contribution.idContribution === '081' ? contribution.value : undefined
            if (idInsee) {
                if (!setInsee.has(idInsee)) {
                    setInsee.add(idInsee)
                    idInseeList.push(idInsee)
                }
            }
            if (rateMobility) {
                let lastIdInsee = idInseeList.reverse()
                let concatIdInseeRate = `${lastIdInsee[0]}-${rateMobility}`
                if (!setRateMobility.has(concatIdInseeRate)) {
                    setRateMobility.add(concatIdInseeRate)
                    rateMobilityList.push({
                        rate: rateMobility,
                        insee: lastIdInsee[0]
                    })
                }
            }

        }
        return rateMobilityList
    }

    get rateAt(): atObject[] {
        /**
         * Les taux AT sont dans les contrats de travail field: 'rateAt',
         * Les codes risques sont dans  field: 'idWorkAccidentRisk',
         */
        const rateAtList: atObject[] = []
        const setIdWorkAccidentRisk = new Set<string>()
        const setRateAt = new Set<string>()
        const setIdWorkAccidentRiskList: string[] = []
        for (let at of this.workContractList) {
            let siret = at.siret
            let date = at.date
            let idWorkAccidentRisk = at.field === 'idWorkAccidentRisk' ? at.value : undefined
            let rateAT = at.field === 'rateAt' ? at.value : undefined
            if (idWorkAccidentRisk) {
                if (!setIdWorkAccidentRisk.has(idWorkAccidentRisk)) {
                    setIdWorkAccidentRisk.add(idWorkAccidentRisk)
                    setIdWorkAccidentRiskList.push(idWorkAccidentRisk)
                }
            }
            if (rateAT) {
                let lastIdWorkAccidentRisk = setIdWorkAccidentRiskList.reverse()
                let concatLastIdWorkAccidentRiskRateAt = `${lastIdWorkAccidentRisk[0]}-${rateAT})`
                if (!setRateAt.has(concatLastIdWorkAccidentRiskRateAt)) {
                    setRateAt.add(concatLastIdWorkAccidentRiskRateAt)
                    rateAtList.push({
                        code: lastIdWorkAccidentRisk[0],
                        rate: rateAT,
                        siret,
                        date
                    })
                }
            }
        }

        return rateAtList
    }

}



