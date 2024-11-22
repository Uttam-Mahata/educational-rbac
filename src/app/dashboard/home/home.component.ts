import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  // Initialize Chart Instances
  courseWiseStudentChart!: Chart<'bar', number[], string>;
  attendanceChart!: Chart<'doughnut', number[], string>;

  ngAfterViewInit(): void {
    // Render Course-wise Students Chart
    const courseWiseCtx = document.getElementById('courseWiseChart') as HTMLCanvasElement;
    this.courseWiseStudentChart = new Chart(courseWiseCtx, {
      type: 'bar',
      data: {
        labels: ['Web Development', 'Data Science', 'AI & Machine Learning'],
        datasets: [{
          label: 'Number of Students',
          data: [300, 450, 350],
          backgroundColor: ['#3498db', '#2ecc71', '#f1c40f'],
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

    // Render Today's Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart') as HTMLCanvasElement;
    this.attendanceChart = new Chart(attendanceCtx, {
      type: 'doughnut',
      data: {
        labels: ['Present', 'Absent'],
        datasets: [{
          data: [900, 300],
          backgroundColor: ['#2ecc71', '#e74c3c'],
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
}
