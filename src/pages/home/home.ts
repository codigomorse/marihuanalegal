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
  latitude;
  longitude;
  constructor(private geolocation: Geolocation,public navCtrl: NavController) {
  }
  ionViewDidLoad(){
    
    this.test();
  }
  initMap(){
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: this.latitude, lng :this.longitude},
            zoom: 14
           }); 
        let myLatLng = new google.maps.LatLng(this.latitude,this.longitude);
        var marker = new google.maps.Marker({
          map: map,
          position: myLatLng,
          title: 'Hello World!'
        });
        var image = "https://cdn3.iconfinder.com/data/icons/map-markers-2-1/512/drugs-32.png";
        var marker = new google.maps.Marker({
          map: map,
          position: {lat: -34.9147836, lng :-56.1498222},
          icon: image,
          title: 'Farmacia Caceres'
        });
        

  }
          
  test(){
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
          console.log(data);
          console.log(data.coords.latitude);
          console.log(data.coords.longitude);
          this.latitude = data.coords.latitude;
          this.longitude = data.coords.longitude;
          this.initMap();
          // data can be a set of coordinates, or an error (if an error occurred).
          // data.coords.latitude
          // data.coords.longitude
      });

  }

}
