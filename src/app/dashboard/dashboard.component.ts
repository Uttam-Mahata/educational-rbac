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

  onLogout() {
    localStorage.clear(); // Clear session data
    alert('Logged out successfully!');
    this.router.navigate(['/login']); // Redirect to login page
  }
}
