import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {sailor} from "../../model/sailor";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sailor',
  templateUrl: './sailor.component.html',
  styleUrls: ['./sailor.component.scss'],
})
export class SailorComponent implements OnInit {
  noImage = 'assets/img/no-image.jpg';
  @Input() sailor: sailor;
  constructor(private router:Router) { }

  ngOnInit() {}
  horaire() {
    this.router.navigate(['client/horaire/'+'402894837420cf1f01742f1fb4040006'])
  }
}
