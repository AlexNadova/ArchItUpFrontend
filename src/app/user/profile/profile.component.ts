import { Injector } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { User, Education, Experience } from "src/app/models/user";
import { FooterService } from "src/app/footer/footer.service";
import { NotifierService } from "angular-notifier";
import { NgForm } from "@angular/forms";

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

  private readonly notifier: NotifierService;
  constructor(
    private userService: UserService,
    private footer: FooterService,
    private router: Router,
    private injector: Injector,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  getUserProfile() {
    this.userService.getUser().subscribe(
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

  ngOnInit() {
    this.footer.hide();
    this.getUserProfile();
  }
  addFields(a) {
    a.push("");
  }
  addArrayFields(a) {
    console.log(this.education);
    a.push(this.eduObj);
    console.log(this.education);
  }

  removeFields(a) {
    a.splice(a.length - 1, 1);
  }
  checkIfCorrect(a) {
    if (Array.isArray(a)) {
      console.log("array check true");
      for (let i: 0; i < a.length - 1; i++) {
        if (!Array.isArray(a[i])) {
          console.log(a[i] + ": array check false");
          return false;
        }
        console.log(a[i] + ": array check true");
        for (let j: 0; j < a[i].length - 1; j++) {
          if (!(typeof a[i][j] === "string") || typeof a[i][j] === "number") {
            console.log(a[i][j] + ": type check true");
            return true;
          }
          console.log(a[i][j] + ": type check false");
          return false;
        }
      }
    }
    console.log("array check false");
    return false;
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
  updateExperience(form: NgForm) {
    console.log(this.user);
    console.log(form.value);
    console.log(this.experience);
    this.experienceInfo = [
      {
        propWorkExperience: "workExperience",
        value: this.experience
      }
    ];
    console.log(this.experienceInfo);
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
