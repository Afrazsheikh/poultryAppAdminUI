import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { HistoryComponent } from './history.component';
import { HistoryRoutingModule } from './history-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    HistoryRoutingModule,
    ButtonsModule.forRoot(),
    MatButtonModule,
    MatButtonToggleModule
  ],
  declarations: [ HistoryComponent ]
})

export class HistoryModule { }
