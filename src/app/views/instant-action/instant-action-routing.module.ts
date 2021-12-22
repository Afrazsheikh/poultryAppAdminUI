import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstantActionComponent } from './instant-action.component';


const routes: Routes = [
  {
    path: '',
    component: InstantActionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstantActionRoutingModule { }
