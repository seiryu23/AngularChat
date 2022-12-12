import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'src/app/class/user';

@Injectable
(
  {
  providedIn: 'root'
  }
)

export class UserService
{
  constructor
  (
    private afAuth: AngularFireAuth,
    private db:AngularFireDatabase
  )
  {
  }

  create(email: string, password: string): Promise<void>
  {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then
      (
        ( credential ) =>
        {
          if ( credential.user !== null )
          {
            const { user } = credential;
            const actionCodeSetting =
            {
              // deploy
            url: `https://angular-chat-29b54/?newAccount=true&email=${user.email}`
              // test
//              url: `http://localhost:4200/?newAccount=true&email=${user.email}`
            };
            user.sendEmailVerification(actionCodeSetting);
            this.db.object(`/user/${user.uid}`).set(new User(user));
          }
        }
      );
  }

  update(values: { displayName?: string, photoURL? :string}): Promise<void>
  {
    // currentUser(ログインしているユーザ)が存在した時に処理を行う
    return this.afAuth.currentUser.then
    (
      (user: firebase.default.User | null) =>
      {
        if (user)
        {
          user.updateProfile(values)
            .then
            (
              () =>
              this.db.object(`/user/${user.uid}`).update(values)
            )
            .catch
            (
              error =>
              console.error(error)
            )
        }
      }
    )
  }
}
