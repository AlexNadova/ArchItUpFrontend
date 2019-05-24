import { Injectable } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Article } from "../models/article";
import { Observable } from "rxjs";

const httpheaders = new HttpHeaders({
  "Content-Type": "application/json"
});
const articleUrl = "http://localhost:4000/api/article/";

@Injectable({
  providedIn: 'root'
})
export class ArticleService { 
  constructor(private http: HttpClient) {}

  create(article:Article): Observable<any> {
    console.log(JSON.stringify(article));
    return this.http.post<Article>(
      articleUrl,
      JSON.stringify(article),
      {
        headers: httpheaders
      }
    );
  }

  getArticle(id): Observable<any> {
    return this.http.get<Article>(articleUrl + id, {
      headers: httpheaders
    });
  }

  getAllArticles(): Observable<any> {
    return this.http.get<Article>(articleUrl, {
      headers: httpheaders
    });
  }

  logout() {
    localStorage.clear();
  }

  deleteArticle(id): Observable<any> {
    return this.http.delete<Article>(articleUrl + id, {
      headers: httpheaders
    });
  }

  updateArticle(id, article): Observable<any> {
    return this.http.patch<Article>(articleUrl + id, JSON.stringify(article), {
      headers: httpheaders
    });
  }
}

