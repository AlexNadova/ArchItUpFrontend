import { Injector } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { User, Education, Experience } from "src/app/models/user";
import { FooterService } from "src/app/footer/footer.service";
import { NotifierService } from "angular-notifier";

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
}
