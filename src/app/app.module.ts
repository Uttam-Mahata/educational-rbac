import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ManageUsersRolesComponent } from './dashboard/manage-users-roles/manage-users-roles.component';
import { ManagePermissionsComponent } from './dashboard/manage-permissions/manage-permissions.component';
import { AuditLogsComponent } from './dashboard/audit-logs/audit-logs.component';
import { ManageNotificationsComponent } from './dashboard/manage-notifications/manage-notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ManageUsersRolesComponent,
    ManagePermissionsComponent,
    AuditLogsComponent,
    ManageNotificationsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
