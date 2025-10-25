import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WorkoutPlanComponent } from './components/workout-plan/workout-plan.component';
import { ProgressTrackerComponent } from './components/progress-tracker/progress-tracker.component';
import { ChatComponent } from './components/chat/chat.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';

import { FitnessService } from './services/fitness.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WorkoutPlanComponent,
    ProgressTrackerComponent,
    ChatComponent,
    RecommendationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [FitnessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
