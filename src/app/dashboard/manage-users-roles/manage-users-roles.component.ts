import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-users-roles',
  templateUrl: './manage-users-roles.component.html',
  styleUrls: ['./manage-users-roles.component.css'],
})
export class ManageUsersRolesComponent {
  users = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: true,
      isEditing: false,
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Teacher',
      status: false,
      isEditing: false,
    },
  ];

  isAddingNew = false; // Flag to track if a new user is being added
  newUser = { name: '', email: '', role: 'Student', status: true }; // Placeholder for a new user

  // Enable editing mode for a user
  editUser(index: number) {
    this.users[index].isEditing = true;
  }

  // Save edited user details
  saveUser(index: number) {
    this.users[index].isEditing = false;
  }

  // Add a new user row
  addNewUser() {
    this.isAddingNew = true;
    this.newUser = { name: '', email: '', role: 'Student', status: true };
  }

  // Save the newly added user to the list
  saveNewUser() {
    if (this.newUser.name && this.newUser.email) {
      this.users.push({ ...this.newUser, isEditing: false });
      this.isAddingNew = false;
    } else {
      alert('Please fill in all fields!');
    }
  }

  // Cancel adding a new user
  cancelNewUser() {
    this.isAddingNew = false;
  }

  // Delete a user from the table
  deleteUser(index: number) {
    this.users.splice(index, 1);
  }
}
