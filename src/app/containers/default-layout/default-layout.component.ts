import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = true;
  public navItems = navItems;

  constructor(private router: Router)
  {}



  Logout()
  {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
