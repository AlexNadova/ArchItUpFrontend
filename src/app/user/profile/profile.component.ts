import { Injector } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { User, Education, Experience } from "src/app/models/user";
import { FooterService } from "src/app/footer/footer.service";
import { NotifierService } from 'angular-notifier';

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
    //password: "",
    phone: "",
    country: "",
    city: "",
    //permissionLevel: { type: Number, default: config.permissionLevels.REG_USER },
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
    this.userService.getUser().subscribe((data: User) => {
      this.user = { ...data };
      console.log(this.user);
      this.education = this.user.education;
      this.experience = this.user.workExperience.sort(function(obj1, obj2) {
        return obj2.yearEnd - obj1.yearEnd;
      });
    });
    this.notifier.notify( 'success', 'You are awesome! I mean it!' );
  }

  deleteUser() {
    this.userService.deleteUser().subscribe(err => {
      if (err) console.log(err);
      console.log("Success");
    });
    this.userService.logout();
    this.router.navigate(["login"]);
  }

  ngOnInit() {
    this.footer.hide();
    this.getUserProfile();
  }
}
