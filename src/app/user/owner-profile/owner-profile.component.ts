import { Injector } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { User, Education, Experience } from "src/app/models/user";
import { FooterService } from "src/app/footer/footer.service";
import { NotifierService } from "angular-notifier";
import { NgForm } from "@angular/forms";
import { ArticleService } from "src/app/article/article.service";

@Component({
  selector: "app-owner-profile",
  templateUrl: "./owner-profile.component.html",
  styleUrls: ["./owner-profile.component.css"]
})
export class OwnerProfileComponent implements OnInit {
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
  headerInfo: [
    { propFirstName: "firstName"; value: "" },
    { propLastName: "lastName"; value: "" },
    { propCountry: "country"; value: "" },
    { propCity: "city"; value: "" },
    { propFieldOfFocus: "fieldOfFocus"; value: string[] }
  ];
  contactInfo: [
    { propPhone: "phone"; value: "" },
    { propEmail: "email"; value: "" }
  ];
  privacyInfo: [{ propPassword: "password"; value: "" }];
  eduObj = {
    school: "",
    specialization: "",
    yearStart: 0,
    yearEnd: 0
  };
  educationInfo: [
    {
      propEducation: "education";
      value: Education[];
    }
  ];
  experienceInfo: [
    { propWorkExperience: "workExperience"; value: Experience[] }
  ];

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
  tempId = localStorage.getItem("_id");
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

  deleteUser() {
    this.userService.deleteUser().subscribe(
      res => {
        this.userService.logout();
        this.router.navigate([""]);
        this.notifier.notify(
          "success",
          "You successfully deleted your account"
        );
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
    this.footer.hide();
    this.getUserProfile(this.tempId);
    this.getOwnersArticles();
  }
  addFields(a) {
    a.push("");
  }
  addArrayFields(a) {
    a.push(this.eduObj);
  }

  removeFields(a) {
    a.splice(a.length - 1, 1);
  }

  updateHeader(form: NgForm) {
    console.log(this.user);
    console.log(this.fields);
    this.headerInfo = [
      {
        propFirstName: "firstName",
        value:
          typeof form.value.firstName === "string"
            ? form.value.firstName
            : this.user.firstName
      },
      {
        propLastName: "lastName",
        value:
          typeof form.value.lastName === "string"
            ? form.value.lastName
            : this.user.lastName
      },
      {
        propCountry: "country",
        value:
          typeof form.value.country === "string"
            ? form.value.country
            : this.user.country
      },
      {
        propCity: "city",
        value:
          typeof form.value.city === "string" ? form.value.city : this.user.city
      },
      {
        propFieldOfFocus: "fieldOfFocus",
        value: this.fields
      }
    ];
    console.log(this.headerInfo);
    this.userService.updateUser(this.headerInfo).subscribe(
      res => {
        this.notifier.notify(
          "success",
          "Your information was successfully updated"
        );
      },
      err => this.notifier.notify("error", "Error occured: " + err.message)
    );
  }

  updateContact(form: NgForm) {
    this.contactInfo = [
      {
        propPhone: "phone",
        value:
          typeof form.value.phone === "string"
            ? form.value.phone
            : this.user.phone
      },
      {
        propEmail: "email",
        value:
          typeof form.value.email === "string"
            ? form.value.email
            : this.user.email
      }
    ];
    this.userService.updateUser(this.contactInfo).subscribe(
      res => {
        this.notifier.notify(
          "success",
          "Your contact information was successfully updated"
        );
      },
      err => this.notifier.notify("error", "Error occured: " + err.message)
    );
  }

  updatePrivacy(form: NgForm) {
    this.privacyInfo = [
      {
        propPassword: "password",
        value:
          typeof form.value.password === "string"
            ? form.value.password
            : this.user.password
      }
    ];
    this.userService.updateUser(this.privacyInfo).subscribe(
      res => {
        this.notifier.notify(
          "success",
          "Your contact information was successfully updated"
        );
      },
      err => this.notifier.notify("error", "Error occured: " + err.message)
    );
  }

  updateEducation(form: NgForm) {
    console.log(this.user);
    console.log(form.value.education);
    this.educationInfo = [
      {
        propEducation: "education",
        value: this.education
      }
    ];
    console.log(this.educationInfo);
    this.userService.updateUser(this.educationInfo).subscribe(
      res => {
        this.notifier.notify(
          "success",
          "Your information was successfully updated"
        );
      },
      err => this.notifier.notify("error", "Error occured: " + err.message)
    );
  }
  updateExperience() {
    this.experienceInfo = [
      {
        propWorkExperience: "workExperience",
        value: this.experience
      }
    ];
    console.log(JSON.stringify(this.experienceInfo));
    this.userService.updateUser(this.experienceInfo).subscribe(
      res => {
        this.notifier.notify(
          "success",
          "Your information was successfully updated"
        );
      },
      err => this.notifier.notify("error", "Error occured: " + err.message)
    );
  }
}
