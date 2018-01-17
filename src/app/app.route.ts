import { Routes } from '@angular/router';
import { NavegationComponent } from './navegation/navegation.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NewProductComponent } from './inventory/new-product/new-product.component';
import { EditProductComponent } from './inventory/edit-product/edit-product.component';
import { SalePointComponent } from './sale-point/sale-point.component';
import { SaleProcessComponent } from './sale-point/sale-process/sale-process.component';
import { SalesComponent } from './sales/sales.component';
import { ShowSaleComponent } from './sales/show-sale/show-sale.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EmploymentComponent } from './employment/employment.component';
import { CreateEmploymentComponent } from './employment/create-employment/create-employment.component';
import { EditEmploymentComponent } from './employment/edit-employment/edit-employment.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'employers', component: EmploymentComponent,
        children: [
            { path: 'create', component: CreateEmploymentComponent },
            { path: 'edit/:id', component: EditEmploymentComponent }
        ] },
    { path: 'sales', component: SalesComponent,
        children : [
            { path: ':id', component: ShowSaleComponent },
        ] },
    { path: 'inventory', component: InventoryComponent,
        children : [
            { path: 'create', component: NewProductComponent },
            { path: 'edit/:id', component: EditProductComponent },
        ]
    },
    { path: 'sale-point', component: SalePointComponent,
        children: [
            { path: 'sale-process', component: SaleProcessComponent }
    ]}
];