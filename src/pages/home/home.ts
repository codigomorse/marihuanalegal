import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement;
  map:any=null;
  geoInfo:any={
      resp:'',
      data:''
  };

  constructor(private geolocation: Geolocation,public navCtrl: NavController) {
  }
  ionViewDidLoad(){
    this.initMap();
    this.test();
  }
  initMap(){
          var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          scrollwheel: false,
          zoom: 8
           }); 
  }
  test(){
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
          console.log(data);
          this.geoInfo.data=JSON.stringify(data);
          // data can be a set of coordinates, or an error (if an error occurred).
          // data.coords.latitude
          // data.coords.longitude
      });

  }

}
