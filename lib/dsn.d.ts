type societyList = society[];
type establishmentList = establishment[];
type society = {
    collection: string;
    field: string;
    dsnStructure: string;
    value: string;
};
type establishment = {
    collection: string;
    field: string;
    dsnStructure: string;
    value: string;
    siren: string;
};
export declare class DsnParser {
    private societyList;
    private establishmentList;
    private extractions;
    init(dir: string): Promise<void>;
    addSociety(row: society): void;
    addEstablishment(row: establishment): void;
    get society(): societyList;
    get establishment(): establishmentList;
}
export {};
