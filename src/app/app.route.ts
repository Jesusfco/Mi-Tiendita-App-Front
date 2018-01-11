import { Routes } from '@angular/router';
import { NavegationComponent } from './navegation/navegation.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NewProductComponent } from './inventory/new-product/new-product.component';
import { EditProductComponent } from './inventory/edit-product/edit-product.component';
import { SalePointComponent } from './sale-point/sale-point.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'inventory',
        component: InventoryComponent,
        children : [
            {
                path: 'create',
                component: NewProductComponent
            },
            {
                path: 'edit/:id',
                component: EditProductComponent
            }
        ]
    }
];