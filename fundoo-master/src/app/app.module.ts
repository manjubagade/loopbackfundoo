import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { MyMaterialModule } from './material.module'
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TakeNoteComponent } from './components/take-note/take-note.component';
import { IconComponent } from './components/icon/icon.component';
import {AuthGuard} from './service/auth/auth.guard';
import {AuthserviceService} from './service/auth_servive/authservice.service';
import { NoteComponent } from './components/note/note.component';
import { DiaplayNoteComponent } from './components/diaplay-note/diaplay-note.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { TrashNoteComponent } from './components/trash-note/trash-note.component';
import { ArchiveNoteComponent } from './components/archive-note/archive-note.component';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SerchNotesComponent } from './components/serch-notes/serch-notes.component';
import { CreateLabelComponent } from './components/create-label/create-label.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { SearchLabelPipe } from './pipe/search-label.pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatePipe } from '@angular/common';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReminderNotesComponent} from './components/reminder-notes/reminder-notes.component';
import {UpdateRemainderNotesComponent} from './components/update-remainder-notes/update-remainder-notes.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ResetPasswordComponent,
    TakeNoteComponent,
    IconComponent,
    NoteComponent,
    DiaplayNoteComponent,
    UpdateNoteComponent,
    TrashNoteComponent,
    ArchiveNoteComponent,
    ProfilePicComponent,
    SerchNotesComponent,
    CreateLabelComponent,
    SearchLabelPipe,
    CollaboratorsComponent,
    ReminderNotesComponent,
    UpdateRemainderNotesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MyMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    MatCheckboxModule,
    MatChipsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatAutocompleteModule,



  ],
providers: [AuthGuard, AuthserviceService, DatePipe],
  entryComponents : [UpdateNoteComponent, ProfilePicComponent,
                     CreateLabelComponent, CollaboratorsComponent,UpdateRemainderNotesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
