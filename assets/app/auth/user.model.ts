export class User {
    constructor (public email: string,
                 public password: string,
                 public firstName?:string,
                 public lastName?:string,
                 public userID?:string,
                 public cor?: string,
                 public font?: string){
                    this.email = email;
                    this.password = password;
                    this.userID = userID;
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.cor = cor;
                    this.font = font;                    
                 }
}