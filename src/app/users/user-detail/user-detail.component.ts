import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/class/user';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component
(
  {
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
  }
)
export class UserDetailComponent implements OnInit
{
  user$!: Observable<User | null>;
  currentUser!: User;
  currentUser$!: Observable<User | null>;

  constructor
  (
    private userService: UserService,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private location: Location,
    private router: Router,
    private afAuth: AngularFireAuth,
  )
  {
  }

  ngOnInit(): void
  {
    const id = this.route.snapshot.paramMap.get('id');
    this.user$ = this.db.object<User>(`/user/${id}`).valueChanges();
    this.currentUser$ = this.afAuth.authState.pipe
    (
      map
      (
        (user: firebase.default.User | null) =>
        {
          if (user)
          {
            this.currentUser = new User(user);
            return this.currentUser;
          }
          return null;
        }
      )
    );
  }

  goBack(event: MouseEvent): void
  {
    event.preventDefault();
    this.location.back();
  }

  updateProfile(form :NgForm): void
  {
    this.userService.update(form.value);
    this.currentUser.isEdit = false;
  }
}
