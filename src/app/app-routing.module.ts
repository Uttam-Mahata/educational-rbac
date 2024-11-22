import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ManageUsersRolesComponent } from './dashboard/manage-users-roles/manage-users-roles.component';
import { ManagePermissionsComponent } from './dashboard/manage-permissions/manage-permissions.component';
import { AuditLogsComponent } from './dashboard/audit-logs/audit-logs.component';
import { ManageNotificationsComponent } from './dashboard/manage-notifications/manage-notifications.component';
import { AuthGuard } from './authguard.service'; // Import AuthGuard

const routes: Routes = [
  // Login Route
  {
    path: 'login',
    component: LoginComponent,
  },
  // Dashboard Route with AuthGuard
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protect the dashboard route
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'manage-users-roles', component: ManageUsersRolesComponent },
      { path: 'manage-permissions', component: ManagePermissionsComponent },
      { path: 'audit-logs', component: AuditLogsComponent },
      { path: 'manage-notifications', component: ManageNotificationsComponent },
    ],
  },
  // Default route redirects to login
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
