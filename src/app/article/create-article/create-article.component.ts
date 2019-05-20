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
  article: Article = {
    _id: "",
    title: "",
    author: [] = [],
    description: "",
    content: "",
    ownerId:""
  };
  authors:string[]=[""];

  private readonly notifier: NotifierService;
  constructor(
    private articleService: ArticleService,
    private footer: FooterService,
    notifierService: NotifierService,
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
      content: form.value.content,
      ownerId: localStorage.getItem("_id")
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

  addFields(a) {
    a.push("");
  }
  removeFields(a) {
    if(a.length>1) a.splice(a.length - 1, 1);
  }

  ngOnInit() {
    this.footer.hide();
  }
}
