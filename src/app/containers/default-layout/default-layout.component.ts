import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = true;
  //public navItems = navItems;

  constructor(private router: Router)
  {}

  // toggleMinimize(e) {
  //   this.sidebarMinimized = e;
  // }

  // showAdminAccMenu()
  // {
  //   document.getElementById('AccIcon').classList.add("show");
  //   //document.getElementById('AccIconMenu').classList.add("show");
  // }

  Logout()
  {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
