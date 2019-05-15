export class User {
  constructor(
    public _id: string,
    //public profile_picture:??
    public password: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    //public date_of_birth: Date, //??
    public country: string,
    public city: string,
    public fieldOfFocus: Array<string>,
    public education: Array<Education>,
    public workExperience: Array<Experience>
  ) //public description: string //??
  {}
}
export class Education {
  constructor(
    public _id: string,
    public school: string,
    public specialisation: string,
    public yearStart: number,
    public yearEnd: number
  ) {}
}
export class Experience {
  constructor(
    public _id: string,
    public company: string,
    public position: string,
    public yearStart: number,
    public yearEnd: number
  ) {}
}
