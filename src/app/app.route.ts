import { Routes } from '@angular/router';
import { NavegationComponent } from './navegation/navegation.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NewProductComponent } from './inventory/new-product/new-product.component';
import { EditProductComponent } from './inventory/edit-product/edit-product.component';
import { SalePointComponent } from './sale-point/sale-point.component';
import { SaleProcessComponent } from './sale-point/sale-process/sale-process.component';
import { SearchProductComponent } from './sale-point/search-product/search-product.component';
import { SalesComponent } from './sales/sales.component';
import { ShowSaleComponent } from './sales/show-sale/show-sale.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EmploymentComponent } from './employment/employment.component';
import { CreateEmploymentComponent } from './employment/create-employment/create-employment.component';
import { EditEmploymentComponent } from './employment/edit-employment/edit-employment.component';

import { SaleAnalysisComponent } from './sales/sale-analysis/sale-analysis.component';
import { SearchParametersComponent } from './inventory/search-parameters/search-parameters.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
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
            { path: 'sale/:id', component: ShowSaleComponent },
            { path: 'analysis', component: SaleAnalysisComponent },
        ] },
    { path: 'inventory', component: InventoryComponent,
        children : [
            { path: 'create', component: NewProductComponent },
            { path: 'edit/:id', component: EditProductComponent },
            { path: 'search-parameters', component: SearchParametersComponent }
        ]
    },
    { path: 'sale-point', component: SalePointComponent,
        children: [
            { path: 'sale-process', component: SaleProcessComponent },
            { path: 'search', component: SearchProductComponent },
    ]},
    { path: '**', component:  PageNotFoundComponent },
];