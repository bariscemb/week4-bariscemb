import * as  bcrypt from 'bcrypt';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as user from "../entity/User";

 export class UserDocument {
  id: number;
  email: string;
  password: string;
  token: string;

} 

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()

  id: string;
 
  @Column()
   
  email: string;

  @Column({ type: "varchar", length: 15 })
  
  password: string;

}

//adding salt and preparing hash of password
  async function salt() {
 const salt = await bcrypt.genSalt();
 this.password = await bcrypt.hash(this.password, salt);

}; 

// user login authentication
 async function pass (email:string, password:string) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error ('incorrect password');
  }
  throw Error ('incorrect email');
};


export default User;