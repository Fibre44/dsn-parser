"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractionsList = void 0;
exports.extractionsList = [
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
        collection: 'Contact',
        field: 'contactName',
        name: 'Nom et prénom du contact',
        dsnStructure: 'S20.G00.07.001',
    },
    {
        collection: 'Contact',
        field: 'contactPhone',
        name: 'Adresse téléphonique',
        dsnStructure: 'S20.G00.07.002',
    },
    {
        collection: 'Contact',
        field: 'contactEmail',
        name: 'Adresse mél du contact',
        dsnStructure: 'S20.G00.07.003',
    },
    {
        collection: 'Contact',
        field: 'contactType',
        name: 'Type',
        dsnStructure: 'S20.G00.07.004',
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
        collection: 'AggregateContribution',
        field: 'contributionId',
        name: 'Code de cotisation',
        dsnStructure: 'S21.G00.23.001',
    },
    {
        collection: 'AggregateContribution',
        field: 'contributionQualifier',
        name: `Qualifiant d'assiette`,
        dsnStructure: 'S21.G00.23.002',
    },
    {
        collection: 'AggregateContribution',
        field: 'contriburionRate',
        name: `Taux de cotisation`,
        dsnStructure: 'S21.G00.23.003',
    },
    {
        collection: 'AggregateContribution',
        field: 'baseAmount',
        name: `Montant d'assiette`,
        dsnStructure: 'S21.G00.23.004',
    },
    {
        collection: 'AggregateContribution',
        field: 'contributionAmount',
        name: `Montant de cotisation`,
        dsnStructure: 'S21.G00.23.005',
    },
    {
        collection: 'AggregateContribution',
        field: 'contributionInsee',
        name: `Code INSEE commune`,
        dsnStructure: 'S21.G00.23.006',
    },
    {
        collection: 'AggregateContribution',
        field: 'contributionCRM',
        name: `Identifiant du CRM à l'origine de la régularisation`,
        dsnStructure: 'S21.G00.23.007',
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
        field: 'ntt',
        name: 'ntt',
        dsnStructure: 'S21.G00.30.020',
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
        dsnStructure: 'S21.G00.40.005'
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
        collection: 'ChangWorkContract',
        field: 'changeDate',
        name: `Date de la modification`,
        dsnStructure: 'S21.G00.41.001'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldStatus',
        name: `Ancien statut du salarié (conventionnel)`,
        dsnStructure: 'S21.G00.41.002'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldRetirement',
        name: `Ancien code statut catégoriel Retraite Complémentaire obligatoire`,
        dsnStructure: 'S21.G00.41.003'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldContract',
        name: `Ancienne nature du contrat`,
        dsnStructure: 'S21.G00.41.004'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldSystemConvention',
        name: `Ancien dispositif de politique publique et conventionnel`,
        dsnStructure: 'S21.G00.41.005'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldUnitQuota',
        name: `Ancienne unité de mesure de la quotité de travail`,
        dsnStructure: 'S21.G00.41.006'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldQuota',
        name: `Ancienne quotité de travail du contrat`,
        dsnStructure: 'S21.G00.41.007'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldModeWorkingTime',
        name: `Ancienne modalité d'exercice du temps de travail `,
        dsnStructure: 'S21.G00.41.008'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldSS',
        name: `Ancien complément de base au régime obligatoire`,
        dsnStructure: 'S21.G00.41.010'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldCCN',
        name: `Ancien code convention collective applicable`,
        dsnStructure: 'S21.G00.41.011'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldEstablishment',
        name: `SIRET ancien établissement d'affectation`,
        dsnStructure: 'S21.G00.41.012'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldWorkPlace',
        name: `Ancien identifiant du lieu de travail`,
        dsnStructure: 'S21.G00.41.013'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldContractId',
        name: `Ancien numéro du contrat`,
        dsnStructure: 'S21.G00.41.014'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldReason',
        name: `Ancien motif de recours `,
        dsnStructure: 'S21.G00.41.016'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldProfessionnalFees',
        name: `Ancien taux de déduction forfaitaire spécifique pour frais professionnels`,
        dsnStructure: 'S21.G00.41.017'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldForeigner',
        name: `Ancien travailleur à l'étranger au sens du code de la Sécurité Sociale`,
        dsnStructure: 'S21.G00.41.018'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldPCS',
        name: `Ancien code profession et catégorie socioprofessionnelle (PCS-ESE)`,
        dsnStructure: 'S21.G00.41.019'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldPCSFP',
        name: `Ancien code complément PCS-ESE (pour la fonction publique : référentiels NEH, NET et grade de la NNE)`,
        dsnStructure: 'S21.G00.41.020'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldContractStartDate',
        name: `Ancienne date de début du contrat`,
        dsnStructure: 'S21.G00.41.021'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldQuotite',
        name: `Ancienne quotité de travail de référence de l'entreprise pour la catégorie de salarié`,
        dsnStructure: 'S21.G00.41.022'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldModeWorkingTime',
        name: `Ancien code caisse professionnelle de congés payés `,
        dsnStructure: 'S21.G00.41.023'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldPaidHolidays',
        name: `Ancien code risque accident du travail`,
        dsnStructure: 'S21.G00.41.024'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldAPECITA',
        name: `Ancien code statut catégoriel APECITA`,
        dsnStructure: 'S21.G00.41.025'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldPartTime',
        name: `Ancien salarié à temps partiel cotisant à temps plein`,
        dsnStructure: 'S21.G00.41.027'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldPayroolDepth',
        name: `Profondeur de recalcul de la paie`,
        dsnStructure: 'S21.G00.41.028'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldFPPCS',
        name: `[FP] Ancien code complément PCS-ESE pour la fonction publique d'Etat (emploi de la NNE) `,
        dsnStructure: 'S21.G00.41.029'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldPost',
        name: `Ancienne nature du poste`,
        dsnStructure: 'S21.G00.41.030'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldFPQuotite',
        name: `[FP] Ancienne quotité de travail de référence de l'entreprise pour la catégorie de salarié dans
l’hypothèse d’un poste à temps complet`,
        dsnStructure: 'S21.G00.41.031'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldPartTimePercentage',
        name: `Ancien taux de travail à temps partiel `,
        dsnStructure: 'S21.G00.41.032'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldService',
        name: `Ancien code catégorie de service`,
        dsnStructure: 'S21.G00.41.033'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldFPIndice',
        name: `[FP] Ancien indice brut`,
        dsnStructure: 'S21.G00.41.034'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldFPIndiceMaj',
        name: `[FP] Ancien indice majoré`,
        dsnStructure: 'S21.G00.41.035'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldFPNBI',
        name: `[FP] Ancienne nouvelle bonification indiciaire (NBI)`,
        dsnStructure: 'S21.G00.41.036'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldFpIndiceBrutOrigine',
        name: `[FP] Ancien indice brut d'origine `,
        dsnStructure: 'S21.G00.41.037'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldArticle15',
        name: `[FP] Ancien indice brut de cotisation dans un emploi supérieur (article 15)`,
        dsnStructure: 'S21.G00.41.038'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldFPEmployer',
        name: `[FP] Ancien ancien employeur public`,
        dsnStructure: 'S21.G00.41.039'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldEmployeeFPIndiceBrut',
        name: `[FP] Ancien indice brut d’origine ancien salarié employeur public`,
        dsnStructure: 'S21.G00.41.040'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldSPP',
        name: `[FP] Ancien indice brut d’origine sapeur-pompier professionnel (SPP)`,
        dsnStructure: 'S21.G00.41.041'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldTitulaire',
        name: `[FP] Ancien maintien du traitement d'origine d'un contractuel titulaire`,
        dsnStructure: 'S21.G00.41.042'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldActitRate',
        name: `Ancien taux de service actif`,
        dsnStructure: 'S21.G00.41.043'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldLevelPayroll',
        name: `Ancien niveau de rémunération`,
        dsnStructure: 'S21.G00.41.044'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldEchelon',
        name: `Ancien échelon`,
        dsnStructure: 'S21.G00.41.045'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldCoeff',
        name: `Ancien coefficient hiérarchique`,
        dsnStructure: 'S21.G00.41.046'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldNav',
        name: `Ancien genre de navigation`,
        dsnStructure: 'S21.G00.41.047'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldBOETH',
        name: `Ancien statut BOETH`,
        dsnStructure: 'S21.G00.41.048'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldPublicLaw',
        name: `Ancien complément de dispositif de politique publique`,
        dsnStructure: 'S21.G00.41.049'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldDispo',
        name: `Ancien cas de mise à disposition externe d'un individu de l'établissement`,
        dsnStructure: 'S21.G00.41.050'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldClass',
        name: `Ancienne catégorie de classement finale`,
        dsnStructure: 'S21.G00.41.051'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldMal',
        name: `Ancien code régime de base risque maladie`,
        dsnStructure: 'S21.G00.41.052'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldVieil',
        name: `Ancien code régime de base risque vieillesse`,
        dsnStructure: 'S21.G00.41.053'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldMarine',
        name: `Ancien identifiant du contrat d'engagement maritime`,
        dsnStructure: 'S21.G00.41.054'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldCNIEG',
        name: `Ancien collège (CNIEG)`,
        dsnStructure: 'S21.G00.41.055'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldPartAct',
        name: `Ancienne forme d'aménagement du temps de travail dans le cadre de l'activité partielle)`,
        dsnStructure: 'S21.G00.41.056'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldFPDetachment',
        name: `[FP] Ancien type de détachement`,
        dsnStructure: 'S21.G00.41.057'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldPosiCCN',
        name: `Ancien positionnement dans la convention collective`,
        dsnStructure: 'S21.G00.41.058'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldAT',
        name: `Ancien code régime de base risque accident du travail`,
        dsnStructure: 'S21.G00.41.059'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldStatusEmployee',
        name: `Ancien statut d'emploi du salarié`,
        dsnStructure: 'S21.G00.41.060'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldMultiple',
        name: `Ancien code emplois multiples`,
        dsnStructure: 'S21.G00.41.061'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldModeWorkingTime',
        name: `Ancien code employeurs multiples`,
        dsnStructure: 'S21.G00.41.062'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldRank',
        name: `Ancien grade`,
        dsnStructure: 'S21.G00.41.063'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldFPCTI',
        name: `[FP] Ancien indice complément de traitement indiciaire (CTI)`,
        dsnStructure: 'S21.G00.41.064'
    },
    {
        collection: 'ChangWorkContract',
        field: 'oldFINES',
        name: `Ancien FINESS géographique`,
        dsnStructure: 'S21.G00.41.065'
    },
    {
        collection: 'IndividualPayment',
        field: 'datePayment',
        name: `Date de versement`,
        dsnStructure: 'S21.G00.50.001'
    },
    {
        collection: 'IndividualPayment',
        field: 'netTaxRem',
        name: `Rémunération nette fiscale`,
        dsnStructure: 'S21.G00.50.002'
    },
    {
        collection: 'IndividualPayment',
        field: 'paymentNumber',
        name: `Numéro de versement`,
        dsnStructure: 'S21.G00.50.003'
    },
    {
        collection: 'IndividualPayment',
        field: 'netAmount',
        name: `Montant net versé`,
        dsnStructure: 'S21.G00.50.004'
    },
    {
        collection: 'IndividualPayment',
        field: 'taxRate',
        name: `Taux de prélèvement à la source`,
        dsnStructure: 'S21.G00.50.006'
    },
    {
        collection: 'IndividualPayment',
        field: 'typeTaxRate',
        name: `Type du taux de prélèvement à la source`,
        dsnStructure: 'S21.G00.50.007'
    },
    {
        collection: 'IndividualPayment',
        field: 'idTaxRate',
        name: `Identifiant du taux de prélèvement à la source`,
        dsnStructure: 'S21.G00.50.008'
    },
    {
        collection: 'IndividualPayment',
        field: 'amountTax',
        name: `Montant de prélèvement à la source `,
        dsnStructure: 'S21.G00.50.009'
    },
    {
        collection: 'IndividualPayment',
        field: 'amountExo',
        name: `Montant de la part non imposable du revenu`,
        dsnStructure: 'S21.G00.50.011'
    },
    {
        collection: 'IndividualPayment',
        field: 'amountExoBase',
        name: `Montant de l’abattement sur la base fiscale (non déduit de la rémunération nette fiscale)`,
        dsnStructure: 'S21.G00.50.012'
    },
    {
        collection: 'IndividualPayment',
        field: 'amoutPas',
        name: `Montant soumis au PAS`,
        dsnStructure: 'S21.G00.50.013'
    },
    {
        collection: 'Payrool',
        field: 'startDatePayrool',
        name: `Date de début de période de paie`,
        dsnStructure: 'S21.G00.51.001'
    },
    {
        collection: 'Payrool',
        field: 'endDatePayrool',
        name: `Date de fin de période de paie`,
        dsnStructure: 'S21.G00.51.002'
    },
    {
        collection: 'Payrool',
        field: 'contractId',
        name: `Numéro du contrat`,
        dsnStructure: 'S21.G00.51.010'
    },
    {
        collection: 'Payrool',
        field: 'type',
        name: `Type`,
        dsnStructure: 'S21.G00.51.011'
    },
    {
        collection: 'Payrool',
        field: 'hours',
        name: `Nombre d'heures`,
        dsnStructure: 'S21.G00.51.012'
    },
    {
        collection: 'Payrool',
        field: 'amount',
        name: `Montant`,
        dsnStructure: 'S21.G00.51.013'
    },
    {
        collection: 'Payrool',
        field: 'fpRate',
        name: `[FP] Taux de rémunération de la situation administrative`,
        dsnStructure: 'S21.G00.51.014'
    },
    {
        collection: 'Payrool',
        field: 'rateNuclearPlant',
        name: `Taux de conduite centrale nucléaire`,
        dsnStructure: 'S21.G00.51.015'
    },
    {
        collection: 'Payrool',
        field: 'datePayTypement',
        name: `Taux de majoration `,
        dsnStructure: 'S21.G00.51.016'
    },
    {
        collection: 'Payrool',
        field: 'contributedrate',
        name: `Taux de rémunération cotisée`,
        dsnStructure: 'S21.G00.51.019'
    },
    {
        collection: 'Payrool',
        field: 'increaseRate',
        name: `Taux de majoration ex-apprenti/ex-élève`,
        dsnStructure: 'S21.G00.51.020'
    },
    {
        collection: 'Bonus',
        field: 'typeBonus',
        name: `Type`,
        dsnStructure: 'S21.G00.52.001'
    },
    {
        collection: 'Bonus',
        field: 'amountBonus',
        name: `Montant`,
        dsnStructure: 'S21.G00.52.002'
    },
    {
        collection: 'Bonus',
        field: 'dateStartBonus',
        name: `Date de début de la période de rattachement`,
        dsnStructure: 'S21.G00.52.003'
    },
    {
        collection: 'Bonus',
        field: 'dateEndBonus',
        name: `Date de fin de la période de rattachement`,
        dsnStructure: 'S21.G00.52.004'
    },
    {
        collection: 'Bonus',
        field: 'contractIdBonus',
        name: `Numéro du contrat`,
        dsnStructure: 'S21.G00.52.006'
    },
    {
        collection: 'Bonus',
        field: 'datePaymentBonus',
        name: `Date de versement d'origine`,
        dsnStructure: 'S21.G00.52.007'
    },
    {
        collection: 'OtherPayment',
        field: 'type',
        name: `Type`,
        dsnStructure: 'S21.G00.54.001'
    },
    {
        collection: 'OtherPayment',
        field: 'amount',
        name: `Montant`,
        dsnStructure: 'S21.G00.54.002'
    },
    {
        collection: 'OtherPayment',
        field: 'startDateOtherPayment',
        name: `Date de début de période de rattachement`,
        dsnStructure: 'S21.G00.54.003'
    },
    {
        collection: 'OtherPayment',
        field: 'endDateOtherPayment',
        name: `Date de fin de période de rattachement`,
        dsnStructure: 'S21.G00.54.004'
    },
    {
        collection: 'WorkStopping',
        field: 'reasonStop',
        name: `Motif de l'arrêt`,
        dsnStructure: 'S21.G00.60.001'
    },
    {
        collection: 'WorkStopping',
        field: 'lastDayWorked',
        name: `Date du dernier jour travaillé`,
        dsnStructure: 'S21.G00.60.002'
    },
    {
        collection: 'WorkStopping',
        field: 'estimatedEndDate',
        name: `Date de fin prévisionnelle`,
        dsnStructure: 'S21.G00.60.003'
    },
    {
        collection: 'WorkStopping',
        field: 'subrogation',
        name: `Subrogation`,
        dsnStructure: 'S21.G00.60.004'
    },
    {
        collection: 'WorkStopping',
        field: 'subrogationStartDate',
        name: `Date de début de subrogation`,
        dsnStructure: 'S21.G00.60.005'
    },
    {
        collection: 'WorkStopping',
        field: 'subrogationEndDate',
        name: `Date de début de subrogation`,
        dsnStructure: 'S21.G00.60.006'
    },
    {
        collection: 'WorkStopping',
        field: 'iban',
        name: `IBAN`,
        dsnStructure: 'S21.G00.60.007'
    },
    {
        collection: 'WorkStopping',
        field: 'bic',
        name: `BIC`,
        dsnStructure: 'S21.G00.60.008'
    },
    {
        collection: 'WorkStopping',
        field: 'recoveryDate',
        name: `Date de la reprise`,
        dsnStructure: 'S21.G00.60.010'
    },
    {
        collection: 'WorkStopping',
        field: 'reasonRecovery',
        name: `Motif de la reprise`,
        dsnStructure: 'S21.G00.60.011'
    },
    {
        collection: 'WorkStopping',
        field: 'dateWorkAccident',
        name: `Date de l'accident ou de la première constatation`,
        dsnStructure: 'S21.G00.60.012'
    },
    {
        collection: 'WorkStopping',
        field: 'SIRETCentralizer',
        name: `SIRET Centralisateur`,
        dsnStructure: 'S21.G00.60.600'
    },
    {
        collection: 'MutualEmployee',
        field: 'option',
        name: 'Code option retenue par le salarié',
        dsnStructure: 'S21.G00.70.004'
    },
    {
        collection: 'MutualEmployee',
        field: 'pop',
        name: 'Code population de rattachement',
        dsnStructure: 'S21.G00.70.005'
    },
    {
        collection: 'MutualEmployee',
        field: 'children',
        name: 'Nombre d’enfants à charge',
        dsnStructure: 'S21.G00.70.007'
    },
    {
        collection: 'MutualEmployee',
        field: 'assign',
        name: `Nombre d'adultes ayants- droit(conjoint, concubin, ...)`,
        dsnStructure: 'S21.G00.70.008'
    },
    {
        collection: 'MutualEmployee',
        field: 'numberAssign',
        name: `Nombre d'ayants- droit`,
        dsnStructure: 'S21.G00.70.009'
    },
    {
        collection: 'MutualEmployee',
        field: 'otherAssign',
        name: `Nombre d'ayants- droit autres(ascendants, collatéraux...)`,
        dsnStructure: 'S21.G00.70.010'
    },
    {
        collection: 'MutualEmployee',
        field: 'otherAssign',
        name: `IdentifiantTechniqueAdhesion`,
        dsnStructure: 'S21.G00.70.010'
    },
    {
        collection: 'MutualEmployee',
        field: 'idTechAffiliation',
        name: 'IdentifiantTechniqueAffiliation',
        dsnStructure: 'S21.G00.70.012'
    },
    {
        collection: 'MutualEmployee',
        field: 'idTechAffiliationMutual',
        name: 'IdentifiantTechniqueAdhesion',
        dsnStructure: 'S21.G00.70.013'
    },
    {
        collection: 'MutualEmployee',
        field: 'startDateMutualEmployee',
        name: 'Date de début de l’affiliation',
        dsnStructure: 'S21.G00.70.014'
    },
    {
        collection: 'MutualEmployee',
        field: 'endDateMutualEmployee',
        name: 'Date de fin de l’affiliation',
        dsnStructure: 'S21.G00.70.015'
    },
    {
        collection: 'Base',
        field: 'idBase',
        name: 'Code de base assujettie',
        dsnStructure: 'S21.G00.78.001'
    },
    {
        collection: 'Base',
        field: 'startDate',
        name: 'Date de début de période de rattachement',
        dsnStructure: 'S21.G00.78.002'
    },
    {
        collection: 'Base',
        field: 'endDate',
        name: 'Date de fin de période de rattachement',
        dsnStructure: 'S21.G00.78.003'
    },
    {
        collection: 'Base',
        field: 'amount',
        name: 'Montant',
        dsnStructure: 'S21.G00.78.004'
    },
    {
        collection: 'Base',
        field: 'idTechAff',
        name: 'Identifiant technique Affiliation',
        dsnStructure: 'S21.G00.78.005'
    },
    {
        collection: 'Base',
        field: 'idContract',
        name: 'Numéro du contrat',
        dsnStructure: 'S21.G00.78.006'
    },
    {
        collection: 'Base',
        field: 'crm',
        name: 'CRM',
        dsnStructure: 'S21.G00.78.007'
    },
    {
        collection: 'BaseSubject',
        field: 'typeBaseSubject',
        name: 'Type de composant de base assujettie',
        dsnStructure: 'S21.G00.79.001'
    },
    {
        collection: 'BaseSubject',
        field: 'amountBaseSubject',
        name: 'Montant de composant de base assujettie',
        dsnStructure: 'S21.G00.79.004'
    },
    {
        collection: 'BaseSubject',
        field: 'crmBaseSubject',
        name: `Identifiant du CRM à l'origine de la régularisation`,
        dsnStructure: 'S21.G00.79.005'
    },
    {
        collection: 'Contribution',
        field: 'type',
        name: 'Code de cotisation',
        dsnStructure: 'S21.G00.79.001'
    },
    {
        collection: 'Contribution',
        field: 'idContribution',
        name: 'Code de cotisation',
        dsnStructure: 'S21.G00.81.001'
    },
    {
        collection: 'Contribution',
        field: 'ops',
        name: 'Identifiant Organisme de Protection Sociale',
        dsnStructure: 'S21.G00.81.002'
    },
    {
        collection: 'Contribution',
        field: 'baseContribution',
        name: 'Montant d assiette',
        dsnStructure: 'S21.G00.81.003'
    },
    {
        collection: 'Contribution',
        field: 'amountContribution',
        name: 'Montant de cotisation',
        dsnStructure: 'S21.G00.81.004'
    },
    {
        collection: 'Contribution',
        field: 'idInsee',
        name: 'Code INSEE commune',
        dsnStructure: 'S21.G00.81.005'
    },
    {
        collection: 'Contribution',
        field: 'crmContribution',
        name: 'Identifiant du CRM à l origine de la régularisation',
        dsnStructure: 'S21.G00.81.006'
    },
    {
        collection: 'Contribution',
        field: 'rateContribution',
        name: 'Taux de cotisation',
        dsnStructure: 'S21.G00.81.007'
    },
    {
        collection: 'EstablishmentContribution',
        field: 'value',
        name: 'Valeur',
        dsnStructure: 'S21.G00.82.001'
    },
    {
        collection: 'EstablishmentContribution',
        field: 'codeContribution',
        name: 'Code de cotisation',
        dsnStructure: 'S21.G00.82.002'
    },
    {
        collection: 'EstablishmentContribution',
        field: 'startDate',
        name: 'Code de cotisation',
        dsnStructure: 'S21.G00.82.003'
    },
    {
        collection: 'EstablishmentContribution',
        field: 'endDate',
        name: 'Code de cotisation',
        dsnStructure: 'S21.G00.82.004'
    },
    {
        collection: 'EstablishmentContribution',
        field: 'ref',
        name: 'Référence réglementaire ou contractuelle',
        dsnStructure: 'S21.G00.82.005'
    },
    {
        collection: 'EstablishmentContribution',
        field: 'crm',
        name: 'CRM',
        dsnStructure: 'S21.G00.82.006'
    },
];
