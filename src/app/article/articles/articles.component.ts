import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../article.service";
import { Article } from "src/app/models/article";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.css"]
})
export class ArticlesComponent implements OnInit {
  article: Article = {
    _id: "",
    title: "", //required
    author: [] = [], //required
    description: "",
    //titleImage: "",
    content: ""
  };
  private readonly notifier: NotifierService;

  articleKeys = Object.keys;
  articles;
  pageLimit:number = 9;

  constructor(
    private articleService: ArticleService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  getAllArticle() {
    this.articleService.getAllArticles().subscribe(
      (data) => {
        this.articles = { ...data.articles };
      },
      err => this.notifier.notify("error", "Error occured: " + err.message)
    );
  }
  //load more articles on page
  loadMore(){
    let limit = this.pageLimit+9;
    this.pageLimit = limit > this.articles.length ? this.articles.length : limit;
  }
  ngOnInit() {
    this.getAllArticle();
  }
}
