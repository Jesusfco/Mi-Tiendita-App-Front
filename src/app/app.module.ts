import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import 'hammerjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';
//import { MaterializeModule } from 'materialize-css';





import { 
  MatAutocompleteModule, 
  MatButtonModule, 
  MatButtonToggleModule, 
  MatCheckboxModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatProgressBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { NavegationComponent } from './navegation/navegation.component';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { InventoryComponent } from './inventory/inventory.component';
import { NewProductComponent } from './inventory/new-product/new-product.component';
import { EditProductComponent } from './inventory/edit-product/edit-product.component';
import { InventoryService } from './inventory/inventory.service';
import { SalePointComponent } from './sale-point/sale-point.component';

import { SaleService } from './sale-point/sale.service';

import { routes } from './app.route';
import { FilterInventoryPipe } from './inventory/filter-inventory.pipe';
import { SaleProcessComponent } from './sale-point/sale-process/sale-process.component';
import { SalesComponent } from './sales/sales.component';
import { ShowSaleComponent } from './sales/show-sale/show-sale.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EmploymentComponent } from './employment/employment.component';
import { CreateEmploymentComponent } from './employment/create-employment/create-employment.component';
import { EditEmploymentComponent } from './employment/edit-employment/edit-employment.component';
import { EmploymentPipePipe } from './employment/employment-pipe.pipe';
import { PerfilService } from './perfil/perfil.service';
import { EmploymentService } from './employment/employment.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegationComponent,
    RegisterComponent,
    LoginComponent,
    InventoryComponent,
    NewProductComponent,
    EditProductComponent,
    SalePointComponent,
    FilterInventoryPipe,
    SaleProcessComponent,
    SalesComponent,
    ShowSaleComponent,
    PerfilComponent,
    EmploymentComponent,
    CreateEmploymentComponent,
    EditEmploymentComponent,
    EmploymentPipePipe,
    PageNotFoundComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,  
    
    
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,

  ],
  providers: [RegisterService , LoginService, InventoryService, SaleService, PerfilService, EmploymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
