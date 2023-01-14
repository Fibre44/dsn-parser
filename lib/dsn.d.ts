type workContractDefinition = {
    collection: string;
    field: string;
    dsnStructure: string;
    name: string;
    value: string;
};
type dsnObject = {
    softwareName: string | undefined;
    provider: string | undefined;
    softwareVersion: string | undefined;
    dsnVersion: string | undefined;
    type: string | undefined;
    totalRows: string | undefined;
};
type societyObject = {
    siren: string | undefined;
    nic: string | undefined;
    apen: string | undefined;
    adress1: string | undefined;
    adress2: string | undefined;
    adress3: string | undefined;
    zipCode: string | undefined;
    city: string | undefined;
};
type establishmentObject = {
    siren: string;
    nic: string;
    apet: string;
    adress1: string;
    adress2: string;
    adress3: string;
    zipCode: string;
    country: string;
    idcc: string;
    legalStatus: string;
    opco: string;
    city: string;
    date: string;
};
type contributionFundObject = {
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
export declare class DsnParser {
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
    private sirenList;
    private idEstablishmentList;
    private extractions;
    private siren;
    private date;
    init(dir: string, options?: {
        controleDsnVersion: boolean;
        deleteFile: boolean;
    }): Promise<void>;
    get dsn(): dsnObject;
    get society(): societyObject;
    get establishment(): establishmentObject[];
    get contributionFund(): contributionFundObject[];
    get workContract(): workContractDefinition[];
}
export {};
