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
import { FilterInventoryPipe } from './filter-inventory.pipe';
import { SaleProcessComponent } from './sale-point/sale-process/sale-process.component';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes),
    // MaterializeModule,   
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
  providers: [RegisterService , LoginService, InventoryService, SaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
