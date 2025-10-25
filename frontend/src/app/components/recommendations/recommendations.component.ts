import { Component } from '@angular/core';
import { FitnessService, RecommendationRequest } from '../../services/fitness.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {
  formData: RecommendationRequest = {
    currentPlan: '',
    recentPerformance: '',
    energyLevels: '',
    sleepQuality: '',
    nutrition: ''
  };

  recommendations: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private fitnessService: FitnessService) { }

  getRecommendations(): void {
    if (!this.formData.currentPlan || !this.formData.recentPerformance) {
      this.error = 'Please fill in at least your current plan and recent performance';
      return;
    }

    this.loading = true;
    this.error = '';
    this.recommendations = '';

    this.fitnessService.getRecommendations(this.formData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.recommendations = response.recommendations;
        } else {
          this.error = 'Failed to get recommendations';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error connecting to fitness agent. Please check your API configuration.';
        console.error('Error:', err);
      }
    });
  }

  formatRecommendations(recs: string): string {
    return recs.replace(/\n/g, '<br>');
  }
}
