import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  async search(img){
    console.log('aa');
    const model =await tf.loadGraphModel("https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_130_224/classification/3/default/1", { fromTFHub: true })
    const predictions = model.execute(img);
    console.log(predictions);
  }
  // preprocess the image to be mobilenet friendly
  public preprocessImage(image) {

    // resize the input image to mobilenet's target size of (224, 224)
    let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat();

    // if model is not available, send the tensor with expanded dimensions


    // if model is mobilenet, feature scale tensor image to range [-1, 1]
      let offset = tf.scalar(127.5);
      return tensor.sub(offset)
          .div(offset)
          .expandDims();

  }
}
