// permission-management.component.ts
import { Component, OnInit } from '@angular/core';

interface Permission {
  id: number;
  name: string;
  read: boolean;
  write: boolean;
  update: boolean;
  delete: boolean;
}

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.scss']
})
export class ManagePermissionsComponent implements OnInit {
  roles: Role[] = [
    {
      id: 1,
      name: 'Teachers',
      permissions: [
        { id: 1, name: 'Student Records', read: true, write: false, update: false, delete: false },
        { id: 2, name: 'Course Management', read: true, write: true, update: true, delete: false },
        { id: 3, name: 'Attendance', read: true, write: true, update: true, delete: false },
        { id: 4, name: 'Grades', read: true, write: true, update: true, delete: false },
      ]
    },
    {
      id: 2,
      name: 'Students',
      permissions: [
        { id: 1, name: 'Course Materials', read: true, write: false, update: false, delete: false },
        { id: 2, name: 'Assignments', read: true, write: true, update: false, delete: false },
        { id: 3, name: 'Grades', read: true, write: false, update: false, delete: false },
        { id: 4, name: 'Attendance', read: true, write: false, update: false, delete: false },
      ]
    },
    {
      id: 3,
      name: 'Parents',
      permissions: [
        { id: 1, name: 'Student Progress', read: true, write: false, update: false, delete: false },
        { id: 2, name: 'Attendance Reports', read: true, write: false, update: false, delete: false },
        { id: 3, name: 'Fee Details', read: true, write: false, update: false, delete: false },
        { id: 4, name: 'Communications', read: true, write: true, update: false, delete: false },
      ]
    }
  ];

  selectedRole: Role | null = null;

  constructor() {}

  ngOnInit(): void {
    this.selectedRole = this.roles[0];
  }

  selectRole(role: Role): void {
    this.selectedRole = role;
  }

  updatePermission(permission: Permission, action: 'read' | 'write' | 'update' | 'delete'): void {
    permission[action] = !permission[action];
  }

  savePermissions(): void {
    // Implement API call to save permissions
    console.log('Saving permissions:', this.selectedRole);
  }
}