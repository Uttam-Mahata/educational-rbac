// home.component.ts
import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  // Chart instances
  courseWiseStudentChart!: Chart<"bar", number[], string>;
  attendanceChart!: Chart<"doughnut", number[], string>;
  performanceChart!: Chart<"line", number[], string>;
  enrollmentTrendChart!: Chart<"line", number[], string>;
  
  ngAfterViewInit(): void {
    this.initializeCourseWiseChart();
    this.initializeAttendanceChart();
    this.initializePerformanceChart();
    this.initializeEnrollmentTrendChart();
  }

  private initializeCourseWiseChart(): void {
    const courseWiseCtx = document.getElementById('courseWiseChart') as HTMLCanvasElement;
    this.courseWiseStudentChart = new Chart(courseWiseCtx, {
      type: 'bar',
      data: {
        labels: ['Web Development', 'Data Science', 'AI & ML', 'Mobile Dev', 'Cloud Computing'],
        datasets: [{
          label: 'Number of Students',
          data: [300, 450, 350, 280, 220],
          backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e74c3c'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Course-wise Students'
          }
        }
      }
    });
  }

  private initializeAttendanceChart(): void {
    const attendanceCtx = document.getElementById('attendanceChart') as HTMLCanvasElement;
    this.attendanceChart = new Chart(attendanceCtx, {
      type: 'doughnut',
      data: {
        labels: ['Present', 'Absent', 'Late'],
        datasets: [{
          data: [850, 250, 100],
          backgroundColor: ['#2ecc71', '#e74c3c', '#f1c40f'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: "Today's Attendance"
          }
        }
      }
    });
  }

  private initializePerformanceChart(): void {
    const performanceCtx = document.getElementById('performanceChart') as HTMLCanvasElement;
    this.performanceChart = new Chart(performanceCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Average Score',
          data: [75, 78, 82, 79, 85, 88],
          borderColor: '#3498db',
          tension: 0.1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Student Performance Trend'
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 70,
            max: 90
          }
        }
      }
    });
  }

  private initializeEnrollmentTrendChart(): void {
    const enrollmentCtx = document.getElementById('enrollmentTrendChart') as HTMLCanvasElement;
    this.enrollmentTrendChart = new Chart(enrollmentCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Enrollments',
          data: [120, 150, 180, 165, 190, 210],
          borderColor: '#2ecc71',
          tension: 0.1,
          fill: true,
          backgroundColor: 'rgba(46, 204, 113, 0.1)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Enrollment Trend'
          }
        }
      }
    });
  }
}