import { Friends } from "./friends.model";

export class User {
  public id?: number;
  public firstName: string;
  public lastName: string;
  public address: string;
  public contact: string;
  public friends?: Friends[];

  constructor (id: number, firstName: string, lastName: string, address: string, contact: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.contact = contact;
  }
}
