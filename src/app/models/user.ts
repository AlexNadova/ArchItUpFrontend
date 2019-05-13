export class User {
  constructor(
    public _id: string,
    //public profile_picture:??
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    //public date_of_birth: Date, //??
    public country: String,
    public city: String,
    public fieldOfFocus: String,
    public education: Array<Education>,
    public workExperience: Array<Experience>
  ) //public description: String //??
  {}
}
export class Education {
  constructor(
    public _id: string,
    public school: String,
    public specialisation: string,
    public yearStart: number,
    public yearEnd: number
  ) {}
}
export class Experience {
  constructor(
    public _id: string,
    public company: String,
    public position: string,
    public yearStart: number,
    public yearEnd: number
  ) {}
}
