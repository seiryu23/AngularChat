export class User
{
  displayName!: string;
  email!: string;
  photoURL!: string;
  uid!: string;
  initial!: string;
  isEdit!: boolean;

  constructor(user: User | firebase.default.User | null)
  {
    if (user !== null)
    {
      this.uid = user.uid;
      this.displayName = user.displayName || "";
      this.email = user.email || "";
      this.photoURL = user.photoURL || "";
      this.isEdit = false;
      if (user.displayName !== null)
      {
        this.initial = user.displayName.slice(0, 1);
      }
      else
      {
        this.initial = "";
      }
    }
  }
}
