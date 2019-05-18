import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../article.service";
import { NotifierService } from "angular-notifier";
import { FooterService } from "src/app/footer/footer.service";
import { Article } from "src/app/models/article";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: "app-create-article",
  templateUrl: "./create-article.component.html",
  styleUrls: ["./create-article.component.css"]
})
export class CreateArticleComponent implements OnInit {
  private readonly notifier: NotifierService;
  article: Article = {
    _id: "",
    title: "",
    author: [] = [],
    description: "",
    content: ""
  };
  authors:string[]=[];
  constructor(
    private articleService: ArticleService,
    private footer: FooterService,
    private notifierService: NotifierService,
    public router: Router,
    private userService:UserService
  ) {
    this.notifier = notifierService;
  }

  create(form: NgForm) {
    this.article = {
      _id: "",
      title: form.value.title,
      author: this.authors,
      description: form.value.description,
      content: form.value.content
    };
    console.log(this.article);
    this.articleService.create(this.article).subscribe(
      res => {
        this.router.navigate(["/articles"]);
        this.notifier.notify("success", "Article successfully created");
      },
      err => this.notifier.notify("error", "Error occured: " + err.message)
    );
  }
  getUserName(){
    this.userService.getUser().subscribe(
      (data: User) => {
        this.authors.push(data.firstName + " " + data.lastName);
      },
      err => this.notifier.notify("error", "Can't get user's name. Error: " + err.message)
    );
  }

  addFields(a) {
    a.push("");
    console.log(a);
  }
  removeFields(a) {
    if(a.length>1) a.splice(a.length - 1, 1);
  }

  ngOnInit() {
    this.footer.hide();
    this.getUserName();
  }
}
