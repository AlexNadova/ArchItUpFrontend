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
    fieldOfFocus: "",
    education: [] = [],
    workExperience: [] = []
  };
  headerInfo: [
    { propFirstName: "firstName"; value: "" },
    { propFirstName: "lastName"; value: "" },
    { propCountry: "country"; value: "" },
    { propCity: "city"; value: "" }
    //{ propFieldOfFocus: "fieldOfFocus"; value: "" }
  ];
  
  currentUser;
  education: Education[] = [];
  experience: Experience[] = [];
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
        this.education = this.user.education;
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

  updateHeader(form: NgForm) {
    console.log(this.user);
    console.log(form.value.firstName);
    this.headerInfo= [
      {
        propFirstName: "firstName",
        value:
          !form.value.firstName === undefined
            ? this.user.firstName
            : form.value.firstName
      },
      {
        propFirstName: "lastName",
        value:
          !form.value.lastName === undefined
            ? form.value.lastName
            : this.user.lastName
      },
      {
        propCountry: "country",
        value:
          !form.value.country === undefined
            ? form.value.country
            : this.user.country
      },
      {
        propCity: "city",
        value: !form.value.city === undefined ? form.value.city : this.user.city
      },
      // {
      //   propFieldOfFocus: "fieldOfFocus",
      //   value:
      //     !form.value.fieldOfFocus === undefined
      //       ? form.value.firstName
      //       : this.user.fieldOfFocus
      // }
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
}
