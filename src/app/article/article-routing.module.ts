import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArticlesComponent } from "./articles/articles.component";
import { ArticleComponent } from './article/article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { AuthGuard } from '../authentication/auth-guard';
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
  },
  {
    path: "create",
    component: CreateArticleComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Add article",     
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {}
