import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Course {
  id: number;
  title: string;
  instructor: string | null;
  category: string;
  duration: string;
  enrolledStudents: number;
  status: 'Active' | 'Draft';
  lastUpdated: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "John Smith",
      category: "Development",
      duration: "8 weeks",
      enrolledStudents: 156,
      status: "Active",
      lastUpdated: "2024-03-15"
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      instructor: null,
      category: "Programming",
      duration: "10 weeks",
      enrolledStudents: 89,
      status: "Draft",
      lastUpdated: "2024-03-20"
    },
    {
      id: 3,
      title: "UX/UI Design Fundamentals",
      instructor: "Michael Chen",
      category: "Design",
      duration: "6 weeks",
      enrolledStudents: 234,
      status: "Active",
      lastUpdated: "2024-03-18"
    }
  ];

  searchQuery: string = '';
  selectedCourse: Course | null = null;
  courseForm: FormGroup;
  showAssignModal: boolean = false;
  showEditModal: boolean = false;
  teachers: string[] = ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emma Davis', 'Robert Wilson'];

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      duration: ['', Validators.required],
      status: ['Active', Validators.required],
      instructor: ['']
    });
  }

  ngOnInit(): void {}

  get filteredCourses(): Course[] {
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      (course.instructor?.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }

  openAssignModal(course: Course): void {
    this.selectedCourse = course;
    this.showAssignModal = true;
  }

  openEditModal(course: Course): void {
    this.selectedCourse = course;
    this.courseForm.patchValue({
      title: course.title,
      category: course.category,
      duration: course.duration,
      status: course.status,
      instructor: course.instructor
    });
    this.showEditModal = true;
  }

  assignTeacher(teacher: string): void {
    if (this.selectedCourse) {
      const index = this.courses.findIndex(c => c.id === this.selectedCourse!.id);
      if (index !== -1) {
        this.courses[index] = {
          ...this.courses[index],
          instructor: teacher,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
    }
    this.showAssignModal = false;
    this.selectedCourse = null;
  }

  saveCourse(): void {
    if (this.courseForm.valid && this.selectedCourse) {
      const index = this.courses.findIndex(c => c.id === this.selectedCourse!.id);
      if (index !== -1) {
        this.courses[index] = {
          ...this.courses[index],
          ...this.courseForm.value,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
    }
    this.showEditModal = false;
    this.selectedCourse = null;
    this.courseForm.reset();
  }

  deleteCourse(courseId: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courses = this.courses.filter(course => course.id !== courseId);
    }
  }
}