import { WorkStoppingObject, MutualObject, BaseSubjectObject, MutualEmployeeComplet, WorkContractObject, EmployeeObject, ContactObject, ContributionFundObject, EstablishmentObject, SpecificBankDetailsObject, ContactSenderObject, SenderObject, StatementObject, SocialPaymentObject, ComplementOETHObject, SocietyObject, DsnObject, ContributionSlipObject, ExtractionRowDSN, Establishment, Dsn, AggregateContributionObject, ChangeWockContractObject, IndividualPaymentObject, AssignementObject, MobilityObject, atObject, BaseObject, ContributionObject, BonusObject, PayroolObject, OtherPaymentObject, SmartDsn } from './utils/type';
export declare class DsnParser {
    private dsnVersion;
    private _societyList;
    private _establishmentList;
    private _dsnList;
    private statementList;
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
    private contactIdList;
    private aggregateContributionIdList;
    private senderList;
    private contactSenderList;
    private specificBankDetailsList;
    private complementOETHList;
    private _socialPaymentList;
    private _date;
    private _siren;
    private _contributionSlipList;
    asyncInit(dir: string, options?: {
        controleDsnVersion: boolean;
        deleteFile: boolean;
    }): Promise<void>;
    set establishmentList(value: Establishment);
    set contributionSlip(value: ExtractionRowDSN);
    set societyList(value: ExtractionRowDSN);
    set socialPaymentList(value: ExtractionRowDSN);
    set dsnList(value: ExtractionRowDSN);
    set date(value: string);
    set siren(value: string);
    /**
     * Retourne les informations de base de la DSN bloc S10.G00.00
     */
    get dsn(): DsnObject;
    /**
     * Retourne les informations de base de la DSN bloc S21.G00.22
     */
    get contributionSlip(): ContributionSlipObject[];
    /**
     * make a dynamic object
     * @param datas
     * @returns { Object}
     */
    makeDynamicObject<T>(datas: Dsn[]): T;
    /**
     * Retourne les informations de base de la DSN bloc S21.G00.13
     */
    get complementOETH(): ComplementOETHObject;
    get socialPayment(): SocialPaymentObject;
    /**
     * Retourne les informations du bloc S20.G00.05
     */
    get statement(): StatementObject;
    /**
     * Retourne les informations du bloc S10.G00.01
     */
    get sender(): SenderObject;
    /**
     * Retourne les informations du bloc S10.G00.02
     */
    get contactSender(): ContactSenderObject;
    /**
     * Retourne les informations du bloc S21.G00.12
     */
    get specificBankDetails(): SpecificBankDetailsObject[];
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
    get contribution(): ContributionObject[];
    get assignement(): AssignementObject[];
    get rateMobility(): MobilityObject[];
    get rateAt(): atObject[];
    /**
     * retourne le détail de l'extraction
     */
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
