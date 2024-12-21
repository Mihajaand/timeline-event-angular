export interface KesyReservationInterface {
  id: number;
  begin: Date;
  beginHour?: string;
  end: Date;
  actif: boolean;
  nbPerson: number;
  status: number;
  endHour?: string;
  texte?: string;
  text?: string;
  eventText?: string;
  tableId?: string;
  clientId?: string;
  width?:number;
  leftPos?:number;
  topPos?:number;
  table?: any;
  client?: any;
  employer1?: any;
  employer2?: any;
  commentaire?: string;
}
