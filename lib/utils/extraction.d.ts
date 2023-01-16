import type { establishmentObject, mutualEmployeeObject, EmployeeObject, WorkContractObject, societyObject, contributionFund, dsnObject, mutualObject } from "../dsn";
type extractions = extraction[];
export type field = keyof (establishmentObject) | keyof (societyObject) | keyof (contributionFund) | keyof (dsnObject) | keyof (mutualObject) | keyof (EmployeeObject) | keyof (WorkContractObject) | keyof (mutualEmployeeObject) | 'id';
type extraction = {
    collection: string;
    field: field;
    name: string;
    dsnStructure: string;
};
export declare const extractionsList: extractions;
export {};
