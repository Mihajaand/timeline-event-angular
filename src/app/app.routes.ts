import { Routes } from '@angular/router';
import {PlanningComponent} from "./planning/planning.component";
import {ClientsComponent} from "./clients/clients.component";
import {ConteneursComponent} from "./conteneurs/conteneurs.component";
import {StockComponent} from "./stock/stock.component";
import {StockEvenementComponent} from "./stock-evenement/stock-evenement.component";
import {CurrenciesComponent} from "./currencies/currencies.component";
import {ParametreComponent} from "./parametre/parametre.component";
import {EmployersComponent} from "./employers/employers.component";
import {PaysComponent} from "./pays/pays.component";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'planning',
    component: PlanningComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'conteneurs',
    component: ConteneursComponent,
  },
  {
    path: 'stocks',
    component: StockComponent,
  },
  {
    path: 'stock-evenements',
    component: StockEvenementComponent,
  },
  {
    path: 'currencies',
    component: CurrenciesComponent,
  },
  {
    path: 'employers',
    component: EmployersComponent,
  },
  {
    path: 'parametres',
    component: ParametreComponent,
  },
  {
    path: 'pays',
    component: PaysComponent,
  },
];
