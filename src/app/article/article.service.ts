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
  id: string;

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

  deleteArticle(): Observable<any> {
    //this.id = localStorage.getItem("_id");
    return this.http.delete<Article>(articleUrl + this.id, {
      headers: httpheaders
    });
  }

  updateArticle(article): Observable<any> {
    //this.id = localStorage.getItem("_id");
    return this.http.patch<Article>(articleUrl + this.id, JSON.stringify(article), {
      headers: httpheaders
    });
  }
}

