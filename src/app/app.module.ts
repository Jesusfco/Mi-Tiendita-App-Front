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

import { NavegationComponent } from './navegation/navegation.component';

import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { LoginComponent } from './login/login.component';
import { LoginService }  from './login/login.service';



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
} from '@angular/material';

import { InventoryComponent } from './inventory/inventory.component';
import { NewProductComponent } from './inventory/new-product/new-product.component';
import { EditProductComponent } from './inventory/edit-product/edit-product.component';
import { InventoryService } from './inventory/inventory.service';
import { SalePointComponent } from './sale-point/sale-point.component';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    HttpModule,
    JsonpModule,
    // MaterializeModule,
   /*RouterModule.forRoot([
       {
           path: 'inventario',
           component: InventarioComponent
       }        
   ]),*/
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

  ],
  providers: [RegisterService , LoginService, InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
