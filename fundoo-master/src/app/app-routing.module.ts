import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './service/auth/auth.guard';
import { TakeNoteComponent } from './components/take-note/take-note.component';
import { NoteComponent } from './components/note/note.component';
import { TrashNoteComponent } from './components/trash-note/trash-note.component';
import { ArchiveNoteComponent } from './components/archive-note/archive-note.component';
import {SerchNotesComponent} from './components/serch-notes/serch-notes.component';
import {ReminderNotesComponent} from './components/reminder-notes/reminder-notes.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'note',
        pathMatch: 'full'
      },
      {
        path: 'note',
        component: NoteComponent
      },
      {
        path: 'trash',
        component: TrashNoteComponent
      },
      {
        path: 'archive',
        component: ArchiveNoteComponent
      },
      { path: 'search',
        component: SerchNotesComponent
      },
      {
        path: 'remainder',
        component: ReminderNotesComponent
      },
  
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
