# DSN Parser #
## Description ##

Cette librairie permet d'extraire les données d'un fichier au format de la Déclaration Sociale Nominative (DSN). La librairie se base sur le [cahier technique 2022 ](https://www.net-entreprises.fr/media/documentation/dsn-cahier-technique-2022.1.pdf "norme DSN 2022")

## Installation ##

### Cloner le dépot ###

```bash
    git clone https://github.com/Fibre44/dsn-parser.git
```

### Installer les dépéndances ###
```bash
    npm install
```

## Exemples ##

Avec javascript
```javascript
import { DsnParser } from "@fibre44/dsn-parser";
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = join(dirname(fileURLToPath(import.meta.url)), './demo.dsn')
const dsn = new DsnParser()
try {
    await dsn.init(dir)

} catch (e) {
    console.error(e)
}
```

La class DsnParser propose différentes méthodes pour obtenir les informations du fichier DSN.

### dsn ###

Cette méthode retourne objet Javascript avec cette structure :

``` typescript

type dsnObject = {
    softwareName: string | undefined,
    provider: string | undefined,
    softwareVersion: string | undefined,
    dsnVersion: string | undefined,
    type: string | undefined,

}
```
### society ###
Cette méthode retourne objet Javascript avec cette structure :

```
type societyObject = {
    siren: string | undefined,
    nic: string | undefined,
    apen: string | undefined,
    adress1: string | undefined,
    adress2: string | undefined,
    adress3: string | undefined,
    zipCode: string | undefined,
    city: string | undefined
}
```
### establishment ###
Dans la DSN une même DSN on peut avoir X établissements. Si la DSN contient un seul établissement la méthode retourne un objet Javascript. Sinon la méthode retoure un tableau d'objets
```
type establishmentObject = {
    siren: string | undefined,
    nic: string | undefined,
    apet: string | undefined,
    adress1: string | undefined,
    adress2: string | undefined,
    adress3: string | undefined,
    zipCode: string | undefined,
    country: string | undefined,
    idcc: string | undefined,
    legalStatus: string | undefined,
    opco: string | undefined,
    city: string | undefined,
    idEstablishment: number | undefined
}
```
### assignement ###
```
type assignementObject = {
    value: string,
}
```
### Classifications ###
```
type classificationObject = {
    nature: string,
    value: string,
    idcc: string,
}
```

