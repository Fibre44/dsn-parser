import type { EstablishmentObject, MutualEmployeeObject, EmployeeObject, WorkContractObject, SocietyObject, ContributionFund, DsnObject, MutualObject, BaseObject, ContributionObject, EstablishmentContributionObject, BaseSubjectObject } from "../dsn";
type extractions = extraction[];
export type field = keyof (EstablishmentObject) | keyof (SocietyObject) | keyof (ContributionFund) | keyof (DsnObject) | keyof (MutualObject) | keyof (EmployeeObject) | keyof (WorkContractObject) | keyof (MutualEmployeeObject) | keyof (BaseObject) | keyof (ContributionObject) | keyof (EstablishmentContributionObject) | keyof (EstablishmentContributionObject) | keyof (BaseSubjectObject) | 'id';
type extraction = {
    collection: string;
    field: field;
    name: string;
    dsnStructure: string;
};
export declare const extractionsList: extractions;
export {};
