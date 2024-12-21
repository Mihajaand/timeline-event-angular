export interface ReportingDataInterface {
    nbTables: any,
    nbPers: any,
    totals: {
        [key: string]: {
            nbTablesDispo: number;
            nbPersDispo: number;
            nbTablesOcc: number;
            nbPersOcc: number;
            percTablesDispo: number;
            percPersDispo: number;
            percTablesOcc: number;
            percPersOcc: number;
        }
    },

    [key: string]: {
        data?: {
            [key: string]: {
                nbTablesDispo: number;
                nbPersDispo: number;
                nbTablesOcc: number;
                nbPersOcc: number;
                percTablesDispo: number;
                percPersDispo: number;
                percTablesOcc: number;
                percPersOcc: number;
            }
        }
    },
}
export interface ReportingDataTotalsInterface {
    [key: string]: {
        "nbTablesDispo": number,
        "nbPersDispo": number,
        "nbTablesOcc": number,
        "nbPersOcc": number,
        "percTablesDispo": number,
        "percPersDispo": number,
        "percTablesOcc": number,
        "percPersOcc": number
    }
}
