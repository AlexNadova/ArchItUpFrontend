import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NavigationBarService {
  visible: boolean;

  constructor() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}
