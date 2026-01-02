import { Routes } from "@angular/router";
import { IndexComponent } from "./crud/index/index.component";
import { CreateUpdateComponent } from "./crud/create-update/create-update.component";

export const resourceName = 'arrendadores';

export const ArrendadoresActionRoutes: Routes = [
  {
    path: "index",
    component: IndexComponent,
    data:{resourceName},
    title: "Listado",
  },
  {
    path: "create",
    component: CreateUpdateComponent,
    data:{resourceName},
    title: "Nuevo",
  },
  {
    path: "edit/:id",
    component: CreateUpdateComponent,
    data:{resourceName},
    title: "Editar",
  },
];
