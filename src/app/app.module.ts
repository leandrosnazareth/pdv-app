import { HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { ToggleDirective } from './dashboard/sidebar/toggle.directive';
import { PagarComponent } from './page/contas/pagar/pagar/pagar.component';
import { HomeComponent } from './page/home/home.component';
import { CorComponent } from './page/item/cor/cor.component';
import { TableComponent } from './page/table/table.component';
import { PagarService } from './service/contas/pagar.service';
///////componentes add posteriormente
import { NgxMaskModule } from 'ngx-mask';
import { ProductComponent } from './page/product/product.component';
import { CorService } from './service/cor.service';
import { ConfirmaDeleteComponent } from './util/confirma-delete/confirma-delete.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ToggleDirective,
    HomeComponent,
    TableComponent,
    CorComponent,
    PagarComponent,
    ConfirmaDeleteComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTooltipModule,
    MatRippleModule,
    MatTabsModule,
    MatDividerModule,
    MatToolbarModule,

    MatDatepickerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatBadgeModule,
    NgxMaskModule.forRoot(
      { // não salvar a mascara
        dropSpecialCharacters: false
      }
    ),
  ],
  providers: [
    CorService,
    PagarService,
    //informar formato da data local
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },

    /* if you don't provide the currency symbol in the pipe, 
    this is going to be the default symbol (R$) ... */
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
