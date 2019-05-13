import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { User, Education, Experience } from "src/app/models/user";
import { FooterService } from "src/app/footer/footer.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: User={
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
     education: []=[],
     workExperience: []=[]
  };
  currentUser;
  education: Education[]=[];
  experience: Experience[]=[];
  constructor(
    private userService: UserService,
    private footer: FooterService,
    private router: Router
  ) {}

  getUserProfile() {
    this.userService.getUser().subscribe((data: User) => {
      this.user = { ...data };
      console.log(this.user);
      this.education = this.user.education;
      this.experience = this.user.workExperience.sort(function(obj1, obj2) {
        return obj2.yearEnd - obj1.yearEnd;
      });
    });
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
