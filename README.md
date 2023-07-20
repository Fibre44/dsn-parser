# DSN Parser #

*******
Table des matières  

* [Description](#description)
* [Installation](#instal)
* [Exemple](#example)
* [Méthode Dsn](#dsn)
* [Méthode Society](#society)
* [Méthode Establishment](#establishment)
* [Méthode ContributionFund](#ContributionFund)
* [Méthode Employee](#employee)
* [Méthode WorkContract](#workContract)
* [Méthode Mutual](#mutual)
* [Méthode MutuelEmployee](#mutualEmployee)
* [Méthode Base](#base)
* [Méthode Base assujeti](#baseSubject)
* [Méthode Contribution](#contribution)
* [Méthode Arret de travail](#workStopping)
* [Méthode rateAT](#rateAt)
* [Méthode rateMobility](#rateMobility)
* [Méthode bonus](#bonus)


*******

<div id='description'>  

## Description ##

Cette librairie permet d'extraire les données d'un fichier au format de la Déclaration Sociale Nominative (DSN). 

La librairie se base sur le [cahier technique 2023 ](https://www.net-entreprises.fr/media/documentation/dsn-cahier-technique-2023.1.pdf "norme DSN 2022"). Le parser est capable de gérer les normes :
* 2022
* 2023

## Tableau récapitulatif des données exportées ##

| Bloc       | Libellé                                                                                    | Méthode                                 | Commentaire |
| ---------- | ------------------------------------------------------------------------------------------ | --------------------------------------- | -------     |
| S10.G00.00 | Entête                                                                                     | [Méthode Dsn](#dsn)                     |         |
| S10.G00.01 | Emetteur                                                                                   | [Méthode Emetteur](#sender)                     |         |
| S10.G00.01 | Contact Emetteur                                                                           | [Méthode Emetteur](#contactSender)                     |         |
| S20.G00.05 | Déclaration                                                                                |                                         |           |
| S20.G00.07 | Contact chez le déclaré                                                                    | [Méthode contact](#contact)             ||
| S20.G00.08 | Identifiant de l'organisme destinataire                                                     |Non géré                                | En cours de développement         |
| S21.G00.06 | Entreprise                                                                                 | [Méthode Society](#society)             |          |
| S21.G00.11 | Etablissement                                                                              | [Méthode Establishment](#establishment) |          |
| S21.G00.12 | Coordonnées bancaires spécifiques                                                          | Non géré                                | En cours de développemet         |
| S21.G00.13 | Complément OETH                                                                            | Non géré                                | En cours de développemet         |
| S21.G00.15 | Adhésion Prévoyance                                                                        | [Méthode Mutual](#mutual)               |          |
| S21.G00.16 | Changements destinataire Adhésion Prévoyance                                               | Non géré                                | En cours de développemet         |
| S21.G00.20 | Versement organisme de protection sociale                                                  | Non géré                                |          |
| S21.G00.22 | Bordereau de cotisation due                                                                | Non géré                                | En cours de developpement         |
| S21.G00.23 | Cotisation agrégée                                                                         | [Méthode cotisations](#aggregate)       | En cours de developpement         |
| S21.G00.30 | Individu                                                                                   | [Méthode Employee](#employee)           |          |
| S21.G00.34 | Compte Professionnel de Prévention (Ex-Pénibilité)                                         | Non géré                                |En cours de développement         |
| S21.G00.40 | Contrat (contrat de travail, convention, mandat)                                           | [Méthode WorkContract](#workContract)   |         |
| S21.G00.41 | Changements Contrat                                                                        |[Méthode WorkContract](#workContract)    |          |
| S21.G00.44 | Assujettissement fiscal                                                                    | Non géré                                |En cours de développement           |
| S21.G00.45 | Données précédemment déclarées                                                             | Non géré                                |En cours de développement           |
| S21.G00.50 | Versement individu                                                                         | Non géré                                |En cours de développement           |
| S21.G00.51 | Rémunération                                                                               | Non géré                                |En cours de développement           |
| S21.G00.52 | Prime, gratification et indemnité                                                          | Non géré                                |En cours de développement           |
| S21.G00.54 | Autre élément de revenu brut                                                               | Non géré                                |En cours de développement           |
| S21.G00.55 | Composant de versement                                                                     | Non géré                                |En cours de développement        |
| S21.G00.56 | Régularisation de prélèvement à la source                                                  | Non géré                                |En cours de développement           |
| S21.G00.56 | Arrêt de travail                                                                           |[Méthode Arret de travail](#workStopping)|           |
| S21.G00.62 | Fin du contrat                                                                             | Non géré                                |En cours de développement        |
| S21.G00.63 | Préavis de fin de contrat                                                                  | Non géré                                |En cours de développement           |
| S21.G00.65 | Autre suspension de l'exécution du contrat                                                 | Non géré                                |En cours de développement           |
| S21.G00.66 | Temps partiel Thérapeutique                                                                | Non géré                                |En cours de développement           |
| S21.G00.70 | Affiliation Prévoyance                                                                     |[Méthode MutuelEmployee](#mutualEmployee)|      |
| S21.G00.71 | Retraite complémentaire                                                                    | Non géré                                |En cours de développement                                         |
| S21.G00.72 | Affiliation à tort à un régime de retraite                                                 | Non géré                                |En cours de développement           |
| S21.G00.73 | Ayant-droit                                                                                | Non géré                                |En cours de développement           |
| S21.G00.78 | Base assujettie                                                                            | Non géré                                |En cours de développement           |
| S21.G00.79 | Composant de base assujettie                                                               | Non géré                                |En cours de développement            |
| S21.G00.81 | Cotisation individuelle                                                                    | Non géré                                |En cours de développement           |
| S21.G00.82 | Cotisation établissement                                                                   | Non géré                                |En cours de développement           |
| S21.G00.83 | Période d'affiliation à tort à un régime de retraite complémentaire                        | Non géré                                |En cours de développement           |
| S21.G00.84 | Base assujettie déclarée à tort pour un régime de retraite complémentaire                  | Non géré                                |En cours de développement           |
| S21.G00.85 | Lieu de travail ou établissement utilisateur                                               | Non géré                                |En cours de développement           |
| S21.G00.86 | Ancienneté                                                                                 | Non géré                                |En cours de développement           |
| S21.G00.95 | Base assujettie déclarée à tort pour un régime de base risque maladie, AT/MP ou vieillesse | Non géré                                |En cours de développement           |
| S21.G00.98 | Saisie administrative à tiers détenteur                                                    | Non géré                                |En cours de développement           |

<div id='instal'>  


## Installation ##

```bash
    npm i @fibre44/dsn-parser
```
<div id='example'>  


## Exemples d'utilisation ##

```javascript
import { DsnParser } from "@fibre44/dsn-parser";
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = join(dirname(fileURLToPath(import.meta.url)), './demo.dsn')
const dsn = new DsnParser()

const options = {
        controleDsnVersion: true,
        deleteFile: false
    }
try {
  await dsn.asyncInit(dir, options)
} catch (e) {
    console.error(e)
}
```
## Les options ##
Fichier d'option par default.
 ```javascript
  options = {
        controleDsnVersion: true,//Controle que le fichier utilise bien la dernière norme de la DSN
        deleteFile: false //Autorise la suppression du fichier après le traitement
    }
 ```

La classe DsnParser propose différentes méthodes pour obtenir les informations du fichier DSN.

<div id='Dsn'>  

### Méthode dsn ###

Cette méthode retourne objet Javascript avec cette structure :

``` typescript
{
    softwareName: string,
    provider: string,
    softwareVersion: string,
    dsnVersion: string,
    type: string,
    totalRows: string,
    month: string
}

```

<div id='sender'>  

### Méthode sender ###

Cette méthode retourne objet Javascript avec cette structure :

``` typescript
{
    nicSender: string,
    nameSender: string,
    addressSender: string,
    zipCodeSender: string,
    citySender: string,
    countrySender: string,
    foreignDistributionCodeSender: string,
    complementLocalisationSender: string,
    distributionServiceSender: string
}

```

<div id='contactSender'>  

### Méthode contactSender ###

Cette méthode retourne objet Javascript avec cette structure :

``` typescript
{
    salutationContactSender: string,
    nameContactSender: string,
    mailContactSender: string,
    phoneContactSender: string,
    faxContactSender: string
}

```
<div id='society'>  

### Méthode society ###
Cette méthode retourne objet Javascript avec cette structure :

```typescript
{
    siren: string,
    nic: string,
    apen: string,
    adress1: string,
    adress2?: string,
    adress3?: string,
    zipCode: string,
    city: string
}
```

<div id='contact'>  

### Méthode contact ###
Cette méthode retourne un tableau d'objets Javascript avec cette structure :

```typescript
{
    siren: string,
    date: string,
    contactName: string,
    contactPhone: string,
    contactEmail: string,
    contactType: string
}
```

<div id='aggregate'>  

### Méthode cotisations agrégée ###
Cette méthode retourne un tableau d'objets Javascript avec cette structure :

```typescript
{
    contributionId: string,
    contributionQualifier: string,
    contriburionRate: string,
    baseAmount: string,
    contributionAmount: string,
    contributionInsee: string,
    contributionCRM: string,
    siret: string
}
```
<div id='establishment'>  

### Méthode Establishment ###
Dans la DSN une même DSN on peut avoir X établissements, la méthode retourne un tableau d'objets.
```typescript
[
    {
    siren: string,
    nic: string,
    apet: string,
    adress1: string,
    adress2?: string,
    adress3?: string,
    zipCode: string,
    country: string,
    idcc: string,
    legalStatus: string,
    opco: string,
    codeZip: string,
    city: string,
    date: string
    }
]
```
<div id='assignement'>  

### Méthode assignement ###
```typescript
[ 
    { value: 'Developpeur Javascript' },
    { value: 'Developpeur PHP' }
]

```
<div id='contributionFund'>  

### Méthode contributionFund ###
La méthode retourne un tableau d'objets avec les informations des différents organismes sociaux.

```typescript
[
  {
    codeDsn: '53510475600015',
    name: 'Urssaf Pays de la Loire',
    adress1: 'string',
    codeZip: 'string',
    city: 'string'
  },
  {
    codeDsn: 'P0942',
    name: 'AG2R',
    adress1: 'string',
    codeZip: 'string',
    city: 'string'
  }
]
```
<div id='employee'>  

### Méthode employee ###
La méthode retourne un tableau d'objets
 ```typescript
 [
  {
    numSS: string,
    lastname: string,
    surname: string,
    firstname: string,
    sex: string,
    birthday: string,
    placeOfBith: string,
    address1: string,
    codeZip: string,
    city: string,
    country: string,
    codeZipBith: string,
    countryBirth: string,
    address2?: string,
    address3?: string,
    email?: string,
    employeeId: string,
    graduate?: string,
    studies?: string
  },

 ]
   
 ```
<div id='workContract'>  

### Méthode workContract ###

La méthode retourne un tableau d'objets

```typescript
[
  {
    employeeId: string,
    startDate: string,
    status: string,
    retirement: string,
    pcs: string,
    pcsBis: string,
    employmentLabel: string,
    contract: string,
    publicDispPolitic: string,
    contractEndDate: string,
    DNACodeUnitTime: string,
    DSNWorkQuotaEstablishment: string,
    DSNWorkQuotaWorkContract: string,
    workTime: string,
    ss: string,
    idcc: string,
    mal: string,
    estabWorkPlace: string,
    vieillesse: string,
    pattern: string,
    vacation: string,
    rateProfessionalFess: string,
    foreigner: string,
    exclusionDsn: string,
    statusEmployment: string,
    unemployment: string,
    idPublicEmployer: string,
    methodUnemployment: string,
    joiningDate: string,
    denunciationDate: string,
    dateManagementAgreement: string,
    idAgreement: string,
    healthRiskDelegate: string,
    multipleJobCode: string,
    multipleEmployerCode: string,
    workAccidentRisk: string,
    idWorkAccidentRisk: string,
    positionCollectiveAgreement: string,
    apecita: string,
    rateAt: string,
    contributingFullTime: string,
    tip: string,
    useEstablishmentId: string,
    livePerfomances: string,
    licences: string,
    showId: string,
    showrunner: string,
    fpPcs?: string,
    typePosition?: string,
    fpQuotite?: string,
    partTimeWork?: string,
    serviceCode?: string,
    fpIndice?: string,
    fpIndiceMaj?: string,
    NBI?: string,
    indiceOriginal?: string,
    article15?: string,
    oldEstablishment?: string,
    oldIndice?: string,
    SPP?: string,
    contractual?: string,
    secondment?: string,
    browsing?: string,
    activityDutyRate?: string,
    payLevel?: string,
    echelon?: string,
    coefficient?: string,
    boeth: string,
    addPublicPolicy?: string,
    arrangement?: string,
    finaly?: string,
    navy?: string,
    cnieg?: string,
    activityRate?: string,
    grade?: string,
    cti?: string,
    finess?: string
  }
]
```
<div id='mutualEmployee'>  

### Méthode mutualEmployee ###

La méthode retourne un tableau d'objets

```typescript
  [
    {
      employeeId: string,
      option: string,
      pop: string,
      children: string,
      assign: string,
      numberAssign: string,
      otherAssign: string,
      idTechAffiliation: string,
      idTech: string,
      date: string
    }
 ]

```
<div id='base'>  

### Méthode base ###

La méthode retourne un tableau d'objets

```typescript
  [
    {
        employeeId: string,
        idBase: string,
        startDate: string,
        endDate: string,
        amount: string,
        idTechAff?: string,
        idContract?: string,
        crm?: string
    }
  ]
```

<div id='baseSubject'>  


### Méthode base assujeti ###

La méthode retourne un tableau d'objets

```typescript
  [
    {
      typeBaseSubject: string,
      amountBaseSubject: string,
      employeeId: string,
      date: string
    }
  ]
```

<div id='contribution'>  

### Méthode contribution ###

La méthode retourne un tableau d'objets
```typescript
  [
    {
      employeeId: string,
      idContribution: string,
      ops: string,
      baseContribution: string,
      amountContribution: string,
      idInsee?: string,
      crmContribution?: string,
      rateContribution?: string
    }
  ]
```
<div id='workStopping'>  

La méthode retourne un tableau d'objets

```typescript
 [
    {
      reasonStop: string,
      lastDayWorked: string,
      estimatedEndDate: string,
      subrogation?: string,
      subrogationStartDate?: string,
      subrogationEndDate?: string,
      iban?: string,
      bic?: string,
      recoveryDate?: string,
      reasonRecovery?: string,
      dateWorkAccident?: string,
      SIRETCentralizer?: string
  }
 ]
```
<div id='rateAt'>  

La méthode retourne un tableau d'objets

```typescript
 [
    
    {
      code: string,
      rate: string,
      siret: string,
      date: string
    }
 ]
```

<div id='rateMobility'>  

La méthode retourne un tableau d'objets

```typescript
 [
    {
        rate: string,
        insee: string
    }
 ]
```

<div id='bonus'>  

La méthode retourne un tableau d'objets

```typescript
 [
    {
      siren: string,
      date: string
      employeeId: string,
      typeBonus: string,
      amountBonus: string,
      dateStartBonus: string,
      dateEndBonus: string,
      contractIdBonus: string,
      datePaymentBonus: string
    }
 ]
```
