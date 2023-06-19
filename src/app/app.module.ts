import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListAssignmentComponent } from './devoirs/list-assignment/list-assignment.component';
import { RowAssignmentComponent } from './devoirs/row-assignment/row-assignment.component';
import { DetailAssignmentComponent } from './devoirs/detail-assignment/detail-assignment.component';
import { AddAssignemntComponent } from './devoirs/add-assignemnt/add-assignemnt.component';
import { EditAssignmentComponent } from './devoirs/edit-assignment/edit-assignment.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  {
    path: '',
    component: ListAssignmentComponent
  },
  {
    path: 'home',
    component: ListAssignmentComponent
  },
  {
    path: 'assignments/:_id',
    component: DetailAssignmentComponent
  },
  {
    path: 'assignments/:id/edit',
    component: EditAssignmentComponent
  },
  {
    path: 'add',
    component: AddAssignemntComponent
  },

  // {
  //   path: 'assignments/:id/edit',
  //   component: EditAssignmentComponent,
  //   canActivate: [authGuard]
  // },

  {
    path: 'login',
    component: LoginComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    ListAssignmentComponent,
    RowAssignmentComponent,
    DetailAssignmentComponent,
    AddAssignemntComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, RouterModule.forRoot(routes),
    HttpClientModule,
    MatNativeDateModule, ScrollingModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatListModule, MatCardModule, MatCheckboxModule, MatSlideToggleModule,
    MatTableModule, MatPaginatorModule, MatToolbarModule, MatSidenavModule,
    MatProgressSpinnerModule, MatStepperModule, MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
