import { Injector } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { User, Education, Experience } from "src/app/models/user";
import { FooterService } from "src/app/footer/footer.service";
import { NotifierService } from "angular-notifier";
import { ArticleService } from "src/app/article/article.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: User = {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    fieldOfFocus: [] = [],
    education: [] = [],
    workExperience: [] = []
  };

  currentUser;
  education: Education[] = [];
  experience: Experience[] = [];
  fields: string[] = [];
  articles;
  articleKeys = Object.keys;
  private readonly notifier: NotifierService;
  constructor(
    private userService: UserService,
    private footer: FooterService,
    private router: Router,
    private injector: Injector,
    notifierService: NotifierService,
    private articleService: ArticleService
  ) {
    this.notifier = notifierService;
  }
  tempId = this.router.url.slice(9, this.router.url.length);
  getUserProfile(id) {
    this.userService.getUser(id).subscribe(
      (data: User) => {
        this.user = { ...data };
        this.education = this.user.education.sort(function(obj1, obj2) {
          return obj2.yearEnd - obj1.yearEnd;
        });
        this.fields = this.user.fieldOfFocus;
        this.experience = this.user.workExperience.sort(function(obj1, obj2) {
          return obj2.yearEnd - obj1.yearEnd;
        });
      },
      err => this.notifier.notify("error", "Error occured: " + err.message)
    );
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  getOwnersArticles() {
    this.articleService.getAllArticles().subscribe(
      data => {
        this.articles = { ...data.articles };
      },
      err => this.notifier.notify("error", "Error occured: " + err.message)
    );
    console.log("after service");
  }

  ngOnInit() {
    if (localStorage.getItem("_id") === this.tempId) this.router.navigate(["my-profile", this.tempId]);
      this.footer.hide();
      this.getUserProfile(this.tempId);
      this.getOwnersArticles();
  }
}
