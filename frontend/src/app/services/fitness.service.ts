import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WorkoutPlanRequest {
  fitnessLevel: string;
  goals: string;
  equipment?: string;
  daysPerWeek: number;
  medicalConditions?: string;
}

export interface ProgressData {
  currentWeight: number;
  targetWeight: number;
  completedWorkouts: number;
  startDate: string;
  measurements?: any;
}

export interface RecommendationRequest {
  currentPlan: string;
  recentPerformance: string;
  energyLevels: string;
  sleepQuality: string;
  nutrition: string;
}

export interface ChatMessage {
  message: string;
  conversationHistory?: any[];
  userContext?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FitnessService {
  // Update this with your deployed API endpoint
  private apiUrl = 'https://your-api-gateway-url.amazonaws.com/dev/api';

  // For local development
  // private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  generateWorkoutPlan(data: WorkoutPlanRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/workout-plan`, data);
  }

  trackProgress(data: ProgressData): Observable<any> {
    return this.http.post(`${this.apiUrl}/progress`, data);
  }

  getRecommendations(data: RecommendationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/recommendations`, data);
  }

  chat(data: ChatMessage): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat`, data);
  }
}
