import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes =
[
  {
    // 基本ページ
    path : '',
    loadChildren:
      () =>
      import('./timeline/timeline.module')
        .then(
          m =>
          m.TimelineModule
        )
  },
  {
    // 機能別に実装する時に使用する
    path : 'users',
    loadChildren:
      () =>
      import('./users/users.module')
        .then
        (
          m =>
          m.UsersModule
        )
  },
  {
    // 新規登録ページ
    path : 'signup',
    component: SignUpComponent,
    canActivate: [AuthGuard]
  },
  {
    // ログインページ
    path : 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    // 404エラーページ
    path : '**',
    component: NotFoundComponent
  }
];

@NgModule
(
  {
    imports:
    [
      RouterModule.forRoot(routes)
    ],
    exports:
    [
      RouterModule
    ]
  }
)

export class AppRoutingModule
{
}
