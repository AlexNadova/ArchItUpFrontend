import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArticlesComponent } from "./articles/articles.component";
import { ArticleComponent } from './article/article.component';
const routes: Routes = [
  {
    path: "",
    component: ArticlesComponent,
    data: {
      title: "Articles"
    }
  },
  {
    path: "article/:id",
    component: ArticleComponent,
    data: {
      title: "Articles"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {}
