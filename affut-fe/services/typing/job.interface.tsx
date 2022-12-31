
export interface Job {
    id: string,
    intitule: string,
    description: string,
    dateCreation: Date,
    dateActualisation?: Date,
    lieuTravail: {
        libelle: string,
        latitude: 0,
        longitude: 0,
        codePostal?: string,
        commune: string
    },
    entreprise: {
        nom: string,
        description?: string,
        logo: string,
        url: string
    },
    typeContrat: string,
    typeContratLibelle?: string,
    natureContrat?: string,
    formations?: [
        {
            codeFormation: string,
            domaineLibelle: string,
            niveauLibelle: string,
            commentaire: string,
            exigence: string
        }
    ],
    salaire: {
        libelle: string,
        commentaire?: string,
        complement1?: string,
        complement2?: string
    },
    dureeTravailLibelle?: string,
    dureeTravailLibelleConverti?: string,
    alternance?: boolean,
    contact?: {
        nom?: string,
        coordonnees1?: string,
        coordonnees2?: string,
        coordonnees3?: string,
        telephone?: string,
        courriel?: string,
        commentaire?: string,
        urlRecruteur?: string,
        urlPostulation?: string
    },
    origineOffre: {
        origine: string,
        urlOrigine: string,
    }
}