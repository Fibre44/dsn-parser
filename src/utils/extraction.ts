import type { establishmentObject, mutualEmployeeObject, EmployeeObject, WorkContractObject, societyObject, contributionFund, dsnObject, mutualObject } from "../dsn"
type extractions = extraction[]
export type field = keyof (establishmentObject) | keyof (societyObject) | keyof (contributionFund) | keyof (dsnObject) | keyof (mutualObject) | keyof (EmployeeObject) | keyof (WorkContractObject) | keyof (mutualEmployeeObject) | 'id'
type extraction = {
    collection: string,
    field: field,
    name: string,
    dsnStructure: string
}

export const extractionsList: extractions = [
    {
        collection: 'Dsn',
        field: 'softwareName',
        name: 'Nom du logiciel utilisé',
        dsnStructure: 'S10.G00.00.001',
    },
    {
        collection: 'Dsn',
        field: 'provider',
        name: `Nom de l'éditeur`,
        dsnStructure: 'S10.G00.00.002',
    },
    {
        collection: 'Dsn',
        field: 'softwareVersion',
        name: 'Numéro de version du logiciel utilisé',
        dsnStructure: 'S10.G00.00.003',
    },
    {
        collection: 'Dsn',
        field: 'dsnVersion',
        name: 'Numéro de version de la norme utilisée',
        dsnStructure: 'S10.G00.00.006',
    },
    {
        collection: 'Dsn',
        field: 'type',
        name: `Type de l'envoi`,
        dsnStructure: 'S10.G00.00.008',
    },
    {
        collection: 'Dsn',
        field: 'totalRows',
        name: 'Total',
        dsnStructure: 'S90.G00.90.001',
    },
    {
        collection: 'Dsn',
        field: 'month',
        name: 'Date du mois principal déclaré',
        dsnStructure: 'S20.G00.05.005',
    },
    {
        collection: 'Society',
        field: 'siren',
        name: 'SIREN',
        dsnStructure: 'S21.G00.06.001',
    },
    {
        collection: 'Society',
        field: 'nic',
        name: 'NIC du siège',
        dsnStructure: 'S21.G00.06.002',
    },
    {
        collection: 'Society',
        field: 'apen',
        name: 'Code APEN',
        dsnStructure: 'S21.G00.06.003',
    },
    {
        collection: 'Society',
        field: 'adress1',
        name: 'Numéro, extension, nature et libellé de la voie',
        dsnStructure: 'S21.G00.06.004',
    },
    {
        collection: 'Society',
        field: 'adress2',
        name: 'Complément de la localisation de la construction',
        dsnStructure: 'S21.G00.06.007',
    },
    {
        collection: 'Society',
        field: 'adress3',
        name: 'Service de distribution, complément de localisation de la voie',
        dsnStructure: 'S21.G00.06.008',
    },
    {
        collection: 'Society',
        field: 'zipCode',
        name: 'Code postal',
        dsnStructure: 'S21.G00.06.005',
    },
    {
        collection: 'Society',
        field: 'city',
        name: 'Localité',
        dsnStructure: 'S21.G00.06.006',
    },
    {
        collection: 'Society',
        field: 'idcc',
        name: 'Code convention collective applicable',
        dsnStructure: 'S21.G00.06.015',
    },
    {
        collection: 'Establishment',
        field: 'nic',
        name: 'NIC',
        dsnStructure: 'S21.G00.11.001',
    },
    {
        collection: 'Establishment',
        field: 'apet',
        name: 'Code APET',
        dsnStructure: 'S21.G00.11.002',
    },
    {
        collection: 'Establishment',
        field: 'adress1',
        name: 'Numéro, extension, nature et libellé de la voie',
        dsnStructure: 'S21.G00.11.003',
    },
    {
        collection: 'Establishment',
        field: 'codeZip',
        name: 'Code postal',
        dsnStructure: 'S21.G00.11.004',
    },
    {
        collection: 'Establishment',
        field: 'city',
        name: 'Localité',
        dsnStructure: 'S21.G00.11.005',
    },
    {
        collection: 'Establishment',
        field: 'adress2',
        name: 'Complément de la localisation de la construction',
        dsnStructure: 'S21.G00.11.006',
    },
    {
        collection: 'Establishment',
        field: 'adress3',
        name: 'Service de distribution, complément de localisation de la voie',
        dsnStructure: 'S21.G00.11.007',
    },
    {
        collection: 'Establishment',
        field: 'country',
        name: 'Code pays',
        dsnStructure: 'S21.G00.11.015',
    },
    {
        collection: 'Establishment',
        field: 'legalStatus',
        name: `Nature juridique de l'employeur`,
        dsnStructure: 'S21.G00.11.017',
    },
    {
        collection: 'Establishment',
        field: 'idcc',
        name: 'Code convention collective principale',
        dsnStructure: 'S21.G00.11.022',
    },
    {
        collection: 'Establishment',
        field: 'opco',
        name: 'Opérateur de compétences (OPCO)',
        dsnStructure: 'S21.G00.11.023',
    },
    {
        collection: 'Mutual',
        field: 'contractId',
        name: 'Référence du contrat de Prévoyance',
        dsnStructure: 'S21.G00.15.001',
    },
    {
        collection: 'Mutual',
        field: 'organisme',
        name: 'Code organisme de Prévoyance',
        dsnStructure: 'S21.G00.15.002',
    },
    {
        collection: 'Mutual',
        field: 'delegate',
        name: 'Code délégataire de gestion',
        dsnStructure: 'S21.G00.15.003',
    },
    {
        collection: 'Mutual',
        field: 'covererd',
        name: 'Personnel couvert',
        dsnStructure: 'S21.G00.15.004',
    },
    {
        collection: 'Mutual',
        field: 'techId',
        name: 'Identifiant technique Adhésion',
        dsnStructure: 'S21.G00.15.005',
    },
    {
        collection: 'ContributionFund',
        field: 'id',
        name: 'Identifiant Organisme de Protection Sociale',
        dsnStructure: 'S21.G00.20.001',
    },
    {
        collection: 'Employee',
        field: 'numSS',
        name: `Numéro d'inscription au répertoire`,
        dsnStructure: 'S21.G00.30.001',
    },
    {
        collection: 'Employee',
        field: 'lastname',
        name: 'Nom de famille',
        dsnStructure: 'S21.G00.30.002',
    },
    {
        collection: 'Employee',
        field: 'surname',
        name: `Nom d'usage`,
        dsnStructure: 'S21.G00.30.003',
    },
    {
        collection: 'Employee',
        field: 'firstname',
        name: 'Prénoms',
        dsnStructure: 'S21.G00.30.004',
    },
    {
        collection: 'Employee',
        field: 'sex',
        name: 'Sexe',
        dsnStructure: 'S21.G00.30.005',
    },
    {
        collection: 'Employee',
        field: 'birthday',
        name: 'Date de naissance',
        dsnStructure: 'S21.G00.30.006',
    },
    {
        collection: 'Employee',
        field: 'placeOfBith',
        name: 'Lieu de naissance',
        dsnStructure: 'S21.G00.30.007',
    },
    {
        collection: 'Employee',
        field: 'address1',
        name: 'Numéro, extension, nature et libellé de la voie',
        dsnStructure: 'S21.G00.30.008',
    },
    {
        collection: 'Employee',
        field: 'codeZip',
        name: 'Code postal',
        dsnStructure: 'S21.G00.30.009',
    },
    {
        collection: 'Employee',
        field: 'city',
        name: 'Localité',
        dsnStructure: 'S21.G00.30.010',
    },
    {
        collection: 'Employee',
        field: 'country',
        name: 'Code pays',
        dsnStructure: 'S21.G00.30.011',
    },
    {
        collection: 'Employee',
        field: 'codeZipBith',
        name: 'Code département de naissance',
        dsnStructure: 'S21.G00.30.014',
    },
    {
        collection: 'Employee',
        field: 'countryBirth',
        name: 'Code pays de naissance',
        dsnStructure: 'S21.G00.30.015',
    },
    {
        collection: 'Employee',
        field: 'address2',
        name: 'Complément de la localisation de la construction',
        dsnStructure: 'S21.G00.30.016',
    },
    {
        collection: 'Employee',
        field: 'address3',
        name: 'Service de distribution, complément de localisation de la voie',
        dsnStructure: 'S21.G00.30.017',
    },
    {
        collection: 'Employee',
        field: 'email',
        name: 'Adresse mél',
        dsnStructure: 'S21.G00.30.018',
    },
    {
        collection: 'Employee',
        field: 'employeeId',
        name: 'matricule',
        dsnStructure: 'S21.G00.30.019',
    },
    {
        collection: 'Employee',
        field: 'graduate',
        name: 'niveau',
        dsnStructure: 'S21.G00.30.024',
    },
    {
        collection: 'Employee',
        field: 'studies',
        name: `Niveau de diplôme préparé par l'individu`,
        dsnStructure: 'S21.G00.30.025',
    },
    {
        collection: 'WorkContract',
        field: 'startDate',
        name: 'Date de début du contrat',
        dsnStructure: 'S21.G00.40.001'
    },
    {
        collection: 'WorkContract',
        field: 'status',
        name: 'Statut du salarié (conventionnel)',
        dsnStructure: 'S21.G00.40.002'
    },
    {
        collection: 'WorkContract',
        field: 'retirement',
        name: 'Code statut catégoriel Retraite Complémentaire obligatoire',
        dsnStructure: 'S21.G00.40.003'
    },
    {
        collection: 'WorkContract',
        field: 'pcs',
        name: 'Code profession et catégorie socioprofessionnelle (PCS-ESE)',
        dsnStructure: 'S21.G00.40.004'
    },
    {
        collection: 'WorkContract',
        field: 'pcsBis',
        name: 'Code complément PCS-ESE (pour la fonction publique : référentiels NEH, NET et grade de la NNE)',
        dsnStructure: 'S21.G00.40.00('
    },
    {
        collection: 'WorkContract',
        field: 'employmentLabel',
        name: `Libellé de l'emploi`,
        dsnStructure: 'S21.G00.40.006'
    },
    {
        collection: 'WorkContract',
        field: 'contract',
        name: 'Nature du contrat',
        dsnStructure: 'S21.G00.40.007'
    },
    {
        collection: 'WorkContract',
        field: 'publicDispPolitic',
        name: 'Dispositif de politique publique et conventionnel',
        dsnStructure: 'S21.G00.40.008'
    },
    {
        collection: 'WorkContract',
        field: 'contractId',
        name: 'Numéro du contrat',
        dsnStructure: 'S21.G00.40.009'
    },
    {
        collection: 'WorkContract',
        field: 'contractEndDate',
        name: 'Date de fin prévisionnelle du contrat',
        dsnStructure: 'S21.G00.40.010'
    },
    {
        collection: 'WorkContract',
        field: 'DNACodeUnitTime',
        name: 'Unité de mesure de la quotité de travail',
        dsnStructure: 'S21.G00.40.011'
    },
    {
        collection: 'WorkContract',
        field: `DSNWorkQuotaEstablishment`,
        name: `Quotité de travail de référence de l'entreprise pour la catégorie de salarié`,
        dsnStructure: 'S21.G00.40.012'
    },
    {
        collection: 'WorkContract',
        field: `DSNWorkQuotaWorkContract`,
        name: 'Quotité de travail du contrat',
        dsnStructure: 'S21.G00.40.013'
    },
    {
        collection: 'WorkContract',
        field: 'workTime',
        name: `Modalité d'exercice du temps de travail`,
        dsnStructure: 'S21.G00.40.014'
    },
    {
        collection: 'WorkContract',
        field: 'ss',
        name: 'Complément de base au régime obligatoire',
        dsnStructure: 'S21.G00.40.016'
    },
    {
        collection: 'WorkContract',
        field: 'idcc',
        name: 'Code convention collective applicable',
        dsnStructure: 'S21.G00.40.017'
    },
    {
        collection: 'WorkContract',
        field: 'mal',
        name: 'Code régime de base risque maladie',
        dsnStructure: 'S21.G00.40.018'
    },
    {
        collection: 'WorkContract',
        field: 'estabWorkPlace',
        name: 'Identifiant du lieu de travail',
        dsnStructure: 'S21.G00.40.019'
    },
    {
        collection: 'WorkContract',
        field: 'vieillesse',
        name: 'Code régime de base risque vieillesse',
        dsnStructure: 'S21.G00.40.020'
    },
    {
        collection: 'WorkContract',
        field: 'pattern',
        name: 'Motif de recours',
        dsnStructure: 'S21.G00.40.021'
    },
    {
        collection: 'WorkContract',
        field: 'vacation',
        name: 'Code caisse professionnelle de congés payés',
        dsnStructure: 'S21.G00.40.022'
    },
    {
        collection: 'WorkContract',
        field: 'rateProfessionalFess',
        name: 'Taux de déduction forfaitaire spécifique pour frais professionnels',
        dsnStructure: 'S21.G00.40.023'
    },
    {
        collection: 'WorkContract',
        field: 'foreigner',
        name: `Travailleur à l'étranger au sens du code de la Sécurité Sociale`,
        dsnStructure: 'S21.G00.40.024'
    },
    {
        collection: 'WorkContract',
        field: 'exclusionDsn',
        name: `Motif d'exclusion DSN`,
        dsnStructure: 'S21.G00.40.025'
    },
    {
        collection: 'WorkContract',
        field: 'statusEmployment',
        name: `Statut d'emploi du salarié`,
        dsnStructure: 'S21.G00.40.026'
    },
    {
        collection: 'WorkContract',
        field: 'unemployment',
        name: `Code affectation Assurance chômage`,
        dsnStructure: 'S21.G00.40.027'
    },
    {
        collection: 'WorkContract',
        field: 'idPublicEmployer',
        name: `Numéro interne employeur public`,
        dsnStructure: 'S21.G00.40.028'
    },
    {
        collection: 'WorkContract',
        field: 'methodUnemployment',
        name: `Type de gestion de l’Assurance chômage`,
        dsnStructure: 'S21.G00.40.029'
    },
    {
        collection: 'WorkContract',
        field: 'joiningDate',
        name: `Date d'adhésion`,
        dsnStructure: 'S21.G00.40.030'
    },
    {
        collection: 'WorkContract',
        field: 'joiningDate',
        name: `Date d'adhésion`,
        dsnStructure: 'S21.G00.40.030'
    },
    {
        collection: 'WorkContract',
        field: 'denunciationDate',
        name: `Date de dénonciation`,
        dsnStructure: 'S21.G00.40.031'
    },
    {
        collection: 'WorkContract',
        field: 'dateManagementAgreement',
        name: `Date d’effet de la convention de gestion`,
        dsnStructure: 'S21.G00.40.032'
    },
    {
        collection: 'WorkContract',
        field: 'idAgreement',
        name: `Numéro de convention de gestion`,
        dsnStructure: 'S21.G00.40.033'
    },
    {
        collection: 'WorkContract',
        field: 'healthRiskDelegate',
        name: `Code délégataire du risque maladie`,
        dsnStructure: 'S21.G00.40.035'
    },
    {
        collection: 'WorkContract',
        field: 'multipleJobCode',
        name: `Code emplois multiples`,
        dsnStructure: 'S21.G00.40.036'
    },
    {
        collection: 'WorkContract',
        field: 'multipleEmployerCode',
        name: 'Code employeurs multiples',
        dsnStructure: 'S21.G00.40.037'
    },
    {
        collection: 'WorkContract',
        field: 'workAccidentRisk',
        name: 'Code régime de base risque accident du travail',
        dsnStructure: 'S21.G00.40.039'
    },
    {
        collection: 'WorkContract',
        field: 'idWorkAccidentRisk',
        name: 'Code risque accident du travail',
        dsnStructure: 'S21.G00.40.040'
    },
    {
        collection: 'WorkContract',
        field: 'positionCollectiveAgreement',
        name: 'Positionnement dans la convention collective',
        dsnStructure: 'S21.G00.40.041'
    },
    {
        collection: 'WorkContract',
        field: 'apecita',
        name: 'Code statut catégoriel APECITA',
        dsnStructure: 'S21.G00.40.042'
    },
    {
        collection: 'WorkContract',
        field: 'rateAt',
        name: 'Taux de cotisation accident du travail',
        dsnStructure: 'S21.G00.40.043'
    },
    {
        collection: 'WorkContract',
        field: 'contributingFullTime',
        name: 'Salarié à temps partiel cotisant à temps plein',
        dsnStructure: 'S21.G00.40.044'
    },
    {
        collection: 'WorkContract',
        field: 'tip',
        name: 'Rémunération au pourboire',
        dsnStructure: 'S21.G00.40.045'
    },
    {
        collection: 'WorkContract',
        field: 'useEstablishmentId',
        name: 'Identifiant de l’établissement utilisateur',
        dsnStructure: 'S21.G00.40.046'
    },
    {
        collection: 'WorkContract',
        field: 'livePerfomances',
        name: 'Numéro de label « Prestataire de services du spectacle vivant',
        dsnStructure: 'S21.G00.40.048'
    },
    {
        collection: 'WorkContract',
        field: 'licences',
        name: 'Numéro de licence entrepreneur spectacle',
        dsnStructure: 'S21.G00.40.049'
    },
    {
        collection: 'WorkContract',
        field: 'showId',
        name: 'Numéro objet spectacle',
        dsnStructure: 'S21.G00.40.050'
    },
    {
        collection: 'WorkContract',
        field: 'showrunner',
        name: 'Statut organisateur spectacle',
        dsnStructure: 'S21.G00.40.051'
    },
    {
        collection: 'WorkContract',
        field: 'fpPcs',
        name: `[FP] Code complément PCS-ESE pour la fonction publique d'Etat(emploi de la NNE)`,
        dsnStructure: 'S21.G00.40.052'
    },
    {
        collection: 'WorkContract',
        field: 'typePosition',
        name: `Nature du poste`,
        dsnStructure: 'S21.G00.40.053'
    },
    {
        collection: 'WorkContract',
        field: 'fpQuotite',
        name: `[FP] Quotité de travail de référence de l'entreprise pour la catégorie de salarié dans l’hypothèse d’un poste à temps complet`,
        dsnStructure: 'S21.G00.40.054'
    },
    {
        collection: 'WorkContract',
        field: 'partTimeWork',
        name: `Taux de travail à temps partiel`,
        dsnStructure: 'S21.G00.40.055'
    },
    {
        collection: 'WorkContract',
        field: 'serviceCode',
        name: `Code catégorie de service`,
        dsnStructure: 'S21.G00.40.056'
    },
    {
        collection: 'WorkContract',
        field: 'fpIndice',
        name: `[FP] Indice brut`,
        dsnStructure: 'S21.G00.40.057'
    },
    {
        collection: 'WorkContract',
        field: 'fpIndiceMaj',
        name: `[FP] Indice majoré`,
        dsnStructure: 'S21.G00.40.058'
    },
    {
        collection: 'WorkContract',
        field: 'NBI',
        name: `[FP] Nouvelle bonification indiciaire (NBI)`,
        dsnStructure: 'S21.G00.40.059'
    },
    {
        collection: 'WorkContract',
        field: 'indiceOriginal',
        name: `[FP] Indice brut d'origine`,
        dsnStructure: 'S21.G00.40.060'
    },
    {
        collection: 'WorkContract',
        field: 'article15',
        name: `[FP] Indice brut de cotisation dans un emploi supérieur (article 15)`,
        dsnStructure: 'S21.G00.40.061'
    },
    {
        collection: 'WorkContract',
        field: 'oldEstablishment',
        name: `[FP] Ancien employeur public`,
        dsnStructure: 'S21.G00.40.062'
    },
    {
        collection: 'WorkContract',
        field: 'oldIndice',
        name: `[FP] Indice brut d’origine ancien salarié employeur public`,
        dsnStructure: 'S21.G00.40.063'
    },
    {
        collection: 'WorkContract',
        field: 'SPP',
        name: `[FP] Indice brut d’origine sapeur-pompier professionnel (SPP)`,
        dsnStructure: 'S21.G00.40.064'
    },
    {
        collection: 'WorkContract',
        field: 'contractual',
        name: `[FP] Maintien du traitement d'origine d'un contractuel titulaire`,
        dsnStructure: 'S21.G00.40.065'
    },
    {
        collection: 'WorkContract',
        field: 'secondment',
        name: `[FP] Type de détachement`,
        dsnStructure: 'S21.G00.40.066'
    },
    {
        collection: 'WorkContract',
        field: 'browsing',
        name: `Genre de navigation`,
        dsnStructure: 'S21.G00.40.067'
    },
    {
        collection: 'WorkContract',
        field: 'activityDutyRate',
        name: `Taux de service actif`,
        dsnStructure: 'S21.G00.40.068'
    },
    {
        collection: 'WorkContract',
        field: 'payLevel',
        name: `Niveau de rémunération`,
        dsnStructure: 'S21.G00.40.069'
    },
    {
        collection: 'WorkContract',
        field: 'echelon',
        name: 'Echelon',
        dsnStructure: 'S21.G00.40.070'
    },
    {
        collection: 'WorkContract',
        field: 'coefficient',
        name: 'Coefficient',
        dsnStructure: 'S21.G00.40.071'
    },
    {
        collection: 'WorkContract',
        field: 'boeth',
        name: 'Statut BOETH',
        dsnStructure: 'S21.G00.40.072'
    },
    {
        collection: 'WorkContract',
        field: 'addPublicPolicy',
        name: 'Complément de dispositif de politique publique',
        dsnStructure: 'S21.G00.40.073'
    },
    {
        collection: 'WorkContract',
        field: 'arrangement',
        name: `Cas de mise à disposition externe d'un individu de l'établissement`,
        dsnStructure: 'S21.G00.40.074'
    },
    {
        collection: 'WorkContract',
        field: 'finaly',
        name: `Catégorie de classement finale`,
        dsnStructure: 'S21.G00.40.075'
    },
    {
        collection: 'WorkContract',
        field: 'navy',
        name: `Identifiant du contrat d'engagement maritime`,
        dsnStructure: 'S21.G00.40.076'
    },
    {
        collection: 'WorkContract',
        field: 'cnieg',
        name: `Collège (CNIEG)`,
        dsnStructure: 'S21.G00.40.077'
    },
    {
        collection: 'WorkContract',
        field: 'activityRate',
        name: `Forme d'aménagement du temps de travail dans le cadre de l'activité partielle`,
        dsnStructure: 'S21.G00.40.078'
    },
    {
        collection: 'WorkContract',
        field: 'grade',
        name: `Grade`,
        dsnStructure: 'S21.G00.40.079'
    },
    {
        collection: 'WorkContract',
        field: 'cti',
        name: `[FP] Indice complément de traitement indiciaire (CTI)`,
        dsnStructure: 'S21.G00.40.080'
    },
    {
        collection: 'WorkContract',
        field: 'finess',
        name: `FINESS géographique`,
        dsnStructure: 'S21.G00.40.081'
    },
    {
        collection: 'mutualEmployee',
        field: 'option',
        name: 'Code option retenue par le salarié',
        dsnStructure: 'S21.G00.70.004'
    },
    {
        collection: 'mutualEmployee',
        field: 'pop',
        name: 'Code population de rattachement',
        dsnStructure: 'S21.G00.70.005'
    },
    {
        collection: 'mutualEmployee',
        field: 'children',
        name: 'Nombre d’enfants à charge',
        dsnStructure: 'S21.G00.70.007'
    },
    {
        collection: 'mutualEmployee',
        field: 'assign',
        name: `Nombre d'adultes ayants- droit(conjoint, concubin, ...)`,
        dsnStructure: 'S21.G00.70.008'
    },
    {
        collection: 'mutualEmployee',
        field: 'numberAssign',
        name: `Nombre d'ayants- droit`,
        dsnStructure: 'S21.G00.70.009'
    },
    {
        collection: 'mutualEmployee',
        field: 'otherAssign',
        name: `Nombre d'ayants- droit autres(ascendants, collatéraux...)`,
        dsnStructure: 'S21.G00.70.010'
    },
    {
        collection: 'mutualEmployee',
        field: 'idTechAffiliation',
        name: 'Date de début de l’affiliation',
        dsnStructure: 'S21.G00.70.014'
    },
    {
        collection: 'mutualEmployee',
        field: 'idTech',
        name: 'Date de fin de l’affiliation',
        dsnStructure: 'S21.G00.70.015'
    },
]