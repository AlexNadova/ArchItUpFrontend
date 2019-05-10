import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { FullUser, User } from "src/app/models/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: FullUser;

  constructor(
    private userService: UserService,
  ) {}

  getUserProfile() {
    this.userService.getUser().subscribe((data:FullUser)=> {
      this.user = {...data};
    }); 
  }

  ngOnInit() {
    this.getUserProfile();
  }
}
