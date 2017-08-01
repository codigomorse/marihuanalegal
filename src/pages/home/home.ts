import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase  } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement;
  map:any=null;
  dataArr=[];
  latitude;
  longitude;
  constructor(private afDb: AngularFireDatabase,private geolocation: Geolocation,public navCtrl: NavController) {
  }
  ionViewDidLoad(){
    this.test();
  }   
  test(){
    //baja los datos
    this.afDb.list("/stock/").subscribe(_data => {
      this.dataArr = _data;
      //console.log(this.dataArr);
    });
    //geolocaliza
    this.geolocation.getCurrentPosition().then((resp) => {
    //console.log(resp.coords.latitude);
    //console.log(resp.coords.longitude);
    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;
    //dibuja el mapa
    this.initMap();
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }
  initMap(){
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.latitude, lng :this.longitude},
      zoom: 14
    }); 
    var image = "https://cdn3.iconfinder.com/data/icons/map-markers-2-1/512/drugs-32.png";
    let myLatLng = new google.maps.LatLng(this.latitude,this.longitude);
    var marker = new google.maps.Marker({
      map: map,
      position: myLatLng,
      title: 'Hello World!'
    });
    this.dataArr.forEach(element => {
      //console.log(element.farmacia);
      let pos = {lat: element.latitud, lng: element.longitud};
      //console.log(pos);
      let options = {
          map: map,
          position: pos,
          icon: image,
          title: element.farmacia
      }
      //console.log(options);
      let marker = new google.maps.Marker(options);
      console.log(marker);
      let infoWindow = new google.maps.InfoWindow({
        content: '<h1>'+element.farmacia+'</h1><p>'+element.horario+'</p><p>'+element.stock+'</p>'
      });
      marker.addListener("click", function(){
        infoWindow.open(map, marker);
      })
    }); 
  }   
}
