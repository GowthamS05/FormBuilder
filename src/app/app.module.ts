import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DndModule } from 'ngx-drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListOfFormsComponent } from './list-of-forms/list-of-forms.component';
import { FormbuilderComponent } from './formbuilder/formbuilder.component';
import { GeneratedFormComponent } from './generated-form/generated-form.component';
import { LoaderComponent } from './loader/loader.component';

const appRoutes: Routes =
  [{
    path: '',
    component: AppComponent,
    children: [
      { path: 'list', component: ListOfFormsComponent },
      { path: 'list/:id/detail', component: GeneratedFormComponent },
      { path: 'formBuilder', component: FormbuilderComponent },
      { path: 'list/:id/form', component: FormbuilderComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  }]
@NgModule({
  declarations: [AppComponent, ListOfFormsComponent, FormbuilderComponent, GeneratedFormComponent, LoaderComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DndModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right'
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
