import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { StudentComponent } from './student/student.component'
import { TeacherComponent } from './teacher/teacher.component'
import { AdminComponent } from './admin/admin.component'
import { CourseDetailComponent } from './course-detail/course-detail.component'
import { CourseDataService } from './course-data.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    StudentComponent,
    TeacherComponent,
    AdminComponent,
    CourseDetailComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'course/:courseId', component: CourseDetailComponent },
      { path: '', component: HomeComponent },
    ])
  ],
  providers: [CourseDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
