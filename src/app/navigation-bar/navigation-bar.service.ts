import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NavigationBarService {
  visible: boolean;

  constructor(visible = true) {}

  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
}
