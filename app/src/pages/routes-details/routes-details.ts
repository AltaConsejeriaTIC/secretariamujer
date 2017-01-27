import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AttentionRoute} from "../../entity/attention-route";
import {Http} from "@angular/http";
import {RouteInfo} from "../../entity/route-info";

@Component({
  selector: 'page-routes-details',
  templateUrl: './routes-details.html'
})
export class RoutesDetailsPage {

  location:string;
  attentionRoute:AttentionRoute;
  subheaderBackgroundColor:string[]=['background-subheader-option-0','background-subheader-option-1','background-subheader-option-2','background-subheader-option-3'];
  nameColor:string[]=['color-0','color-1','color-2','color-3'];
  routesDetails:RouteInfo[];

  constructor(public navCtrl: NavController, public navParams:NavParams, public http: Http) {
    this.location=this.navParams.get('location');
    this.attentionRoute=this.navParams.get('attentionRoute');
  }

  ionViewDidLoad() {
    this.getRoutes();
  }

  getRoutes(){
    let RESTAddress=this.attentionRoute.RESTAddres+"/"+this.location;
    this.http.get('http://192.168.88.147:9000/'+RESTAddress+'?_format=json').map(res => res.json()).subscribe(response => {
      this.routesDetails=response;
      console.log("la respuesta", this.routesDetails);
    }, err => {
      console.log("el error", err)
    });
  }

  goBackPage(){
    this.navCtrl.pop();
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }
  downloadFile(){

  }

}
