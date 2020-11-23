import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  noImage = 'assets/img/no-image.jpg';

  @Input() product: Product;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
