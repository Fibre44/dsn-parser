export type DsnObject = {
    softwareName: string;
    provider: string;
    softwareVersion: string;
    dsnVersion: string;
    type: string;
    totalRows: string;
    month: string;
};
export type AggregateContributionObject = {
    contributionId: string;
    contributionQualifier: string;
    contriburionRate: string;
    baseAmount: string;
    contributionAmount: string;
    contributionInsee: string;
    contributionCRM: string;
    siret: string;
};
export type SocietyObject = {
    siren: string;
    nic: string;
    apen: string;
    adress1: string;
    adress2?: string;
    adress3?: string;
    zipCode: string;
    city: string;
    date: string;
};
export type BonusObject = {
    siren: string;
    date: string;
    employeeId: string;
    numSS: string;
    typeBonus: string;
    amountBonus: string;
    dateStartBonus: string;
    dateEndBonus: string;
    contractIdBonus: string;
    datePaymentBonus: string;
};
export type ContactObject = {
    siren: string;
    date: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    contactType: string;
};
export type EmployeeObject = {
    numSS: string;
    lastname: string;
    surname: string;
    firstname: string;
    sex: string;
    birthday: string;
    placeOfBith: string;
    address1: string;
    codeZip: string;
    city: string;
    country: string;
    codeZipBith: string;
    countryBirth: string;
    address2?: string;
    address3?: string;
    email?: string;
    employeeId: string;
    graduate?: string;
    studies?: string;
    date: string;
    ntt?: string;
};
export type WorkStoppingObject = {
    employeeId: string;
    numSS: string;
    reasonStop: string;
    lastDayWorked: string;
    estimatedEndDate: string;
    subrogation?: string;
    subrogationStartDate?: string;
    subrogationEndDate?: string;
    iban?: string;
    bic?: string;
    recoveryDate?: string;
    reasonRecovery?: string;
    dateWorkAccident?: string;
    SIRETCentralizer?: string;
    date: string;
    siret: string;
};
export type WorkContractObject = {
    employeeId: string;
    numSS: string;
    startDate: string;
    status: string;
    retirement: string;
    pcs: string;
    pcsBis: string;
    employmentLabel: string;
    contract: string;
    contractId: string;
    publicDispPolitic: string;
    contractEndDate: string;
    DNACodeUnitTime: string;
    DSNWorkQuotaEstablishment: string;
    DSNWorkQuotaWorkContract: string;
    workTime: string;
    ss: string;
    idcc: string;
    mal: string;
    estabWorkPlace: string;
    vieillesse: string;
    pattern: string;
    vacation: string;
    rateProfessionalFess: string;
    foreigner: string;
    exclusionDsn: string;
    statusEmployment: string;
    unemployment: string;
    idPublicEmployer: string;
    methodUnemployment: string;
    joiningDate: string;
    denunciationDate: string;
    dateManagementAgreement: string;
    idAgreement: string;
    healthRiskDelegate: string;
    multipleJobCode: string;
    multipleEmployerCode: string;
    workAccidentRisk: string;
    idWorkAccidentRisk: string;
    positionCollectiveAgreement: string;
    apecita: string;
    rateAt: string;
    contributingFullTime: string;
    tip: string;
    useEstablishmentId: string;
    livePerfomances: string;
    licences: string;
    showId: string;
    showrunner: string;
    fpPcs?: string;
    typePosition?: string;
    fpQuotite?: string;
    partTimeWork?: string;
    serviceCode?: string;
    fpIndice?: string;
    fpIndiceMaj?: string;
    NBI?: string;
    indiceOriginal?: string;
    article15?: string;
    oldEstablishment?: string;
    oldIndice?: string;
    SPP?: string;
    contractual?: string;
    secondment?: string;
    browsing?: string;
    activityDutyRate?: string;
    payLevel?: string;
    echelon?: string;
    coefficient?: string;
    boeth: string;
    addPublicPolicy?: string;
    arrangement?: string;
    finaly?: string;
    navy?: string;
    cnieg?: string;
    activityRate?: string;
    grade?: string;
    cti?: string;
    finess?: string;
    date: string;
};
export type EstablishmentObject = {
    siren: string;
    nic: string;
    apet: string;
    adress1: string;
    adress2?: string;
    adress3?: string;
    zipCode: string;
    country: string;
    idcc: string;
    legalStatus: string;
    opco: string;
    codeZip: string;
    city: string;
    date: string;
};
export type ChangeWockContractObject = {
    employeeId: string;
    contractId: string;
    numSS: string;
    date: string;
    changeDate: string;
    oldStatus: string;
    oldRetirement: string;
    oldContract: string;
    oldSystemConvention: string;
    oldUnitQuota: string;
    oldQuota: string;
    oldModeWorkingTime: string;
    oldSS: string;
    oldCCN: string;
    oldEstablishment: string;
    oldWorkPlace: string;
    oldContractId: string;
    oldReason: string;
    oldProfessionnalFees: string;
    oldForeigner: string;
    oldPCS: string;
    oldPCSFP: string;
    oldContractStartDate: string;
    oldQuotite: string;
    oldPaidHolidays: string;
    oldAPECITA: string;
    oldPartTime: string;
    oldPayroolDepth: string;
    oldFPPCS: string;
    oldPost: string;
    oldFPQuotite: string;
    oldPartTimePercentage: string;
    oldService: string;
    oldFPIndice: string;
    oldFPIndiceMaj: string;
    oldFPNBI: string;
    oldFpIndiceBrutOrigine: string;
    oldArticle15: string;
    oldFPEmployer: string;
    oldEmployeeFPIndiceBrut: string;
    oldSPP: string;
    oldTitulaire: string;
    oldActitRate: string;
    oldLevelPayroll: string;
    oldEchelon: string;
    oldCoeff: string;
    oldNav: string;
    oldBOETH: string;
    oldPublicLaw: string;
    oldDispo: string;
    oldClass: string;
    oldMal: string;
    oldVieil: string;
    oldMarine: string;
    oldCNIEG: string;
    oldPartAct: string;
    oldFPDetachment: string;
    oldPosiCCN: string;
    oldAT: string;
    oldStatusEmployee: string;
    oldMultiple: string;
    oldRank: string;
    oldFPCTI: string;
    oldFINES: string;
};
export type ContributionFund = {
    collection: string;
    field: string;
    dsnStructure: string;
    name: string;
    value: string;
    idEstablishment: number;
    siret: string;
    date: string;
};
export type ContributionFundObject = {
    codeDsn: string;
    name: string;
    adress1: string;
    adress2?: string;
    adress3?: string;
    codeZip: string;
    city: string;
    siret: string;
    date: string;
};
export type MutualObject = {
    contractId?: string;
    organisme?: string;
    delegate?: string;
    covererd?: string;
    techId?: string;
    date: string;
};
export type MutualEmployeeObject = {
    employeeId: string;
    numSS: string;
    option: string;
    pop: string;
    children: string;
    assign: string;
    numberAssign: string;
    otherAssign: string;
    idTechAffiliation: string;
    idTech: string;
    date: string;
    idTechAffiliationMutual: string;
    startDateMutualEmployee: string;
    endDateMutualEmployee: string;
};
export type atObject = {
    code: string;
    rate: string;
    siret: string;
    date: string;
};
export type BaseObject = {
    employeeId: string;
    numSS: string;
    idBase: string;
    startDate: string;
    endDate: string;
    amount: string;
    idTechAff?: string;
    idContract?: string;
    crm?: string;
    date: string;
};
export type BaseSubjectObject = {
    employeeId: string;
    numSS: string;
    typeBaseSubject: string;
    amountBaseSubject: string;
    crmBaseSubject?: string;
    date: string;
};
export type ContributionObject = {
    employeeId: string;
    numSS: string;
    idContribution: string;
    ops: string;
    baseContribution: string;
    amountContribution: string;
    idInsee?: string;
    crmContribution?: string;
    rateContribution?: string;
    date: string;
};
export type EstablishmentContributionObject = {
    codeContribution: string;
    startDat: string;
    endDate: string;
    ref?: string;
    crm?: string;
    date: string;
};
type AssignementObject = {
    assignement: string;
    date: string;
};
export type MobilityObject = {
    rate: string;
    insee: string;
    siret: string;
    date: string;
};
export type IndividualPaymentObject = {
    employeeId: string;
    numSS: string;
    contractId: string;
    datePayment: string;
    netTaxRem: string;
    paymentNumber: string;
    netAmount: string;
    taxRate: string;
    typeTaxRate: string;
    idTaxRate: string;
    amountTax: string;
    amountExo: string;
    amountExoBase: string;
    amoutPas: string;
};
export type PayroolObject = {
    employeeId: string;
    numSS: string;
    startDatePayrool: string;
    endDatePayrool: string;
    contractId: string;
    type: string;
    hours: string;
    amount: string;
    fpRate?: string;
    rateNuclearPlant?: string;
    datePayTypement: string;
    contributedrate: string;
    increaseRate: string;
};
export type OtherPaymentObject = {
    employeeId: string;
    numSS: string;
    contractId: string;
    type: string;
    amount: string;
    startDateOtherPayment: string;
    endDateOtherPayment: string;
};
type MutualEmployeeComplet = MutualObject & MutualEmployeeObject;
export interface SmartDsn extends DsnObject {
    society: SmartSociety;
    contact: ContactObject[];
    employees: SmartEmployee[];
}
interface SmartSociety extends SocietyObject {
    establishments: EstablishmentObject[];
}
interface SmartEmployee extends EmployeeObject {
    workContracts: SmartWorkContract[];
    workStopping: WorkStoppingObject[];
    bonus: BonusObject[];
    mutual: MutualEmployeeObject[];
}
interface SmartWorkContract extends WorkContractObject {
    change: ChangeWockContractObject[];
}
interface IDsnParser {
    asyncInit(dir: string, options: {
        controleDsnVersion: boolean;
        deleteFile: boolean;
    }): Promise<void>;
    get dsn(): DsnObject;
    get society(): SocietyObject;
    get establishment(): EstablishmentObject[];
    get contributionFund(): ContributionFundObject[];
    get employee(): EmployeeObject[];
    get workContract(): WorkContractObject[];
    get changWorkContract(): ChangeWockContractObject[];
    get employeeMutual(): MutualEmployeeComplet[];
    get mutual(): MutualObject[];
    get baseSubject(): BaseSubjectObject[];
    get contribution(): ContributionObject[];
    get assignement(): AssignementObject[];
    get rateMobility(): MobilityObject[];
    get rateAt(): atObject[];
    get bonus(): BonusObject[];
    get individualPayment(): IndividualPaymentObject[];
    get payrool(): PayroolObject[];
    get otherPayment(): OtherPaymentObject[];
    get smartExtraction(): SmartDsn;
}
export declare class DsnParser implements IDsnParser {
    private dsnVersion;
    private societyList;
    private establishmentList;
    private dsnList;
    private contributionFundList;
    private workContractList;
    private mutualList;
    private mutualEmployeeList;
    private employeeList;
    private numSSList;
    private idEstablishmentList;
    private extractions;
    private mutualIdList;
    private baseList;
    private baseSubjectList;
    private numSSEmployeeIdList;
    private contributionList;
    private workStoppingList;
    private aggregateContributionList;
    private bonusList;
    private establishmentContributionList;
    private changeWorkContractList;
    private payroolList;
    private otherPaymentList;
    private individualPayementList;
    private contactList;
    private siren;
    private date;
    private contactIdList;
    private aggregateContributionIdList;
    asyncInit(dir: string, options?: {
        controleDsnVersion: boolean;
        deleteFile: boolean;
    }): Promise<void>;
    /**
     * Retourne les informations de base de la DSN bloc S10.G00.00
     */
    get dsn(): DsnObject;
    /**
     * Retourne les informations de la société bloc S21.G00.06
     */
    get society(): SocietyObject;
    /**
     * Retourne la liste des établissements de la DSN bloc S21.G00.11
     */
    get establishment(): EstablishmentObject[];
    /**
     * Retourne la liste des organismes sociaux
     */
    get contributionFund(): ContributionFundObject[];
    /**
     * Retourne la liste des employés bloc S21.G00.30
     */
    get employee(): EmployeeObject[];
    /**
     * Retourne les cotisations agrégée bloc S21.G00.23
     */
    get aggregateContribution(): AggregateContributionObject[];
    /**
     * Retourne la liste des contacts de la DSN structure S20.G00.007
     */
    get contact(): ContactObject[];
    /**
     * Retourne la liste des contrats de travails bloc S21.G00.40
     */
    get workContract(): WorkContractObject[];
    get changWorkContract(): ChangeWockContractObject[];
    get workStopping(): WorkStoppingObject[];
    get employeeMutual(): MutualEmployeeComplet[];
    get mutual(): MutualObject[];
    get base(): BaseObject[];
    get baseSubject(): BaseSubjectObject[];
    /**
     *    get establishmentContribution(): EstablishmentContributionObject[] {
        const establishmentContributionList: EstablishmentContributionObject[] = []

        for (let establishmentContribution of this.establishmentContributionList) {

        }

        return establishmentContributionList
    }
     */
    get contribution(): ContributionObject[];
    get assignement(): AssignementObject[];
    get rateMobility(): MobilityObject[];
    get rateAt(): atObject[];
    get extraction(): {
        collection: string;
        field: import("./utils/extraction").field;
        name: string;
        dsnStructure: string;
    }[];
    get bonus(): BonusObject[];
    get individualPayment(): IndividualPaymentObject[];
    get payrool(): PayroolObject[];
    get otherPayment(): OtherPaymentObject[];
    get smartExtraction(): SmartDsn;
}
export {};
