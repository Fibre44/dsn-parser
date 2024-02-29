# DSN Parser #

*******
Table des matières  

* [Description](#description)
* [Installation](#instal)
* [Exemple](#example)

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
| S20.G00.05 | Déclaration                                                                                | [Méthode statement](#contact)                                        |           |
| S20.G00.06 | Entreprise                                                                                 | [Méthode Society](#contact)             ||
| S20.G00.07 | Contact chez le déclaré                                                                    | [Méthode contact](#contact)             ||
| S20.G00.08 | Identifiant de l'organisme destinataire                                                    |Non géré                                | En cours de développement         |
| S21.G00.06 | Entreprise                                                                                 | [Méthode Society](#society)             |          |
| S21.G00.11 | Etablissement                                                                              | [Méthode Establishment](#establishment) |          |
| S21.G00.12 | Coordonnées bancaires spécifiques                                                          | specificBankDetails                     | En cours de développemet         |
| S21.G00.13 | Complément OETH                                                                            | complementOETH                                | En cours de développemet         |
| S21.G00.15 | Adhésion Prévoyance                                                                        | [Méthode Mutual](#mutual)               |          |
| S21.G00.16 | Changements destinataire Adhésion Prévoyance                                               | Non géré                                | En cours de développemet         |
| S21.G00.20 | Versement organisme de protection sociale                                                  | SocialPayment                               |          |
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

