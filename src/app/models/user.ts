export class User {
  constructor(
    //public profile_picture:??
    public id: number,
    public first_name: string,
    public last_name: string,
    public password: string,
    public email: string,
    public phone: string
  ) {}
}
