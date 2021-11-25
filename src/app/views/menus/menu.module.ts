import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    MenuRoutingModule,
    ButtonsModule.forRoot(),
    MatButtonModule,
    MatButtonToggleModule
  ],
  declarations: [ MenuComponent ]
})

export class MenuModule { }
