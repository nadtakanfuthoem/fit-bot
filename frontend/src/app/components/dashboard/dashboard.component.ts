import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    workoutsCompleted: 24,
    currentStreak: 5,
    totalDays: 30,
    weightProgress: -3.2
  };

  recentActivities = [
    { date: '2025-10-22', workout: 'Upper Body Strength', duration: '45 min', completed: true },
    { date: '2025-10-21', workout: 'Cardio HIIT', duration: '30 min', completed: true },
    { date: '2025-10-20', workout: 'Lower Body Strength', duration: '50 min', completed: true },
    { date: '2025-10-19', workout: 'Rest Day', duration: '-', completed: true },
    { date: '2025-10-18', workout: 'Full Body Workout', duration: '40 min', completed: true }
  ];

  upcomingWorkouts = [
    { day: 'Today', workout: 'Core & Flexibility', time: '6:00 PM' },
    { day: 'Tomorrow', workout: 'Upper Body Push', time: '6:00 PM' },
    { day: 'Friday', workout: 'Cardio Endurance', time: '6:00 PM' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
