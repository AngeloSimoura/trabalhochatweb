export class User {
    constructor (public email: string,
                 public password: string,
                 public firstName?:string,
                 public lastName?:string,
                 public userID?:string){
                    this.email = email;
                    this.password = password;
                    this.userID = userID;
                    this.firstName = firstName;
                    this.lastName = lastName;
                 }
}