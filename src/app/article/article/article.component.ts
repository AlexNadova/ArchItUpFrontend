import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ArticleService } from "../article.service";
import { Article } from "src/app/models/article";
import { NotifierService } from "angular-notifier";
import { FooterService } from "src/app/footer/footer.service";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"]
})
export class ArticleComponent implements OnInit {
  article: Article = {
    _id: "",
    title: "",
    author: [] = [],
    description: "",
    content: ""
  };
  authors: string[] = [];
  articleId = this.router.url.substring(18, this.router.url.length);
  private readonly notifier: NotifierService;

  constructor(
    private router: Router,
    notifierService: NotifierService,
    private articleService: ArticleService,
    private footer: FooterService
  ) {
    this.notifier = notifierService;
  }
  getArticle() {
    this.articleService.getArticle(this.articleId).subscribe(
      (data: Article) => {
        this.article = { ...data };
        //console.log(JSON.stringify(this.article));
        this.authors = this.article.author;
      },
      err => this.notifier.notify("error", "Error occured: " + err.message)
    );
  }
  
  ngOnInit() {
    this.footer.hide();
    this.getArticle();
  }
}
