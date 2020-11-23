import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource } from '@capacitor/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../../model/user.model";
import {DomSanitizer} from "@angular/platform-browser";
import {ProductService} from "../../shared/service/product.service";
const { Camera, Filesystem, Storage } = Plugins;
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {LoadingController, Platform} from "@ionic/angular";
import {SearchService} from "../../shared/service/search.service";
import {SailorService} from "../../shared/service/sailor.service";

interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public add_image = new BehaviorSubject<boolean>(null);
  constructor( private loadingController: LoadingController,private productService: ProductService,private searchService: SearchService,private sailorService:SailorService) { }
  public async addNewToGallery(position: number, id: number) {
    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });
    //console.log(image.dataUrl);
    //const blob = this.dataURItoBlob(image.dataUrl);
    //console.log(blob);
    //const file = new File([blob], 'untitled', { type: 'image/jpeg' });
    this.uploadimage(image.dataUrl,position,id);
  }
  public dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});


  }
  public async uploadimage(file: string,position,id){
    this.productService.uploadImage(id, file,position).subscribe(data=>{
      this.add_image.next(true)
    });

  }

  public async uploadimage_sailor(file: string){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(async () => {

      this.sailorService.uploadImage(file);
    });

  }
  async addNewToGallery_sailor() {
    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.uploadimage_sailor(image.dataUrl);
  }
}
