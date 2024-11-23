import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isSidebarVisible: boolean = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  onNavItemClick() {
    // Hide sidebar when a navigation item is clicked
    this.isSidebarVisible = false;
  }

  onLogout() {
    this.isSidebarVisible = false; // Hide sidebar
    localStorage.clear();
    alert('Logged out successfully!');
    this.router.navigate(['/login']);
  }
}