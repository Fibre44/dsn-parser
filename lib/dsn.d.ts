type workContractDefinition = {
    typeOfContract: string;
    NameOfCOntract: string;
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
    siren: string | undefined;
    nic: string | undefined;
    apet: string | undefined;
    adress1: string | undefined;
    adress2: string | undefined;
    adress3: string | undefined;
    zipCode: string | undefined;
    country: string | undefined;
    idcc: string | undefined;
    legalStatus: string | undefined;
    opco: string | undefined;
    city: string | undefined;
    idEstablishment: number | undefined;
};
type contributionFund = {
    codeDsn: string;
    name: string;
    adress1: string;
    adress2?: string;
    adress3?: string;
    codeZip: string;
    city: string;
    idEstablishment?: number;
};
type assignementObject = {
    value: string;
};
type classificationObject = {
    nature: string;
    value: string;
    idcc: string;
};
type atObject = {
    code: string;
    rate: string;
    idEstablishment: number;
};
export declare class DsnParser {
    private workContractSet;
    private contributionFundSet;
    private atSet;
    private dsnVersion;
    private societyList;
    private establishmentList;
    private dsnList;
    private classificationList;
    private contributionFundList;
    private workContractList;
    private atList;
    private extractions;
    init(dir: string, options?: {
        controleDsnVersion: boolean;
        deleteFile: boolean;
    }): Promise<void>;
    private addSociety;
    private addEstablishment;
    private addDsn;
    private addClassification;
    private addAt;
    private addContributionFund;
    private addWorkContract;
    get dsn(): dsnObject;
    get society(): societyObject;
    get establishment(): establishmentObject;
    get at(): atObject[];
    get assignement(): assignementObject[];
    get classifications(): classificationObject[];
    get contributionFund(): contributionFund[];
    get workContract(): workContractDefinition[];
}
export {};
