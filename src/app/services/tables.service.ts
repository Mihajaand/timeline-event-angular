import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {TableInterface} from "../interfaces/table";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {KesyTableInterface} from "../interfaces/KesyTableInterface";
import {KesyReservationInterface} from "../interfaces/KesyReservation.interface";

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  lastEventId = 0;
  tables = [
    {
      id: "01",
      nom: "01",
      idReservation: 0,
      idFclient: null,
      nbPlace: 4,
      forme: "rectangle\r\n",
      prenom: null,
      tel: null,
      heureDebut: null,
      nomSociete: null,
      typeReservation: "O",
      statueTable: "O",
      emplacements: "A",
      idEmplacement: 1,
      couleur: "#dc3545",
      couleurTexte: "white",
      type: "Occupé",
      aCompteResa: "0",
      orderTable: 1,
      events: [
      ]
    },
    {
      "id": "02",
      "nom": "02",
      "idReservation": 0,
      "idFclient": null,
      "nbPlace": 4,
      "forme": "carre\r\n",

      "prenom": null,
      "tel": null,
      "heureDebut": null,
      "nomSociete": null,
      "typeReservation": "L",
      "statueTable": "L",
      "emplacements": "A",
      "idEmplacement": 1,
      "couleur": "#CCC",
      "couleurTexte": "red",
      "type": "Libre",
      "aCompteResa": "0",
      "orderTable": 2,
      events: [
        /*{
          id: 4,
          begin: "2024-09-11 09:00:00",
          end: "2024-09-11 11:00:00",
          text: "event 4"
        },*/
      ]
    },
    {
      "id": "03",
      "nom": "03",
      "idReservation": 0,
      "idFclient": null,
      "nbPlace": 4,
      "forme": "ronde",

      "prenom": null,
      "tel": null,
      "heureDebut": null,
      "nomSociete": null,
      "typeReservation": "L",
      "statueTable": "L",
      "emplacements": "A",
      "idEmplacement": 1,
      "couleur": "#ffffff",
      "couleurTexte": "black",
      "type": "Libre",
      "aCompteResa": "0",
      "orderTable": 3,
      events: [
        /*{
          id: 5,
          begin: "2024-09-11 11:00:00",
          end: "2024-09-11 12:00:00",
          text: "event 5"
        },*/
      ]
    },
    {
      "id": "04",
      "nom": "04",
      "idReservation": 0,
      "idFclient": null,
      "nbPlace": 6,
      "forme": "rectangle",

      "prenom": null,
      "tel": null,
      "heureDebut": null,
      "nomSociete": null,
      "typeReservation": "L",
      "statueTable": "L",
      "emplacements": "A",
      "idEmplacement": 1,
      "couleur": "#ffffff",
      "couleurTexte": "black",
      "type": "Libre",
      "aCompteResa": "0",
      "orderTable": 4,
      events: [
        /*{
          id: 6,
          begin: "2024-09-11 12:15:00",
          end: "2024-09-11 14:00:00",
          text: "event 6"
        },*/
      ]
    },
    {
      "id": "08",
      "nom": "08",
      "idReservation": 0,
      "idFclient": null,
      "nbPlace": 2,
      "forme": "carre",

      "prenom": null,
      "tel": null,
      "heureDebut": null,
      "nomSociete": null,
      "typeReservation": "L",
      "statueTable": "L",
      "emplacements": "A",
      "idEmplacement": 1,
      "couleur": "#ffffff",
      "couleurTexte": "black",
      "type": "Libre",
      "aCompteResa": "0",
      "orderTable": 8,
      events: []
    },
    {
      "id": "09",
      "nom": "09",
      "idReservation": 0,
      "idFclient": null,
      "nbPlace": 4,
      "forme": "carre\r\n",

      "prenom": null,
      "tel": null,
      "heureDebut": null,
      "nomSociete": null,
      "typeReservation": "L",
      "statueTable": "L",
      "emplacements": "A",
      "idEmplacement": 1,
      "couleur": "#ffffff",
      "couleurTexte": "black",
      "type": "Libre",
      "aCompteResa": "0",
      "orderTable": 9,
      events: []
    },
    {
      "id": "10",
      "nom": "10",
      "idReservation": 0,
      "idFclient": null,
      "nbPlace": 4,
      "forme": "ronde\r\n",

      "prenom": null,
      "tel": null,
      "heureDebut": null,
      "nomSociete": null,
      "typeReservation": "L",
      "statueTable": "L",
      "emplacements": "A",
      "idEmplacement": 1,
      "couleur": "#ffffff",
      "couleurTexte": "black",
      "type": "Libre",
      "aCompteResa": "0",
      "orderTable": 10,
      events: []
    },
    {
      "id": "12BIS",
      "nom": "12BIS",
      "idReservation": 0,
      "idFclient": null,
      "nbPlace": 4,
      "forme": "ronde\r\n",

      "prenom": null,
      "tel": null,
      "heureDebut": null,
      "nomSociete": null,
      "typeReservation": "L",
      "statueTable": "L",
      "emplacements": "A",
      "idEmplacement": 1,
      "couleur": "#ffffff",
      "couleurTexte": "black",
      "type": "Libre",
      "aCompteResa": "0",
      "orderTable": 13,
      events: []
    },
    {
      "id": "16",
      "nom": "16",
      "idReservation": 0,
      "idFclient": null,
      "nbPlace": 4,
      "forme": "ronde\r\n",

      "prenom": null,
      "tel": null,
      "heureDebut": null,
      "nomSociete": null,
      "typeReservation": "L",
      "statueTable": "L",
      "emplacements": "A",
      "idEmplacement": 1,
      "couleur": "#ffffff",
      "couleurTexte": "black",
      "type": "Libre",
      "aCompteResa": "0",
      "orderTable": 16,
      events: []
    },
    {
      "id": "17",
      "nom": "17",
      "idReservation": 0,
      "idFclient": null,
      "nbPlace": 4,
      "forme": "rectangle\r\n",

      "prenom": null,
      "tel": null,
      "heureDebut": null,
      "nomSociete": null,
      "typeReservation": "L",
      "statueTable": "L",
      "emplacements": "A",
      "idEmplacement": 1,
      "couleur": "#ffffff",
      "couleurTexte": "black",
      "type": "Libre",
      "aCompteResa": "0",
      "orderTable": 17,
      events: []
    }
  ];

  constructor() {
    const tables = this.getTables();
    if (tables === null || tables.length == 0) {
      localStorage.setItem('tables', JSON.stringify(this.tables));
      localStorage.setItem('lastEventId', this.lastEventId.toString());
    }
  }

  /**
   * Get all conteneurs lists
   */
  getTables(): TableInterface[] {
    const tables = localStorage.getItem('tables');
    return JSON.parse(tables);
  }

  addTable(t) {

  }

  /**
   *
   * @param t form object
   * @param e event object
   */
  addTableEvent(t, e) {
    const tables = this.getTables();
    tables.forEach((table, key) => {
      if (table.id === t.id) {
        this.lastEventId = Number(localStorage.getItem('lastEventId')) + 1;
        localStorage.setItem('lastEventId', this.lastEventId.toString())
        e.id = this.lastEventId;
        e.begin = e.begin.toISOString().split('T')[0];
        e.end = e.end.toISOString().split('T')[0];
        table.events.push(e);
      }
    });
    localStorage.setItem('tables', JSON.stringify(tables));
  }

  updateTableEvent(t, e: KesyReservationInterface) {
    const tables = this.getTables();
    tables.forEach((table, key) => {
      if (table.id === t.id) {
        table.events.forEach((event, k) => {
          if (event !== null && event.id == e.id) {
            tables[key].events[k] = e;
          }
        });
      }
    });
    localStorage.setItem('tables', JSON.stringify(tables));
  }
  deleteTableEvent(t, eventId) {
    const tables = this.getTables();
    tables.forEach((table, key) => {
      if (table.id === t.id) {
        table.events.forEach((event, k) => {
          if (event !== null && event.id == eventId) {
            delete tables[key].events[k];
          }
        });
      }
    });
    localStorage.setItem('tables', JSON.stringify(tables));
  }

  /**
   * Get form by id
   * @param id String
   */
  getById(id: string) {
    let found = null;
    this.getTables().forEach((table) => {
      if (table.id === id) {
        found = {...table};
      }
    });
    return found;
  }

  /**
   *
   */
  getPlansDeTables(): any[] {
    let plans = localStorage.getItem('plans-conteneurs');
    if (plans != '' && plans != null) {
      return JSON.parse(plans);
    }
    localStorage.setItem('plans-conteneurs', JSON.stringify([{id: 1, name: "Plan par défaut", background: '#cedade'}]));
    let tables = [];
    for (let i = 0; i < 20; i++) {
      tables.push({
        id: i + 1,
        cols: 8,
        rows: 8,
        y: 2,
        x: i * 2,
        type: 'C',
        nbPlace: 4,
        nom: 'T' + (i + 1),
        variante: '0',
        couleur: "#ffffff",
        couleurTexte: "black",
      });
    }
    localStorage.setItem('conteneurs-1', JSON.stringify(tables));
    return [{
      id: 1, name: "Plan par défaut"
    }];
  }

  addPlanDeTable(newPlanTable) {
    let plans = this.getPlansDeTables();
    newPlanTable.id = plans.length + 1,
      plans.push(newPlanTable);
    //console.log(plans);
    localStorage.setItem('plans-conteneurs', JSON.stringify(plans));
    return plans;
  }

  updatePlanDeTable(plan) {
    let plans = this.getPlansDeTables();
    const index = plans.findIndex(x => x.id == plan.id);
    if (index > -1) {
      plans[index] = plan;
      //console.log(plans);
      localStorage.setItem('plans-conteneurs', JSON.stringify(plans));
      return plans;
    }
    return null;
  }


  deletePlanDeTable(plan) {
    let plans = this.getPlansDeTables();
    const index = plans.findIndex(x => x.id == plan.id);
    if (index > -1) {
      plans.splice(index, 1);
      //console.log(plans);
      localStorage.setItem('plans-conteneurs', JSON.stringify(plans));
    }
    return null;
  }

  getPlansTables(planId: number): Array<KesyTableInterface> {
    //console.log('conteneurs-' + planId);
    let tables = localStorage.getItem('conteneurs-' + planId);
    if (tables != '' && tables != null) {
      let pTables = JSON.parse(tables);
      //console.log(pTables);
      return pTables;
    }
    return [];
  }

  savePlanTableData(planId: number, data) {
    localStorage.setItem('conteneurs-' + planId, JSON.stringify(data));
  }
}
