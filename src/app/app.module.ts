import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

@NgModule
(
  {
    declarations:
    [
      AppComponent,
      SignUpComponent,
      LoginComponent
    ],
    imports:
    [
      BrowserModule,
      // 共通モジュール
      SharedModule,
      // 初期化モジュール
      CoreModule,
      AppRoutingModule
    ],
    providers:
    [
    ],
    bootstrap:
    [
      AppComponent
    ]
  }
)

export class AppModule
{
}
