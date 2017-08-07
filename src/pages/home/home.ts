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
  latitude= -34.9011127;
  longitude= -56.16453139999999;
  constructor(private afDb: AngularFireDatabase,private geolocation: Geolocation,public navCtrl: NavController) {
  }
  ionViewDidLoad(){
    this.test();
  }
  refresh(){
    this.test();
  }   
  test(){
    //baja los datos
    this.afDb.list("/stock/").subscribe(_data => {
      this.dataArr = _data;
      console.log(_data);
    });
    //geolocaliza
    this.geolocation.getCurrentPosition().then((resp) => {
    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    //dibuja el mapa
    this.initMap();
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
    this.dataArr.forEach(element => {
      if(element.stock){
        var msg="hay stock";
        var image = "https://firebasestorage.googleapis.com/v0/b/marihuanalegal-38552.appspot.com/o/iconSi.png?alt=media&token=6a536f3e-c480-4ecc-b84c-70a53fdaa096";
      }else{
        var msg="no hay stock";
        var image = "https://firebasestorage.googleapis.com/v0/b/marihuanalegal-38552.appspot.com/o/iconNo.png?alt=media&token=cb7be038-6c3b-4230-b9ab-245189ec64d7";
      }
      let pos = {lat: element.latitud, lng: element.longitud};
      let options = {
          map: map,
          position: pos,
          icon: image,
          title: element.farmacia
      }
      let marker = new google.maps.Marker(options);
      //console.log(marker);
      let infoWindow = new google.maps.InfoWindow({
        content: '<h1>Farmacia '+element.farmacia+'</h1><p>Horario: '+element.horario+'</p><p>'+msg+'</p>'
      });
      marker.addListener("click", function(){
        infoWindow.close();
        infoWindow.open(map, marker);
      })
    }); 
  }   
}
