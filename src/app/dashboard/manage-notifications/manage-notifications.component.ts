// manage-notifications.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Notification {
  id: number;
  title: string;
  message: string;
  roles: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'draft' | 'sent' | 'scheduled';
  scheduledDate?: Date;
  createdAt: Date;
}

@Component({
  selector: 'app-manage-notifications',
  templateUrl: './manage-notifications.component.html',
  styleUrls: ['./manage-notifications.component.scss']
})
export class ManageNotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  notificationForm: FormGroup;
  isEditing: boolean = false;
  showForm: boolean = false;
  selectedNotification: Notification | null = null;
  
  roles: string[] = ['Teachers', 'Students', 'Parents', 'Staff'];
  priorities: string[] = ['low', 'medium', 'high'];
  
  constructor(private fb: FormBuilder) {
    this.notificationForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      roles: [[], Validators.required],
      priority: ['medium', Validators.required],
      status: ['draft'],
      scheduledDate: [null],
    });
  }

  ngOnInit(): void {
    // Mock data - replace with actual API call
    this.notifications = [
      {
        id: 1,
        title: 'Parent-Teacher Meeting',
        message: 'Annual parent-teacher meeting scheduled for next week.',
        roles: ['Teachers', 'Parents'],
        priority: 'high',
        status: 'sent',
        createdAt: new Date('2024-03-20')
      },
      {
        id: 2,
        title: 'Exam Schedule Update',
        message: 'Final examination dates have been updated.',
        roles: ['Students', 'Teachers'],
        priority: 'medium',
        status: 'scheduled',
        scheduledDate: new Date('2024-03-25'),
        createdAt: new Date('2024-03-19')
      }
    ];
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  createNotification(): void {
    if (this.notificationForm.valid) {
      const newNotification: Notification = {
        id: this.notifications.length + 1,
        ...this.notificationForm.value,
        createdAt: new Date()
      };
      this.notifications.unshift(newNotification);
      this.resetForm();
      this.showForm = false;
    }
  }

  editNotification(notification: Notification): void {
    this.isEditing = true;
    this.showForm = true;
    this.selectedNotification = notification;
    this.notificationForm.patchValue({
      title: notification.title,
      message: notification.message,
      roles: notification.roles,
      priority: notification.priority,
      status: notification.status,
      scheduledDate: notification.scheduledDate
    });
  }

  updateNotification(): void {
    if (this.notificationForm.valid && this.selectedNotification) {
      const index = this.notifications.findIndex(n => n.id === this.selectedNotification!.id);
      this.notifications[index] = {
        ...this.selectedNotification,
        ...this.notificationForm.value
      };
      this.resetForm();
    }
  }

  deleteNotification(id: number): void {
    if (confirm('Are you sure you want to delete this notification?')) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    }
  }

  resetForm(): void {
    this.notificationForm.reset({
      priority: 'medium',
      status: 'draft'
    });
    this.isEditing = false;
    this.selectedNotification = null;
  }

  getPriorityClass(priority: 'low' | 'medium' | 'high'): string {
    const classes = {
      'low': 'text-success',
      'medium': 'text-warning',
      'high': 'text-danger'
    };
    return classes[priority] || '';
  }

  getStatusClass(status: 'draft' | 'sent' | 'scheduled'): string {
    const classes = {
      'draft': 'bg-secondary',
      'sent': 'bg-success',
      'scheduled': 'bg-primary'
    };
    return classes[status] || '';
  }

//   <div class="col-12 col-md-6">
//   <label class="form-label">Recipients</label>
//   <div class="role-checks">
//     <div class="form-check" *ngFor="let role of roles">
//       <input class="form-check-input" type="checkbox" 
//              [value]="role" 
//              [id]="'role' + role"
//              title="Select {{ role }}"
//              (change)="onRoleChange($event, role)">
//       <label class="form-check-label" [for]="'role' + role">
//         {{ role }}
//       </label>
//     </div>
//   </div>
// </div>

onRoleChange(event: Event, role: string): void {
  const checkbox = event.target as HTMLInputElement;
  const roles = this.notificationForm.get('roles') as FormGroup;
  if (checkbox.checked) {
    roles.setValue([...roles.value, role]);
  } else {
    roles.setValue(roles.value.filter((r: string) => r !== role));
  }

  roles.markAsTouched();

  console.log(this.notificationForm.get('roles')?.value);

}

}