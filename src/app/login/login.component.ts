import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  roles: string[] = ['Admin', 'Teacher', 'Student', 'Parent'];
  selectedRole: string = 'Admin';

  // Sample credentials
  sampleCredentials: { [key: string]: { username: string; password: string } } = {
    Admin: { username: 'admin', password: 'admin123' },
    Teacher: { username: 'teacher', password: 'teacher123' },
    Student: { username: 'student', password: 'student123' },
    Parent: { username: 'parent', password: 'parent123' }
  };

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  selectRole(role: string) {
    this.selectedRole = role;
  }

  onLogin() {
    const { username, password } = this.sampleCredentials[this.selectedRole];

    if (this.username === username && this.password === password) {
      alert(`${this.selectedRole} Login successful!`);
      if (this.selectedRole === 'Admin') {
        this.router.navigate(['/dashboard']); // Navigate to the dashboard for Admin
      } else {
        alert(`${this.selectedRole} Dashboard is not implemented yet.`);
      }
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }
}
