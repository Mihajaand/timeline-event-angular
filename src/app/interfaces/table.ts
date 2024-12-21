import {KesyReservationInterface} from "./KesyReservation.interface";

export interface TableInterface {
  id: string;
  nom: string;
  idReservation: number;
  idFclient?: number;
  nbPlace: number;
  forme: string;
  prenom?: string;
  tel?: string;
  heureDebut?: string;
  nomSociete?: string;
  typeReservation: string;
  statueTable: string;
  emplacements: string;
  idEmplacement: number;
  couleur: string;
  couleurTexte: string;
  type: string;
  aCompteResa: number;
  orderTable: number
  events: KesyReservationInterface[]
}
