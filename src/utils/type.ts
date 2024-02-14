export type baseList = Base[]


export type workContractDefinition = {
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
    month: string,
    type: string,
    totalRows: string,

}

export type ContributionSlipObject = {
    siren: string,
    date: string,
    siret: string,
    socialProtectionOrganizationId: string,
    operationEntity: string,
    startDateContributionSlip: string,
    endDateContributionSlip: string,
    amountContributionSlip: string,
    crmContributionSlip: string
}

export type StatementObject = {
    natureDsn: string,
    typeDsn: string,
    fractionDsn: string,
    idDsn: string,
    month: string,
    fieldDsn: string,
    jobDsn: string
    idRemoveDsn: string,
    dateMakeFileDsn: string,
    currencyDsn: string,
    reasonDsn: string,
    lastSIRETOldContractDsn: string
}

export type AggregateContributionObject = {
    contributionId: string,
    contributionQualifier: string,
    contriburionRate: string,
    baseAmount: string,
    contributionAmount: string,
    contributionInsee: string,
    contributionCRM: string,
    siret: string
}

export type Dsn = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string
}
export type SpecificBankDetails = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siret: string
}

export type ComplementOETHObject = {
    approvedAgreement: string,
    typeBOETH: string,
    numberBOETH: string,
    yearBOETH: string
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
    date: string,
    averageWorkForce31DecemberSociety: string,
    countrySociety: string,
    foreignDistributionCode: string,
    establishmentOfTheCompany: string,
    idcc: string
}

export type BonusObject = {
    siren: string,
    date: string
    employeeId: string,
    numSS: string,
    typeBonus: string,
    amountBonus: string,
    dateStartBonus: string,
    dateEndBonus: string,
    contractIdBonus: string,
    datePaymentBonus: string
}

export type SpecificBankDetailsObject = {
    siret: string,
    date: string,
    typeSpecificBankDetails: string,
    BICSpecificBankDetails: string,
    IBANSpecificBankDetails: string
}

export type SenderObject = {
    nicSender: string,
    nameSender: string,
    addressSender: string,
    zipCodeSender: string,
    citySender: string,
    countrySender: string,
    foreignDistributionCodeSender: string,
    complementLocalisationSender: string,
    distributionServiceSender: string

}

export type ContactObject = {
    siren: string,
    date: string,
    contactName: string,
    contactPhone: string,
    contactEmail: string,
    contactType: string

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
    employeeId: string,
    numSS: string,
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
    SIRETCentralizer?: string,
    date: string,
    siret: string
}

export type WorkContractObject = {
    employeeId: string,
    numSS: string,
    startDate: string,
    status: string,
    retirement: string,
    pcs: string,
    pcsBis: string,
    employmentLabel: string,
    contract: string,
    contractId: string,
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
export type Society = {
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

export type ChangeWockContractObject = {
    employeeId: string,
    contractId: string,
    numSS: string,
    date: string,
    changeDate: string,
    oldStatus: string,
    oldRetirement: string,
    oldContract: string,
    oldSystemConvention: string,
    oldUnitQuota: string,
    oldQuota: string,
    oldModeWorkingTime: string,
    oldSS: string,
    oldCCN: string,
    oldEstablishment: string,
    oldWorkPlace: string,
    oldContractId: string,
    oldReason: string,
    oldProfessionnalFees: string,
    oldForeigner: string,
    oldPCS: string,
    oldPCSFP: string,
    oldContractStartDate: string,
    oldQuotite: string,
    oldPaidHolidays: string,
    oldAPECITA: string,
    oldPartTime: string,
    oldPayroolDepth: string,
    oldFPPCS: string,
    oldPost: string,
    oldFPQuotite: string,
    oldPartTimePercentage: string,
    oldService: string,
    oldFPIndice: string,
    oldFPIndiceMaj: string,
    oldFPNBI: string,
    oldFpIndiceBrutOrigine: string,
    oldArticle15: string,
    oldFPEmployer: string,
    oldEmployeeFPIndiceBrut: string,
    oldSPP: string,
    oldTitulaire: string,
    oldActitRate: string,
    oldLevelPayroll: string,
    oldEchelon: string,
    oldCoeff: string,
    oldNav: string,
    oldBOETH: string,
    oldPublicLaw: string,
    oldDispo: string,
    oldClass: string,
    oldMal: string,
    oldVieil: string,
    oldMarine: string,
    oldCNIEG: string,
    oldPartAct: string,
    oldFPDetachment: string,
    oldPosiCCN: string,
    oldAT: string,
    oldStatusEmployee: string,
    oldMultiple: string,
    oldRank: string,
    oldFPCTI: string,
    oldFINES: string,

}

export type ChangeWorkContractDefinition = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    numSS: string,
    siren: string,
    date: string,
    siret: string
    contractId: string
}
export type Establishment = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    siret: string,
    idEstablishment: number
    date: string
}

export type Sender = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    date: string
}

export type AggregateContribution = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    siret: string,
    idEstablishment: number,
    aggregateContributionId: string,
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

export type Mutual = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    date: string,
    techId: number
}

export type MutualEmployee = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    optionIdMutual: string,
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
    numSS: string,
    option: string,
    pop: string,
    children: string,
    assign: string,
    numberAssign: string,
    otherAssign: string,
    idTechAffiliation: string,
    idTech: string,
    date: string,
    idTechAffiliationMutual: string,
    startDateMutualEmployee: string,
    endDateMutualEmployee: string
}

export type atObject = {
    code: string,
    rate: string,
    siret: string,
    date: string
}

export type ContactSenderObject = {
    salutationContactSender: string,
    nameContactSender: string,
    mailContactSender: string,
    phoneContactSender: string,
    faxContactSender: string
}

export type Employee = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    numSS: string,
    date: string
}

export type Bonus = {
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
    numSS: string,
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
    numSS: string,
    typeBaseSubject: string,
    amountBaseSubject: string,
    crmBaseSubject?: string,
    date: string
}


export type Base = {

    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    numSS: string,
    date: string,
    idBase: string
}

export type Contact = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    id: number
}
export type ContactSender = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    date: string
}


export type BaseSubject = {

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
    numSS: string,
    idContribution: string,
    ops: string,
    baseContribution: string,
    amountContribution: string,
    idInsee?: string,
    crmContribution?: string,
    rateContribution?: string,
    date: string
}

export type Contribution = {
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

export type EstablishmentContribution = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    date: string
}

export type WorkStopping = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    date: string,
    numSS: string,
}

export type NumSSEmployeeId = {
    numSS: string,
    employeeId: string
}

export type AssignementObject = {
    assignement: string,
    date: string
}

export type MobilityObject = {
    rate: string,
    insee: string,
    siret: string,
    date: string
}

export type IndividualPaymentObject = {
    employeeId: string,
    numSS: string,
    contractId: string,
    datePayment: string,
    netTaxRem: string,
    paymentNumber: string,
    netAmount: string,
    taxRate: string,
    typeTaxRate: string,
    idTaxRate: string,
    amountTax: string,
    amountExo: string,
    amountExoBase: string,
    amoutPas: string,
}

export type IndividualPayment = {
    collection: string,
    contractId: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    numSS: string,
    date: string
}
export type PayroolObject = {
    employeeId: string,
    numSS: string,
    startDatePayrool: string,
    endDatePayrool: string,
    contractId: string,
    type: string,
    hours: string,
    amount: string,
    fpRate?: string,
    rateNuclearPlant?: string,
    datePayTypement: string,
    contributedrate: string,
    increaseRate: string
}
export type Payrool = {
    collection: string,
    contractId: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    numSS: string,
    date: string
}
export type OtherPaymentObject = {
    employeeId: string,
    numSS: string,
    contractId: string,
    type: string,
    amount: string,
    startDateOtherPayment: string,
    endDateOtherPayment: string
}
export type OtherPayment = {
    collection: string,
    contractId: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    numSS: string,
    date: string
}

export type ExtractionRowDSN = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siret?: string,
    numSS?: string
}

export type SocialPaymentObject = {
    siren: string,
    siret: string,
    date: string,
    idSocialPayment: string,
    operationsAssignmentEntity: string,
    contributionFundBIC: string,
    contributionFundIBAN: string,
    contributionFundAmount: string,
    contributionFundStartDate: string,
    contributionFundEndDate: string
    managementDelegateCode: string,
    paymentMethod: string,
    paymentDate: string,
    contributionFundSIRET: string
}

export type MutualEmployeeComplet = MutualObject & MutualEmployeeObject

export interface SmartDsn {
    dsn: DsnObject,
    statement: StatementObject,
    society: SmartSociety,
    sender: SmartSender
    contact: ContactObject[]
    employees: SmartEmployee[]
}

export interface SmartSociety extends SocietyObject {
    establishments: SmartEstablishment[],
    complementOETH: ComplementOETHObject
}

export interface SmartSender extends SenderObject {
    contactSender: ContactSenderObject
}

export interface SmartEstablishment extends EstablishmentObject {
    aggreagreContribution: AggregateContributionObject[],
    specificBankDetails: SpecificBankDetailsObject | undefined
}

export interface SmartEmployee extends EmployeeObject {
    workContracts: SmartWorkContract[],
    workStopping: WorkStoppingObject[],
    bonus: BonusObject[],
    mutual: MutualEmployeeObject[]
}

export interface SmartWorkContract extends WorkContractObject {
    change: ChangeWockContractObject[]
}

