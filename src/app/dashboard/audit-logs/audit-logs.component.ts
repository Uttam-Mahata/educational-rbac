// audit-logs.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface AuditLog {
  id: number;
  action: string;
  module: string;
  description: string;
  userId: string;
  userName: string;
  userRole: string;
  ipAddress: string;
  timestamp: Date;
  status: 'success' | 'failure' | 'warning';
  details?: any;
}

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss']
})
export class AuditLogsComponent implements OnInit {
  auditLogs: AuditLog[] = [];
  filteredLogs: AuditLog[] = [];
  filterForm: FormGroup;
  selectedLog: AuditLog | null = null;
  showDetails: boolean = false;
  
  readonly modules = [
    'All',
    'Authentication',
    'User Management',
    'Permissions',
    'Notifications',
    'Course Management',
    'Student Records',
    'Attendance',
    'Grades'
  ];

  readonly actions = [
    'All',
    'Create',
    'Read',
    'Update',
    'Delete',
    'Login',
    'Logout',
    'Permission Change',
    'Password Reset',
    'Export'
  ];

  readonly userRoles = [
    'All',
    'Admin',
    'Teacher',
    'Student',
    'Parent',
    'Staff'
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      module: ['All'],
      action: ['All'],
      userRole: ['All'],
      startDate: [''],
      endDate: [''],
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    // Mock data - replace with actual API call
    this.auditLogs = this.generateMockLogs();
    this.filteredLogs = [...this.auditLogs];

    // Subscribe to form changes for filtering
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  generateMockLogs(): AuditLog[] {
    const logs: AuditLog[] = [];
    const actions = ['Create', 'Update', 'Delete', 'Read', 'Login', 'Logout'];
    const statuses: ('success' | 'failure' | 'warning')[] = ['success', 'failure', 'warning'];
    
    for (let i = 1; i <= 20; i++) {
      logs.push({
        id: i,
        action: actions[Math.floor(Math.random() * actions.length)],
        module: this.modules[Math.floor(Math.random() * (this.modules.length - 1)) + 1],
        description: `User performed ${actions[Math.floor(Math.random() * actions.length)]} operation`,
        userId: `USER${Math.floor(1000 + Math.random() * 9000)}`,
        userName: `User ${i}`,
        userRole: this.userRoles[Math.floor(Math.random() * (this.userRoles.length - 1)) + 1],
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        details: {
          browser: 'Chrome',
          os: 'Windows 10',
          additionalInfo: 'Sample additional information'
        }
      });
    }
    
    return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    
    this.filteredLogs = this.auditLogs.filter(log => {
      return (filters.module === 'All' || log.module === filters.module) &&
             (filters.action === 'All' || log.action === filters.action) &&
             (filters.userRole === 'All' || log.userRole === filters.userRole) &&
             (!filters.startDate || new Date(log.timestamp) >= new Date(filters.startDate)) &&
             (!filters.endDate || new Date(log.timestamp) <= new Date(filters.endDate)) &&
             (!filters.searchTerm || 
              log.userName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
              log.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
              log.userId.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    });
  }

  viewDetails(log: AuditLog): void {
    this.selectedLog = log;
    this.showDetails = true;
  }

  closeDetails(): void {
    this.showDetails = false;
    this.selectedLog = null;
  }

  exportLogs(): void {
    // Implement export functionality
    console.log('Exporting logs:', this.filteredLogs);
  }

  getStatusClass(status: 'success' | 'failure' | 'warning'): string {
    const classes = {
      'success': 'text-success',
      'failure': 'text-danger',
      'warning': 'text-warning'
    };
    return classes[status] || '';
  }

  getStatusIcon(status: 'success' | 'failure' | 'warning'): string {
    const icons = {
      'success': 'fa-check-circle',
      'failure': 'fa-times-circle',
      'warning': 'fa-exclamation-circle'
    };
    return icons[status] || '';
  }
}