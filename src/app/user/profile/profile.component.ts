import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";
import { Observable } from "rxjs"; //to hold data returned from API
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user$: Object;
  constructor(private data: DataService, private route: ActivatedRoute) {
    //get id param from url
    this.route.params.subscribe(params => (this.user$ = params.id)); //named in app-routing.module.ts in route: path: 'profile/:id',
  }

  ngOnInit() {
    this.data.getUser(this.user$).subscribe(data => (this.user$ = data));
  }
}
