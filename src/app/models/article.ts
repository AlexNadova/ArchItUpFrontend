export class Article {
  constructor(
    public _id: string,
    public title: string, //required
    public author: Array<string>, //required
    public description: string,
    //keywords: { type: Array },
    //articleImages: Array<string>,,
    //public titleImage: string,
    //category: string,
    public content: string
  ) {}
}
