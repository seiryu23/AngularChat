import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment } from '../class/comment';
import { User } from '../class/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  collection,  CollectionReference,  Firestore,  FirestoreModule,  getDocs,  getFirestore,  query,  where } from '@angular/fire/firestore';

@Component
(
  {
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
  }
)

export class ChatComponent implements OnInit
{
  comments$!:  Observable<Comment[]>;
  commentsRef:  AngularFireList<Comment>;
  currentUser!: User;
  currentUser$!: Observable<User | null>;
  comment = '';
  userRef : any;

  constructor
  (
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
//    ,private selectDb: Firestore
  )
  {
    this.commentsRef = db.list('/comments');
//    this.selectDb = getFirestore();
//    this.userRef = collection(selectDb,'user');
  }

  ngOnInit(): void
  {
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

    this.comments$ = this.commentsRef.snapshotChanges()
      .pipe
      (
        map
        (
          (snapshots: SnapshotAction<Comment>[]) =>
          {
            return snapshots.map
            (
              snapshot =>
              {
                const value = snapshot.payload.val();
                return new Comment({key: snapshot.payload.key, ...value });
              }
            );
          }
        )
      );
  }

  addComment(comment: string):void
  {
    if(comment)
    {
      this.commentsRef.push
      (
        new Comment
        (
          {
            user: this.currentUser,
            message: comment
          }
        )
      );
      this.comment = '';
    }
  }

  updateComment(comment: Comment): void
  {
    const { key, message } = comment;

    // keyはOptionalなのでundefinedチェックをする
    if (typeof key === 'undefined')
    {
      return;
    }

    this.commentsRef.update
    (
      key,
      { message }
    );
  }

  deleteComment(comment: Comment): void
  {
    this.commentsRef.remove(comment.key);
  }

 //dispInitial(user: User): string
 //{
 //  str : String;
 //  getDocs(query(this.userRef,where("uid","==", user.uid)))
 //  .then(snapshot =>{
 //      snapshot.forEach(doc=> {
 //        return doc.initial;
 //      })
 //    })
 //}
}
