import fs from 'node:fs';
import readline from 'node:readline';
import { ops } from './utils/ops';
import { extractionsList } from './utils/extraction';
import { WorkStoppingObject, MutualObject, BaseSubjectObject, MutualEmployeeComplet, MutualEmployeeObject, WorkContractObject, EmployeeObject, ContactObject, ContributionFundObject, EstablishmentObject, SpecificBankDetailsObject, ContactSenderObject, SenderObject, StatementObject, SocialPaymentObject, ComplementOETHObject, SocietyObject, DsnObject, ContributionSlipObject, Base, SpecificBankDetails, Bonus, AggregateContribution, ExtractionRowDSN, Establishment, Dsn, ContributionFund, workContractDefinition, Mutual, MutualEmployee, Employee, baseList, BaseSubject, NumSSEmployeeId, Contribution, WorkStopping, AggregateContributionObject, EstablishmentContribution, EstablishmentContributionObject, ChangeWockContractObject, ChangeWorkContractDefinition, Payrool, OtherPayment, IndividualPayment, IndividualPaymentObject, Contact, Sender, ContactSender, AssignementObject, MobilityObject, atObject, BaseObject, ContributionObject, BonusObject, PayroolObject, OtherPaymentObject, SmartDsn, SmartEmployee, SmartWorkContract, SmartEstablishment, } from './utils/type'

//Norme DSN 2022 = https://www.net-entreprises.fr/media/documentation/dsn-cahier-technique-2022.1.pdf
//NodeJs readline =https://nodejs.org/api/readline.html

export class DsnParser {
    private dsnVersion = ['P22V01', 'P23V01', 'P24V01']
    private _societyList: ExtractionRowDSN[] = []
    private _establishmentList: Establishment[] = []
    private _dsnList: Dsn[] = []
    private statementList: Dsn[] = []
    private contributionFundList: ContributionFund[] = []
    private workContractList: workContractDefinition[] = []
    private mutualList: Mutual[] = []
    private mutualEmployeeList: MutualEmployee[] = []
    private employeeList: Employee[] = []
    private numSSList: string[] = []
    private idEstablishmentList: number[] = []
    private extractions = extractionsList
    private mutualIdList: number[] = []
    private baseList: baseList = []
    private baseSubjectList: BaseSubject[] = []
    private numSSEmployeeIdList: NumSSEmployeeId[] = []
    private contributionList: Contribution[] = []
    private workStoppingList: WorkStopping[] = []
    private aggregateContributionList: AggregateContribution[] = []
    private bonusList: Bonus[] = []
    private establishmentContributionList: EstablishmentContribution[] = []
    private changeWorkContractList: ChangeWorkContractDefinition[] = []
    private payroolList: Payrool[] = []
    private otherPaymentList: OtherPayment[] = []
    private individualPayementList: IndividualPayment[] = []
    private contactList: Contact[] = []
    private contactIdList: number[] = []
    private aggregateContributionIdList: string[] = []
    private senderList: Sender[] = []
    private contactSenderList: ContactSender[] = []
    private specificBankDetailsList: SpecificBankDetails[] = []
    private complementOETHList: Dsn[] = []
    private _socialPaymentList: ExtractionRowDSN[] = []
    private _date = ''
    private _siren = ''
    private _contributionSlipList: ExtractionRowDSN[] = []

    async asyncInit(dir: string, options = {
        controleDsnVersion: true,
        deleteFile: false
    }) {
        const fileStream = fs.createReadStream(dir);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        let mutualId = 0
        let idEstablishment = 1
        let numSS = ''
        let siren = ''
        let siret = ''
        let employeeId = ''
        let idContribution = ''
        let idBase = ''
        let typeBaseSubject = ''
        let contractId = ''
        let optionIdMutual = ''
        let aggregateContributionId = ''
        const employeeDatas = []//On va stocker temporairement les valeurs du salarié pour la gestion des NTT
        const mutualEmployeeTmp = []
        let contactId = 0
        for await (const line of rl) {
            //let lineSplit = line.split(',\'')
            //Exemple d'une structure S10.G00.00.004,'OK'
            let lineSplit = line.split(`,'`);
            let dsnStructure = lineSplit[0]
            let findStructure = this.extractions.find(d => d.dsnStructure === dsnStructure)
            if (findStructure) {
                //Il faut supprimer les ' qu'on trouve sur la valeur afin de pouvoir la lire
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
                            this._date = value
                        }
                        let addDsn: ExtractionRowDSN = {
                            ...findStructure,
                            value: value
                        }
                        this.dsnList = addDsn
                        break
                    case 'Statement':
                        let addRowStatement: ExtractionRowDSN = {
                            ...findStructure,
                            value
                        }
                        this.statementList.push(addRowStatement)
                        break
                    case 'Society':
                        if (lineSplit[0] === 'S21.G00.06.001') {
                            siren = value
                        }
                        let addRowSociety: ExtractionRowDSN = {
                            ...findStructure,
                            value: value,
                        }
                        this.societyList = addRowSociety
                        break
                    case 'Sender':
                        let addRowSender: Sender = {
                            ...findStructure,
                            value: value,
                            date: this._date,

                        }
                        this.senderList.push(addRowSender)
                        break
                    case 'ContactSender':
                        let addRowContactSender: ContactSender = {
                            ...findStructure,
                            value: value,
                            date: this.date
                        }
                        this.contactSenderList.push(addRowContactSender)

                        break
                    case 'SocialPayment':
                        let addRowSocialPayment: ExtractionRowDSN = {
                            ...findStructure,
                            value
                        }
                        this.socialPaymentList = addRowSocialPayment
                        break
                    case 'Contact':
                        if (lineSplit[0] === 'S20.G00.07.001') {
                            contactId += 1
                            this.contactIdList.push(contactId)
                        }
                        let addRowContact: Contact = {
                            ...findStructure,
                            value: value,
                            id: contactId
                        }
                        this.contactList.push(addRowContact)
                        break
                    case 'complementOETH':
                        let addComplementOETH: Dsn = {
                            ...findStructure,
                            value: value,

                        }
                        this.complementOETHList.push(addComplementOETH)
                        break
                    case 'Establishment':
                        if (lineSplit[0] === 'S21.G00.11.001') {
                            idEstablishment += 1
                            this.idEstablishmentList.push(idEstablishment)
                            siret = siren + value
                        }
                        let addRowEstablishment: Establishment = {
                            ...findStructure,
                            value: value,
                            siret,
                            idEstablishment,
                            date: this.date

                        }
                        this.establishmentList = addRowEstablishment
                        break
                    case 'contributionSlip':
                        let addContributionSlip: ExtractionRowDSN = {
                            ...findStructure,
                            value,
                            siret
                        }
                        this.contributionSlip = addContributionSlip
                        break
                    case 'specificBankDetails':
                        let addRowSpecificBankDetails: SpecificBankDetails = {
                            ...findStructure,
                            value,
                            siret,
                        }
                        this.specificBankDetailsList.push(addRowSpecificBankDetails)
                        break
                    case 'AggregateContribution':
                        if (lineSplit[0] === 'S21.G00.23.001') {
                            aggregateContributionId = value
                            this.aggregateContributionIdList.push(aggregateContributionId)
                        }
                        let addRowAggregate: AggregateContribution = {
                            ...findStructure,
                            value: value,
                            siret,
                            idEstablishment,
                            aggregateContributionId,
                            date: this.date
                        }
                        this.aggregateContributionList.push(addRowAggregate)
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
                        if (lineSplit[0] === 'S21.G00.40.009') {
                            contractId = value
                        }
                        let addRoWWorkContract: workContractDefinition = {
                            ...findStructure,
                            value,
                            siren,
                            date: this._date,
                            numSS,
                            siret
                        }
                        this.workContractList.push(addRoWWorkContract)
                        break
                    case 'ChangWorkContract':
                        let addRowChangWorkContract: ChangeWorkContractDefinition = {
                            ...findStructure,
                            value,
                            siren,
                            date: this._date,
                            siret,
                            numSS,
                            contractId
                        }
                        this.changeWorkContractList.push(addRowChangWorkContract)
                        break
                    case 'Mutual':
                        if (lineSplit[0] === 'S21.G00.15.001') {
                            mutualId += 1
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
                        /**
                         * S21.G00.70.013 contient permet de faire le lien avec la structure S15
                         * Attention pour la première valeur elle n'est pas connu
                         * Le premier segment est toujours S21.G00.70.04 le dernier est S21.G00.70.13
                        */
                        //Si on trouve S21.G00.70.04 et optionIdMutual est vide alors on est sur la première ligne du salarié.
                        if (lineSplit[0] === 'S21.G00.70.004') {
                            //Début d'une nouvelle affiliation
                            //Remise à 0 du tableau
                            let lenMutualEmployeeTmp = mutualEmployeeTmp.length
                            mutualEmployeeTmp.splice(0, lenMutualEmployeeTmp)
                            optionIdMutual = ''
                        }
                        //On ajoute la valeur
                        let addMutualEmployee = {
                            ...findStructure,
                            numSS,
                            value,
                            optionIdMutual,
                            siren,
                            date: this._date,

                        }
                        mutualEmployeeTmp.push(addMutualEmployee)

                        if (lineSplit[0] === 'S21.G00.70.013') {
                            //Fin d'une affiliation
                            optionIdMutual = value
                            //on va ajouter l'option Id sur les autres enregistrements
                            for (let mutualEmployeeTmpValue of mutualEmployeeTmp) {
                                mutualEmployeeTmpValue.optionIdMutual = optionIdMutual
                            }
                            //on ajouter les informations 
                            this.mutualEmployeeList.push(...mutualEmployeeTmp)

                        }

                        break
                    case 'WorkStopping':
                        let addWorkStopping = {
                            ...findStructure,
                            numSS,
                            value,
                            siren,
                            date: this._date,
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
                                siren,
                                date: this._date,

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
                                    siren,
                                    date: this._date,
                                    numSS
                                }))
                            }
                        }

                        break
                    case 'Bonus':
                        let addBonus: Bonus = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this._siren,
                            date: this._date,
                        }
                        this.bonusList.push(addBonus)
                        break
                    case 'Base':
                        if (lineSplit[0] === 'S21.G00.78.001') {
                            idBase = value
                        }
                        let addBase: Base = {
                            ...findStructure,
                            value,
                            numSS,
                            siren,
                            date: this._date,
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
                            siren,
                            date: this._date,
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
                            siren,
                            date: this.date,
                            idContribution,
                            siret
                        }
                        this.contributionList.push(addContribution)
                        break
                    case 'IndividualPayment':
                        let addIndividualPayement: IndividualPayment = {
                            ...findStructure,
                            value,
                            numSS,
                            siren,
                            date: this.date,
                            contractId
                        }
                        this.individualPayementList.push(addIndividualPayement)

                        break
                    case 'Payrool':
                        let addPayrool: Payrool = {
                            ...findStructure,
                            value,
                            numSS,
                            siren,
                            date: this.date,
                            contractId
                        }
                        this.payroolList.push(addPayrool)
                        break
                    case 'OtherPayment':
                        let otherPayment: OtherPayment = {
                            ...findStructure,
                            value,
                            numSS,
                            siren,
                            date: this.date,
                            contractId
                        }
                        this.otherPaymentList.push(otherPayment)
                        break
                    case 'EstablishmentContribution':
                        let addEstablishementContrubution: EstablishmentContribution = {
                            ...findStructure,
                            value,
                            siren,
                            date: this.date
                        }
                        this.establishmentContributionList.push(addEstablishementContrubution)
                        break
                    default:
                        console.error(`La collection ${findStructure.collection} n'existe pas`)
                        throw new Error(`La collection ${findStructure.collection} n'existe pas`)

                }
            }
        }
        //Delete File 
        if (options.deleteFile) {
            fs.unlinkSync(dir)
        }
    }
    set establishmentList(value: Establishment) {
        this._establishmentList.push(value)
    }
    set contributionSlip(value: ExtractionRowDSN) {
        this._contributionSlipList.push(value)
    }
    set societyList(value: ExtractionRowDSN) {
        this._societyList.push(value)
    }
    set socialPaymentList(value: ExtractionRowDSN) {
        this._socialPaymentList.push(value)
    }

    set dsnList(value: ExtractionRowDSN) {
        this._dsnList.push(value)
    }

    set date(value: string) {
        this._date = value
    }
    set siren(value: string) {
        if (value.length === 9) {
            this._siren = value

        } else {
            throw new Error(`Le siren doit contenir 9 positions`)
        }
    }
    /**
     * Retourne les informations de base de la DSN bloc S10.G00.00
     */
    get dsn(): DsnObject {

        let dsnObject = this.makeDynamicObject<DsnObject>(this._dsnList)
        return dsnObject
    }
    /**
     * Retourne les informations de base de la DSN bloc S21.G00.22
     */
    get contributionSlip(): ContributionSlipObject[] {
        const contributionSlipList: ContributionSlipObject[] = []
        for (let establishment of this.establishment) {
            let siret = establishment.siren + establishment.nic
            let contributionSlipFilter = this._contributionSlipList.filter(establishment => establishment.siret === siret)
            let contributionSlipObject = this.makeDynamicObject<ContributionSlipObject>(contributionSlipFilter)
            contributionSlipList.push(contributionSlipObject)
        }
        return contributionSlipList

    }
    /**
     * make a dynamic object
     * @param datas 
     * @returns { Object}
     */
    makeDynamicObject<T>(datas: Dsn[]): T {
        let dynamicObject: any = {}
        for (let data of datas) {
            dynamicObject[data.field] = data.value
        }
        dynamicObject['date'] = this._date
        dynamicObject['siren'] = this._siren

        return dynamicObject
    }
    /**
     * Retourne les informations de base de la DSN bloc S21.G00.13
     */

    get complementOETH(): ComplementOETHObject {
        let complementOETHObject: any = {}
        for (let complement of this.complementOETHList) {
            complementOETHObject[complement.field] = complement.value
        }
        complementOETHObject['date'] = this.date

        return complementOETHObject
    }

    get socialPayment(): SocialPaymentObject {
        let socialPaymentObject = this.makeDynamicObject<SocialPaymentObject>(this._socialPaymentList)

        return socialPaymentObject

    }
    /**
     * Retourne les informations du bloc S20.G00.05
     */
    get statement(): StatementObject {
        let statementObject: any = {}
        for (let statement of this.statementList) {
            statementObject[statement.field] = statement.value
        }
        statementObject['date'] = this.date
        return statementObject
    }
    /**
     * Retourne les informations du bloc S10.G00.01
     */
    get sender(): SenderObject {
        let senderObject: any = {}
        for (let sender of this.senderList) {
            senderObject[sender.field] = sender.value
        }
        senderObject['date'] = this.date
        return senderObject
    }
    /**
     * Retourne les informations du bloc S10.G00.02
     */
    get contactSender(): ContactSenderObject {
        let contactSenderObject: any = {}
        for (let contactSender of this.contactSenderList) {
            contactSenderObject[contactSender.field] = contactSender.value
        }
        contactSenderObject['date'] = this.date

        return contactSenderObject
    }

    /**
     * Retourne les informations du bloc S21.G00.12
     */

    get specificBankDetails(): SpecificBankDetailsObject[] {
        const specificBankDetailsObjectList = []
        const establishmentList = this.establishment
        for (let establishment of establishmentList) {
            let specificBankDetailsObject: any = {}
            let siret = establishment.siren + establishment.nic
            let specificBankDetailsFilter = this.specificBankDetailsList.filter(spec => spec.siret === siret)
            if (specificBankDetailsFilter) {
                for (let specificBankDetails of specificBankDetailsFilter) {
                    specificBankDetailsObject[specificBankDetails.field] = specificBankDetails.value
                }
                specificBankDetailsObject['date'] = this.date
                specificBankDetailsObjectList.push(specificBankDetailsObject)
            }
        }

        return specificBankDetailsObjectList
    }
    /**
     * Retourne les informations de la société bloc S21.G00.06
     */
    get society(): SocietyObject {
        let societyObjet: any = this.makeDynamicObject<SocietyObject>(this._societyList)
        return societyObjet
    }

    /**
     * Retourne la liste des établissements de la DSN bloc S21.G00.11
     */
    get establishment(): EstablishmentObject[] {
        //idEstablishmentList contient l'ensemble des id établissements qu'on a pu traiter.
        const establishments = []
        for (let idEstablishment of this.idEstablishmentList) {
            let establishmentObject: any = {}
            let establishmentFilter = this._establishmentList.filter(e => e.idEstablishment === idEstablishment)
            for (let establishment of establishmentFilter) {
                establishmentObject[establishment.field] = establishment.value
            }
            establishmentObject['date'] = this.date
            establishments.push(establishmentObject)
        }
        return establishments

    }

    /**
     * Retourne la liste des organismes sociaux 
     */

    get contributionFund(): ContributionFundObject[] {
        const contributionFundList = []
        for (let idEstablishment of this.idEstablishmentList) {
            let siret = this._establishmentList.find(e => e.idEstablishment === idEstablishment)?.siret
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
    /**
     * Retourne la liste des employés bloc S21.G00.30
     */
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

    /**
     * Retourne les cotisations agrégée bloc S21.G00.23
     */

    get aggregateContribution(): AggregateContributionObject[] {
        const aggregateContributionList: AggregateContributionObject[] = []
        //On filtre par établissement
        for (let idEstablishment of this.idEstablishmentList) {
            let aggregateContributionFilterEstablishment = this.aggregateContributionList.filter(aggregate => aggregate.idEstablishment === idEstablishment)
            //On tourne par cotisation
            for (let aggregateContributionId of this.aggregateContributionIdList) {
                let aggregateContributionFilter = aggregateContributionFilterEstablishment.filter(contributionId => contributionId.aggregateContributionId === aggregateContributionId)
                let siret = aggregateContributionFilter[0].siret
                let aggregateContributionRow: any = {}
                for (let aggregateContribution of aggregateContributionFilter) {
                    aggregateContributionRow[aggregateContribution.field] = aggregateContribution.value
                }
                aggregateContributionRow['date'] = this.date
                aggregateContributionRow['siret'] = siret
                aggregateContributionList.push(aggregateContributionRow)
            }
        }
        return aggregateContributionList
    }

    /**
     * Retourne la liste des contacts de la DSN structure S20.G00.007
     */
    get contact(): ContactObject[] {
        const contactList: ContactObject[] = []
        for (let contactId of this.contactIdList) {
            let contactListFilter = this.contactList.filter(contact => contact.id === contactId)
            let contactObject: any = {}
            for (let contact of contactListFilter) {
                contactObject[contact.field] = contact.value
            }

            contactList.push(contactObject)
        }
        return contactList
    }
    /**
     * Retourne la liste des contrats de travails bloc S21.G00.40
     */
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
                workContractObject['numSS'] = employeeId.numSS
                workContractObject['date'] = this.date
                workContractList.push(workContractObject)
            }
        }
        return workContractList
    }

    get changWorkContract(): ChangeWockContractObject[] {
        const changeWorkContractList: ChangeWockContractObject[] = []
        for (let numSS of this.numSSList) {
            let changeWorkContractFilter = this.changeWorkContractList.filter(contract => contract.numSS === numSS)
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS)
            if (changeWorkContractFilter.length > 0 && employeeId) {
                let changeWorContractObject: any = {}
                for (let change of changeWorkContractFilter) {
                    changeWorContractObject[change.field] = change.value
                }
                changeWorContractObject['employeeId'] = employeeId.employeeId
                changeWorContractObject['date'] = this.date
                changeWorContractObject['numSS'] = employeeId.numSS
                changeWorkContractList.push(changeWorContractObject)
            }
        }
        return changeWorkContractList
    }
    get workStopping(): WorkStoppingObject[] {
        const workStoppingList: WorkStoppingObject[] = []

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
                workStoppingObject['numSS'] = employeeId.numSS
                workStoppingList.push(workStoppingObject)
            }
        }
        return workStoppingList
    }

    get employeeMutual(): MutualEmployeeComplet[] {
        const employeesMutualList: MutualEmployeeObject[] = []
        const employeesMutualListComplete: MutualEmployeeComplet[] = []
        const mutualList = this.mutual
        //On se place sur un salarié
        for (let numSS of this.numSSList) {
            let mutualEmployeeFilter = this.mutualEmployeeList.filter(m => m.numSS === numSS)
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS)
            if (employeeId) {
                //Un salarié peut avoir X contrats de mutuelles
                for (let mutualIdEstablishment of this.mutualIdList) {
                    let mutualIdEstablishmentString = String(mutualIdEstablishment)
                    let employeeMutualIdFilter = mutualEmployeeFilter.filter(mutualId => mutualId.optionIdMutual === mutualIdEstablishmentString)
                    //On boucle sur le contrat de mutuelle
                    if (employeeMutualIdFilter.length > 0) {
                        let mutualEmployeeObject: any = {}
                        for (let mutualEmployee of employeeMutualIdFilter) {
                            mutualEmployeeObject[mutualEmployee.field] = mutualEmployee.value
                        }
                        mutualEmployeeObject['employeeId'] = employeeId.employeeId
                        mutualEmployeeObject['date'] = this.date
                        mutualEmployeeObject['numSS'] = employeeId.numSS
                        mutualEmployeeObject['idTechAffiliationMutual'] = mutualIdEstablishmentString
                        employeesMutualList.push(mutualEmployeeObject)
                    }
                }

            }
        }
        //Dans la DSN les éléments sont stockés dans les blocs S15
        for (let mutualEmployeeDetail of employeesMutualList) {
            let mutualFilter = mutualList.find(mutual => mutual.techId === mutualEmployeeDetail.idTechAffiliationMutual)
            if (mutualFilter) {
                let mutualEmployeeRowComplete = {
                    ...mutualEmployeeDetail,
                    ...mutualFilter
                }
                employeesMutualListComplete.push(mutualEmployeeRowComplete)
            }

        }
        return employeesMutualListComplete
    }

    get mutual(): MutualObject[] {
        const mutualList: MutualObject[] = []
        for (let mutualId of this.mutualIdList) {
            let mutalFilter = this.mutualList.filter(m => m.techId === mutualId)
            let mutuelObject: any = {}
            if (mutalFilter) {
                for (let mutual of mutalFilter) {
                    mutuelObject[mutual.field] = mutual.value
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
                    baseObject['numSS'] = employeeId.numSS
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
                    baseSubjectObject['numSS'] = employeeId.numSS
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
                    contributionObject['numSS'] = employeeId.numSS
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
                let siret = contribution.siret
                let date = contribution.date
                let lastIdInsee = idInseeList.reverse()
                let concatIdInseeRate = `${lastIdInsee[0]}-${rateMobility}`
                if (!setRateMobility.has(concatIdInseeRate)) {
                    setRateMobility.add(concatIdInseeRate)
                    rateMobilityList.push({
                        rate: rateMobility,
                        insee: lastIdInsee[0],
                        siret,
                        date
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
    /**
     * retourne le détail de l'extraction
     */
    get extraction() {
        return this.extractions
    }

    get bonus(): BonusObject[] {
        const bonusList: BonusObject[] = []
        //On tourne par salarié
        for (let numSS of this.numSSList) {
            let bonusEmployeeFilter = this.bonusList.filter(m => m.numSS === numSS)
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS)
            if (bonusEmployeeFilter && employeeId) {
                let bonusObject: any = {}
                for (let bonus of bonusEmployeeFilter) {
                    bonusObject[bonus.field] = bonus.value
                }
                bonusObject['employeeId'] = employeeId.employeeId
                bonusObject['date'] = this.date
                bonusObject['numSS'] = employeeId.numSS

                if (bonusObject.amountBonus) {
                    bonusList.push(bonusObject)
                }

            }
        }
        return bonusList

    }

    get individualPayment(): IndividualPaymentObject[] {
        const individualPaymentList: IndividualPaymentObject[] = []
        for (let numSS of this.numSSList) {
            let individualPaymentFilter = this.individualPayementList.filter(payment => payment.numSS === numSS)
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS)
            if (individualPaymentFilter && employeeId) {
                let individualPaymentObject: any = {}
                for (let invidualPayment of individualPaymentFilter) {
                    individualPaymentObject[invidualPayment.field] = invidualPayment.value
                }
                individualPaymentObject['employeeId'] = employeeId.employeeId
                individualPaymentObject['numSS'] = employeeId.numSS
                individualPaymentObject['date'] = this.date
                individualPaymentList.push(individualPaymentObject)

            }
        }
        return individualPaymentList
    }

    get payrool(): PayroolObject[] {
        const payroolList: PayroolObject[] = []
        for (let numSS of this.numSSList) {
            let payroolFilter = this.payroolList.filter(payrool => payrool.numSS === numSS)
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS)
            if (payroolFilter && employeeId) {
                let payroolObject: any = {}
                for (let payrool of payroolFilter) {
                    payroolObject[payrool.field] = payrool.value
                }
                payroolObject['employeeId'] = employeeId.employeeId
                payroolObject['numSS'] = employeeId.numSS
                payroolObject['date'] = this.date
                payroolList.push(payroolObject)
            }
        }
        return payroolList
    }
    get otherPayment(): OtherPaymentObject[] {
        const otherPaymentList: OtherPaymentObject[] = []
        for (let numSS of this.numSSList) {
            let otherPaymentList = this.otherPaymentList.filter(other => other.numSS === numSS)
            let employeeId = this.numSSEmployeeIdList.find(e => e.numSS === numSS)
            if (otherPaymentList && employeeId) {
                let otherObject: any = {}
                for (let other of otherPaymentList) {
                    otherObject[other.field] = other.value
                }
                otherObject['employeeId'] = employeeId.employeeId
                otherObject['numSS'] = employeeId.numSS
                otherObject['date'] = this.date
                otherPaymentList.push(otherObject)
            }
        }
        return otherPaymentList
    }

    get smartExtraction(): SmartDsn {
        const sender = this.sender
        const contactSender = this.contactSender
        const employeesList = this.employee
        const workContractsList = this.workContract
        const mutualEmployeeList = this.employeeMutual
        const contactList = this.contact
        const aggregateContribution = this.aggregateContribution
        const dsn = this.dsn
        const statement = this.statement
        const society = this.society
        const establishmentsList = this.establishment
        const specificBankDetails = this.specificBankDetails
        const complementOETH = this.complementOETH
        const workChangeContractsList = this.changWorkContract
        const workStoppingList = this.workStopping
        const bonusList = this.bonus
        const smartEmployeeList: SmartEmployee[] = []
        //Consolidation des données salariés
        for (let employee of employeesList) {
            let workContractFilter = workContractsList.filter(work => work.employeeId === employee.employeeId)
            let mutualFilter = mutualEmployeeList.filter(mutual => mutual.employeeId === employee.employeeId)
            let workContractChangeFilter = workChangeContractsList.filter(change => change.employeeId === employee.employeeId)
            let workStoppingFilter = workStoppingList.filter(stopping => stopping.employeeId === employee.employeeId)
            let bonusFilter = bonusList.filter(bonus => bonus.employeeId === employee.employeeId)
            let employeeWorkContract: SmartWorkContract[] = []
            for (let workContract of workContractFilter) {
                let changeList = workContractChangeFilter.filter(change => change.contractId === workContract.contractId)
                let workContractRow: SmartWorkContract = {
                    ...workContract,
                    change: [...changeList]
                }
                employeeWorkContract.push(workContractRow)
            }
            let employeeRow: SmartEmployee = {
                ...employee,
                workContracts: [...employeeWorkContract],
                workStopping: [...workStoppingFilter],
                mutual: [...mutualFilter],
                bonus: [...bonusFilter]
            }
            smartEmployeeList.push(employeeRow)
        }
        //On ajoute les cotisations aux établissements
        const smartEstablishmentList: SmartEstablishment[] = []
        for (let establishment of establishmentsList) {
            let siret = society.siren + establishment.nic
            let specificBankDetailsEstablishment = specificBankDetails.find(specEstablishement => specEstablishement.siret === siret)
            let aggregateContributionFilter = aggregateContribution.filter(aggregate => aggregate.siret === siret)
            let smartEstablishment: SmartEstablishment = {
                ...establishment,
                aggreagreContribution: [...aggregateContributionFilter],
                specificBankDetails: specificBankDetailsEstablishment

            }
            smartEstablishmentList.push(smartEstablishment)
        }

        const smartDsn: SmartDsn = {
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
                ],
                complementOETH
            },
            employees: [...smartEmployeeList]

        }
        return smartDsn
    }

}



