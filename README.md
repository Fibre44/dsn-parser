# DSN Parser #
## Description ##

Cette librairie permet d'extraire les données d'un fichier au format de la Déclaration Sociale Nominative (DSN). 

La librairie se base sur le [cahier technique 2022 ](https://www.net-entreprises.fr/media/documentation/dsn-cahier-technique-2022.1.pdf "norme DSN 2022"). La librairie ne prendra en charge que la derière norme en application du cahier technique.

La librairie permet de d'obtenir :
* Les informations du fichier DSN (éditeur, logicel de paie)
* Les informations de la société
* Les informations des établissements
* Les taux AT
* Les organismes de cotisations
* La liste des libellés emplois

## Installation ##

```bash
    npm i @fibre44/dsn-parser
```

## Exemples ##

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
  await dsn.init(path, options)
} catch (e) {
    console.error(e)
}
```
## Les options ##
Fichier d'option par default.
 ```javascript
  options = {
        controleDsnVersion: true,//Controle que le fichier utilise bien la dernière norme de la DSN
        deleteFile: false //Autorise la suppression du fichier après le traitemebt
    }
 ```

La class DsnParser propose différentes méthodes pour obtenir les informations du fichier DSN.

### Méthode dsn ###

Cette méthode retourne objet Javascript avec cette structure :

``` javascript
{
  softwareName: 'Le nom du logiciel de paie',
  provider: 'Le fournisseur',
  softwareVersion: 'La version du logiciel de paie',
  dsnVersion: 'P22V01',
  type: '01',
  totalRows: '9253'
}

```
### Méthode society ###
Cette méthode retourne objet Javascript avec cette structure :

```javascript
{
  siren: '999999999',
  nic: '99999',
  apen: '9999',
  adress1: 'rue de la DSN',
  zipCode: '17000',
  city: 'La Rochelle',
}
```
### Méthode Establishment ###
Dans la DSN une même DSN on peut avoir X établissements. Si la DSN contient un seul établissement la méthode retourne un objet Javascript. Sinon la méthode retoure un tableau d'objets
```javascript
[
    {
        siren: '999999999',
        nic: '99999',
        apet: '9999',
        adress1: 'rue de la DSN',
        zipCode: '17000',
        city: 'La Rochelle',
        legalStatus: 'SARL',
        idcc: '1597',
        opco: 'code OPCO',
        idEstablishment: 0 //Id interne à la class 
    },
    {
        siren: '999999999',
        nic: '99998',
        apet: '9999',
        adress1: 'rue de la déclaration',
        zipCode: '17000',
        city: 'La Rochelle',
        legalStatus: 'SARL',
        idcc: '1597',
        opco: 'code OPCO',
        idEstablishment: 0 //Id interne à la class 
    }
]
```
### Méthode assignement ###
```javascript
[ 
    { value: 'Developpeur Javascript' },
    { value: 'Developpeur PHP' },
]

```
### Méthode contributionFund ###
La méthode retourne un tableau d'objets avec les informations des différents organismes sociaux.

La clée idEstablishment permet de retrouver l'établissement d'affectation. 
```javascript
[
  {
    codeDsn: '53510475600015',
    name: 'Urssaf Pays de la Loire',
    adress1: 'string',
    codeZip: 'string',
    city: 'string',
    idEstablishment: 0
  },
  {
    codeDsn: 'P0942',
    name: 'AG2R',
    adress1: 'string',
    codeZip: 'string',
    city: 'string',
    idEstablishment: 0
  }
]
```

### Méthode Classifications ###
La méthode retourne un tableau d'objets avec l'ensemble des classifications des salariés par IDCC.
```javascript
[
    {
        nature: 'coeff',
        value: '100',
        idcc: '9999',
    },
    {
        nature: 'coeff',
        value: '120',
        idcc: '9999',
    },
]
```

