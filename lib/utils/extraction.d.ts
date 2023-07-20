import type { EstablishmentObject, ContactSenderObject, MutualEmployeeObject, EmployeeObject, SenderObject, WorkContractObject, SocietyObject, ContributionFund, DsnObject, MutualObject, BaseObject, WorkStoppingObject, ContributionObject, EstablishmentContributionObject, BaseSubjectObject, BonusObject, ChangeWockContractObject, IndividualPaymentObject, PayroolObject, OtherPaymentObject, ContactObject, AggregateContributionObject } from "../dsn";
type extractions = extraction[];
export type field = keyof (AggregateContributionObject) | keyof (ContactObject) | keyof (ContactSenderObject) | keyof (SenderObject) | keyof (EstablishmentObject) | keyof (SocietyObject) | keyof (ContributionFund) | keyof (WorkStoppingObject) | keyof (DsnObject) | keyof (MutualObject) | keyof (EmployeeObject) | keyof (WorkContractObject) | keyof (MutualEmployeeObject) | keyof (BaseObject) | keyof (ContributionObject) | keyof (EstablishmentContributionObject) | keyof (BaseSubjectObject) | keyof (BonusObject) | keyof (ChangeWockContractObject) | keyof (IndividualPaymentObject) | keyof (PayroolObject) | keyof (OtherPaymentObject) | 'id';
type extraction = {
    collection: string;
    field: field;
    name: string;
    dsnStructure: string;
};
export declare const extractionsList: extractions;
export {};
