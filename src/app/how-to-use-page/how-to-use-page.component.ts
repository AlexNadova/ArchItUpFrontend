import { Component, OnInit } from '@angular/core';
import { FooterService } from '../footer/footer.service';

@Component({
  selector: 'app-how-to-use-page',
  templateUrl: './how-to-use-page.component.html',
  styleUrls: ['./how-to-use-page.component.css']
})
export class HowToUsePageComponent implements OnInit {

  constructor(
    private footer: FooterService,
  ) { }

  ngOnInit() {
    this.footer.hide();
  }

}
