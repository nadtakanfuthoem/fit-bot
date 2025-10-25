import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WorkoutPlanComponent } from './components/workout-plan/workout-plan.component';
import { ProgressTrackerComponent } from './components/progress-tracker/progress-tracker.component';
import { ChatComponent } from './components/chat/chat.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workout-plan', component: WorkoutPlanComponent },
  { path: 'progress', component: ProgressTrackerComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'recommendations', component: RecommendationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
