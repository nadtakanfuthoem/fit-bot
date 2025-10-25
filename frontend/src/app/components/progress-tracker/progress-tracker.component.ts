import { Component } from '@angular/core';
import { FitnessService, ProgressData } from '../../services/fitness.service';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent {
  progressData: ProgressData = {
    currentWeight: 0,
    targetWeight: 0,
    completedWorkouts: 0,
    startDate: '',
    measurements: {
      chest: 0,
      waist: 0,
      hips: 0,
      arms: 0
    }
  };

  analysis: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private fitnessService: FitnessService) {
    // Set default start date to 30 days ago
    const date = new Date();
    date.setDate(date.getDate() - 30);
    this.progressData.startDate = date.toISOString().split('T')[0];
  }

  trackProgress(): void {
    if (!this.progressData.currentWeight || !this.progressData.targetWeight) {
      this.error = 'Please fill in weight information';
      return;
    }

    this.loading = true;
    this.error = '';
    this.analysis = '';

    this.fitnessService.trackProgress(this.progressData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.analysis = response.progressAnalysis;
        } else {
          this.error = 'Failed to analyze progress';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error connecting to fitness agent. Please check your API configuration.';
        console.error('Error:', err);
      }
    });
  }

  formatAnalysis(analysis: string): string {
    return analysis.replace(/\n/g, '<br>');
  }
}
