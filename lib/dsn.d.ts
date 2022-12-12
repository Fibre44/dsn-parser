type dsnObject = {
    softwareName: string | undefined;
    provider: string | undefined;
    softwareVersion: string | undefined;
    dsnVersion: string | undefined;
    type: string | undefined;
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
type classification = {
    collection: string;
    field: string;
    dsnStructure: string;
    value: string;
    idcc: string;
};
type assignementObject = {
    value: string;
};
type classificationObject = {
    nature: string;
    value: string;
    idcc: string;
};
export declare class DsnParser {
    private societyList;
    private establishmentList;
    private dsnList;
    private classificationList;
    private extractions;
    init(dir: string): Promise<void>;
    private addSociety;
    private addEstablishment;
    private addDsn;
    addClassification(row: classification): void;
    get dsn(): dsnObject;
    get society(): societyObject;
    get establishment(): establishmentObject;
    get assignement(): assignementObject[];
    get classifications(): classificationObject[];
}
export {};
