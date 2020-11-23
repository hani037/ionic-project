import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {


  @Input() score : number;
  @Input() numberClientReview : number;
  @Input() has_numberClientReview : boolean=true;
  starPercentageRounded;
  constructor() { }

  ngOnInit() {
      const starPercentage = (this.score / 5) * 100;
      this.starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
      //document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

  }
  public stars1(){
    return  Array(Math.round(this.score)).fill(0).map((x,i)=>i)
  }
  public starsWhite1(){
    return Array(Math.round(5 - this.score)).fill(0).map((x,i)=>i)
  }
}
