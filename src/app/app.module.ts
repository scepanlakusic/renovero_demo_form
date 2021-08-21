import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DemoFormComponent } from './components/demo-form/demo-form.component';
import { DemoFormFieldComponent } from './components/demo-form-field/demo-form-field.component';
import { DemoFormControlDirective } from './directives/demo-form-control.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoFormErrorComponent } from './components/demo-form-error/demo-form-error.component';
import { DropDownInputComponent } from './customControls/drop-down-input/drop-down-input.component';
import { CustomControlDirective } from './directives/custom-control.directive';
import { MessageComponent } from './components/message/message.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DemoFormComponent,
    DemoFormFieldComponent,
    DemoFormControlDirective,
    DemoFormErrorComponent,
    DropDownInputComponent,
    CustomControlDirective,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
