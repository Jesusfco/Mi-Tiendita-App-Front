﻿import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import 'hammerjs';
import { InventarioComponent } from './inventario/inventario.component';
import { InventarioService }  from './inventario/inventario.service';
// import { VentasService } from './sale-point/ventas.service';
// import { CajaService } from './caja/caja.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';
//import { MaterializeModule } from 'materialize-css';

import { NavegationComponent } from './navegation/navegation.component';
import { InventarioDatailsComponent } from './inventario/inventario-datails/inventario-datails.component';
import { InventarioListComponent } from './inventario/inventario-list/inventario-list.component';
import { NewInventarioComponent } from './inventario/new-inventario/new-inventario.component';
import { EditInventarioComponent } from './inventario/edit-inventario/edit-inventario.component';
// import { SalePointComponent } from './sale-point/sale-point.component';
// import { SaleListComponent } from './sale-point/sale-list/sale-list.component';
// import { SaleEditComponent } from './sale-point/sale-edit/sale-edit.component';
// import { SaleCreateComponent } from './sale-point/sale-create/sale-create.component';
import { InventarioFilterPipe } from './inventario/inventario-list/inventario-filter.pipe';
// import { SugerenciasPipe } from './sale-point/sale-create/sugerencias.pipe';
// import { CajaComponent } from './caja/caja.component';
// import { LessProductComponent } from './less-product/less-product.component';
import { AgregarInventarioComponent } from './inventario/agregar-inventario/agregar-inventario.component';
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

@NgModule({
  declarations: [
    AppComponent,    
    NavegationComponent,
    RegisterComponent,
    LoginComponent,
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
  providers: [ RegisterService , LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
