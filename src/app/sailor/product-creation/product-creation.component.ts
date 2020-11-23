import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PhotoService} from "../services/photo.service";
import {ProductService} from "../../shared/service/product.service";
import {Product} from "../../model/product";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingController, Platform} from "@ionic/angular";
import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss'],
})
export class ProductCreationComponent implements OnInit,OnDestroy {
  public product = new Product();
  id : number;
  position=0;
  public loading = false;

  constructor(private router:Router,private photoService:PhotoService,private route: ActivatedRoute, private productService: ProductService,
              private loadingController: LoadingController, private androidPermissions: AndroidPermissions, private platform: Platform) {
  }

  async ngOnInit() {
    if (this.platform.is('cordova')) {
      await this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

      await this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
      ])
    }
    this.presentLoading();
    this.photoService.add_image.subscribe(data=>{
      if(data==true){
        console.log('aa');
        this.productService.getProduct(this.id).subscribe(async p => {
          this.product = p;
          const modal = await this.loadingController.getTop();
          if(modal){
            modal.dismiss();
          }
          //this.photoService.add_image.next(false);
        })
      }

    })
  }

  async addPhotoToGallery() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present().then(() => {
    });
    console.log(this.id);
    await this.photoService.addNewToGallery(this.position,this.id);
    this.position++;
  }

  async ajouter_produit(f: NgForm) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present().then(() => {
    });
    let img;
    if (!this.id){
      img = ['','','','','',' '];
    }else {
      img = this.product.images;
    }
    const newProduct = {
      id:this.product.id,
      name : f.value.name,
      description: f.value.description,
      stock: f.value.Stock,
      price: f.value.Price,
      images: img
    };
    this.productService.createUpdateProduct(newProduct).toPromise().then(async p => {
      this.product=p;
      this.id= +p.id;
      const modal = await this.loadingController.getTop();
      if(modal){
        modal.dismiss();
      }
    }).catch(error=> {
      if(error.status == 504){
        this.router.navigate(['404'])
      }
    }); ;
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present().then(() => {

      this.route.params.subscribe(params => {
        this.id = +params['id'];
      });
      if(this.id) {
        this.productService.getProduct(this.id).toPromise().then(p => {
          this.product = p;
          console.log(p);
          loading.dismiss();
          this.loading = true;
          for (let i=0;i<p.images.length;i++){
            if(p.images[i]==''||p.images[i]==' '){
              this.position=i;
              break;
            }
          }
        }).catch(error=> {
          if(error.status == 504){
            this.router.navigate(['404'])
          }
        }); ;
      }else {
        this.loading = true;
        loading.dismiss();

      }

    });

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async modifier_image(position: number) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present().then(() => {
    });
    await this.photoService.addNewToGallery(position,this.id);
  }
  async ngOnDestroy(){
    const modal = await this.loadingController.getTop();
    if(modal){
      modal.dismiss();
    }
  }

  async delete_image(position: number) {
  }
}
