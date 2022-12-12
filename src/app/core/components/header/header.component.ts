import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component
(
  {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  }
)
export class HeaderComponent implements OnInit
{
  // ログインしているかどうか
  isLogin: boolean = false;

  constructor
  (
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  )
  {
  }

  ngOnInit(): void
  {
    this.afAuth.onAuthStateChanged
    (
      (user: firebase.default.User | null) =>
      {
        this.isLogin = !!user;
      }
    );
  }

  logout():void
  {
    this.authService.logout()
    .then
    (
      () =>
      this.router.navigateByUrl('/login')
    );
  }
}
