import type { EstablishmentObject, MutualEmployeeObject, EmployeeObject, WorkContractObject, SocietyObject, ContributionFund, DsnObject, MutualObject, BaseObject, WorkStoppingObject, ContributionObject, EstablishmentContributionObject, BaseSubjectObject, BonusObject } from "../dsn";
type extractions = extraction[];
export type field = keyof (EstablishmentObject) | keyof (SocietyObject) | keyof (ContributionFund) | keyof (WorkStoppingObject) | keyof (DsnObject) | keyof (MutualObject) | keyof (EmployeeObject) | keyof (WorkContractObject) | keyof (MutualEmployeeObject) | keyof (BaseObject) | keyof (ContributionObject) | keyof (EstablishmentContributionObject) | keyof (EstablishmentContributionObject) | keyof (BaseSubjectObject) | keyof (BonusObject) | 'id';
type extraction = {
    collection: string;
    field: field;
    name: string;
    dsnStructure: string;
};
export declare const extractionsList: extractions;
export {};
