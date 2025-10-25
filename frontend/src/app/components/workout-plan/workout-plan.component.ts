import { Component } from '@angular/core';
import { FitnessService, WorkoutPlanRequest } from '../../services/fitness.service';

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.css']
})
export class WorkoutPlanComponent {
  formData: WorkoutPlanRequest = {
    fitnessLevel: 'beginner',
    goals: '',
    equipment: '',
    daysPerWeek: 3,
    medicalConditions: ''
  };

  generatedPlan: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private fitnessService: FitnessService) { }

  generatePlan(): void {
    if (!this.formData.goals) {
      this.error = 'Please enter your fitness goals';
      return;
    }

    this.loading = true;
    this.error = '';
    this.generatedPlan = '';

    this.fitnessService.generateWorkoutPlan(this.formData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.generatedPlan = response.workoutPlan;
        } else {
          this.error = 'Failed to generate workout plan';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error connecting to fitness agent. Please check your API configuration.';
        console.error('Error:', err);
      }
    });
  }

  formatPlan(plan: string): string {
    return plan.replace(/\n/g, '<br>');
  }
}
