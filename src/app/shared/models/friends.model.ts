export class Friends {
  public userId?: number;
  public friendId?: number;
  public firstName: string;
  public lastName: string;
  public isActive: string;

  constructor(friendId: number, firstName: string, lastName: string, isActive: string){
    this.friendId = friendId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
  }
}
