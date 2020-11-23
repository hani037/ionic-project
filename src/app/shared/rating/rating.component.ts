import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ModalController, NavParams} from "@ionic/angular";
import {RaitingService} from "../service/rating.service";
import {UserService} from "../../service/user.service";
import {ReviewService} from "../service/review.service";
import {ClientReview} from "../../model/ClientReview";
import {data} from "@tensorflow/tfjs";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() product: Product;
  @Input() review: ClientReview;
  @Input() sailor: number;
  public rate =3;
  public comment='';
  constructor(public modalController: ModalController,
              public reviewService:ReviewService, public userService:UserService) { }

  ngOnInit() {
    if(this.review){
      this.comment = this.review.comment;
      this.rate = this.review.score;
    }
  }

  dismissModal() {
    this.modalController.dismiss(false);
  }

    submit(rating: number, value: string) {
    console.log(rating,value);
    let Client_Review ={
      client:this.userService.userConnected,
      comment: value,
      score:rating
    }
    this.reviewService.create_product_review(Client_Review,this.product.id).subscribe(data=>{
      console.log(data)
      this.modalController.dismiss(true);

    })

  }

  edit_review(rating: number, value: string) {
    console.log(rating,value);
    let Client_Review ={
      client:this.review.client,
      comment: value,
      score:rating,
      id:this.review.id
    }
    this.reviewService.put_product_review(Client_Review,this.review.id).subscribe(data=>{
      console.log(data)
      this.modalController.dismiss(true);

    })
  }

}
