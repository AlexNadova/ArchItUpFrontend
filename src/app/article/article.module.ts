import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ArticleRoutingModule } from "./article-routing.module";
import { ArticlesComponent } from "./articles/articles.component";
import { ArticleService } from "./article.service";
import { ArticleComponent } from "./article/article.component";
import { CreateArticleComponent } from "./create-article/create-article.component";

@NgModule({
  declarations: [ArticlesComponent, ArticleComponent, CreateArticleComponent],
  imports: [CommonModule, FormsModule, ArticleRoutingModule],
  providers: [ArticleService]
})
export class ArticleModule {}
