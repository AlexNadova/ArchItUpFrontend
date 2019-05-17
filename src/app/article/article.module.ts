import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ArticleRoutingModule } from "./article-routing.module";
import { ArticlesComponent } from "./articles/articles.component";
import { ArticleService } from "./article.service";
import { ArticleComponent } from "./article/article.component";

@NgModule({
  declarations: [ArticlesComponent, ArticleComponent],
  imports: [CommonModule, ArticleRoutingModule],
  providers: [ArticleService]
})
export class ArticleModule {}
