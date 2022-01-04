import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeclinedOrderComponent } from './declined-order.component';

const routes: Routes = [
  {
    path: '',
    component: DeclinedOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeclinedOrderRoutingModule { }
