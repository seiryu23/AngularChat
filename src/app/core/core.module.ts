import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Firebase Add Start
// Firebase連携するために以下を追加
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// Firebase Add End
import { environment } from '../../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule
(
  {
    declarations:
    [
      HeaderComponent,
      NotFoundComponent
    ],
    imports:
    [
      CommonModule,
      RouterModule,
// Firebase Add Start
      // Firebase連携するために以下を追加
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
// Firebase Add End
    ],
    exports:
    [
      HeaderComponent
    ]
  }
)

export class CoreModule
{
}
