import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { User, Education, Experience } from "src/app/models/user";
import { FooterService } from "src/app/footer/footer.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: User;
  currentUser;
  education: Education[];
  experience: Experience[];
  constructor(
    private userService: UserService,
    private footer: FooterService
  ) {}

  getUserProfile() {
    this.userService.getUser().subscribe((data: User) => {
      this.user = { ...data };
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
  }

  ngOnInit() {
    this.footer.hide();
    this.getUserProfile();
  }
}
