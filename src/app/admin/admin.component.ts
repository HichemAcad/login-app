import { SlidesService } from './../services/slides.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  slides: any;

  constructor(private slidesService: SlidesService) { }

  ngOnInit() {
    this.slidesService.getSlides().subscribe(response => {
      if (response) {
        this.slides = response;
      } else {
        this.slides = [];
      }
    });
  }

}
