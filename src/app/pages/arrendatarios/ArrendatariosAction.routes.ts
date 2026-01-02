import { Routes } from "@angular/router";
import { IndexComponent } from "./crud/index/index.component";
import { CreateUpdateComponent } from "./crud/create-update/create-update.component";

export const resourceName = 'arrendatarios';

export const ArrendatariosActionRoutes: Routes = [
  {
    path: "index",
    component: IndexComponent,
    data: {resourceName},
    title: "Listado",
  },
  {
    path: "create",
    component: CreateUpdateComponent,
    title: "Nuevo",
  },
  {
    path: "edit/:id",
    component: CreateUpdateComponent,
    title: "Editar",
  },
];
