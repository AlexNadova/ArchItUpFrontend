export class User {
  constructor(
    //public profile_picture:??
    public first_name: string,
    public last_name: string,
    //public password: string,
    public email: string,
    public phone: string,

    public role: string,
    public token?:string
  ) {}
}

export class FullUser{
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    //public date_of_birth: Date, //??
    public country: String,
    public city: { type: String },
    //permissionLevel: { type: Number, default: config.permissionLevels.REG_USER },
    public fieldOfFocus: String,
    public education: String,
    public experience: String,
    //public description: String //??
  ){}
}
