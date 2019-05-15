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
    { propFieldOfFocus: "fieldOfFocus"; value: [] }
  ];
  contactInfo: [
    { propPhone: "phone"; value: "" },
    { propEmail: "email"; value: "" }
  ];
  eduObj: {
    school: "";
    specialization: "";
    yearStart: null;
    yearEnd: null;
  };
  educationInfo: [
    {
      propEducation: "education";
      value: [
        // {
      //   school: "";
      //   specialization: "";
      //   yearStart: null;
      //   yearEnd: null;
      // }
      ];
    }
  ];
  experienceInfo: [{ propWorkExperience: "workExperience"; value: [] }];

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
        this.education = this.user.education;
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
          form.value.firstName === undefined
            ? this.user.firstName
            : form.value.firstName
      },
      {
        propLastName: "lastName",
        value:
          form.value.lastName === undefined
            ? this.user.lastName
            : form.value.lastName
      },
      {
        propCountry: "country",
        value:
          form.value.country === undefined
            ? this.user.country
            : form.value.country
      },
      {
        propCity: "city",
        value: form.value.city === undefined ? this.user.city : form.value.city
      },
      {
        propFieldOfFocus: "fieldOfFocus",
        value:
          form.value.fieldOfFocus === undefined
            ? this.fields
            : form.value.fieldOfFocus
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
        value: form.value.phone
      },
      {
        propEmail: "email",
        value: form.value.email
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
    console.log(this.educationInfo);
    this.educationInfo = [
      {
        propEducation: "education",
        value:
          form.value.education === undefined
            ? this.user.education
            : form.value.education
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
    console.log(this.experience);
    this.experienceInfo = [
      {
        propWorkExperience: "workExperience",
        value:
          form.value.experience === undefined
            ? this.user.workExperience
            : form.value.experience
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
