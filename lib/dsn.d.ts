type dsnObject = {
    softwareName: string | undefined;
    provider: string | undefined;
    softwareVersion: string | undefined;
    dsnVersion: string | undefined;
    type: string | undefined;
};
type dsn = {
    collection: string;
    field: string;
    dsnStructure: string;
    value: string;
};
type societyObjet = {
    siren: string | undefined;
    nic: string | undefined;
    apen: string | undefined;
    adress1: string | undefined;
    adress2: string | undefined;
    adress3: string | undefined;
    zipCode: string | undefined;
    city: string | undefined;
};
type society = {
    collection: string;
    field: string;
    dsnStructure: string;
    value: string;
};
type establishmentObjet = {
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
type establishment = {
    collection: string;
    field: string;
    dsnStructure: string;
    value: string;
    siren: string;
    idEstablishment: number;
};
export declare class DsnParser {
    private societyList;
    private establishmentList;
    private dsnList;
    private extractions;
    init(dir: string): Promise<void>;
    addSociety(row: society): void;
    addEstablishment(row: establishment): void;
    addDsn(row: dsn): void;
    get dsn(): dsnObject;
    get society(): societyObjet;
    get establishment(): establishmentObjet;
}
export {};
