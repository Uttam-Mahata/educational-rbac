// audit-logs.component.ts
import { Component, OnInit } from '@angular/core';

interface AuditLog {
  id: number;
  timestamp: Date;
  user: string;
  action: string;
  details: string;
  status: 'success' | 'warning' | 'error';
}

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss']
})
export class AuditLogsComponent implements OnInit {
  logs: AuditLog[] = [];
  Math = Math;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  selectedDate: string = 'all';
  currentPage: number = 1;
  pageSize: number = 10;

  ngOnInit() {
    // Simulate API call
    this.logs = this.getSampleLogs();
  }

  get filteredLogs(): AuditLog[] {
    return this.logs
      .filter(log => {
        const matchesSearch = !this.searchTerm || 
          log.user.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          log.action.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          log.details.toLowerCase().includes(this.searchTerm.toLowerCase());

        const matchesStatus = this.selectedStatus === 'all' || log.status === this.selectedStatus;

        let matchesDate = true;
        if (this.selectedDate !== 'all') {
          const today = new Date();
          const logDate = new Date(log.timestamp);
          if (this.selectedDate === 'today') {
            matchesDate = logDate.toDateString() === today.toDateString();
          } else if (this.selectedDate === 'week') {
            const weekAgo = new Date(today.setDate(today.getDate() - 7));
            matchesDate = logDate >= weekAgo;
          }
        }

        return matchesSearch && matchesStatus && matchesDate;
      });
  }

  get paginatedLogs(): AuditLog[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredLogs.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLogs.length / this.pageSize);
  }

  private getSampleLogs(): AuditLog[] {
    return [
      {
        id: 1,
        timestamp: new Date(),
        user: 'John Doe',
        action: 'Login',
        details: 'User logged in successfully',
        status: 'success'
      },
      {
        id: 2,
        timestamp: new Date(),
        user: 'Jane Smith',
        action: 'Create Course',
        details: 'Created new course: Angular Basics',
        status: 'success'
      },
      // Add more sample logs as needed
    ];
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-danger';
      default: return '';
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}