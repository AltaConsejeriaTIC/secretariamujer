import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {AttentionRoute} from "../../entity/attention-route";
import {Http} from "@angular/http";
import {RouteInfo} from "../../entity/route-info";
import {InAppBrowser} from "ionic-native"
import {AlertCreator} from "../../providers/alert-creator";

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
  loading:Loading;

  constructor(public navCtrl: NavController, public navParams:NavParams, public http: Http, public alertCreator: AlertCreator, public loadingController: LoadingController) {
    this.location=this.navParams.get('location');
    this.attentionRoute=this.navParams.get('attentionRoute');
    this.loading=this.loadingController.create({
      content:"Espera un momento",
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    this.getRoutes();
  }

  getRoutes(){
    let RESTAddress=this.attentionRoute.RESTAddres+"/"+this.location;
    this.http.get('http://192.168.88.245:9000/'+RESTAddress+'?_format=json').map(res => res.json()).subscribe(response => {
      this.routesDetails=response;
      this.loading.dismiss();
      this.checkIfEmptyResponse();

      console.log("la respuesta", this.routesDetails);
    }, err => {
      this.loading.dismiss();
      this.alertCreator.showSimpleAlert("Error","Asegurate de tener conexión a internet, o intentalo más tarde");
      console.log("el error", err)
    });
  }

  checkIfEmptyResponse(){
    if(this.routesDetails.length==0){
      this.alertCreator.showSimpleAlert("Info","No hay rutas para mostrar");
    }
  }

  goBackPage(){
    this.navCtrl.pop();
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

  downloadFileListener(id:number){
    if(this.routesDetails[id].file==""){
      this.showNoFileAlert();
    }else{
      this.openBrowser(id);
    }
  }

  showNoFileAlert(){
    this.alertCreator.showSimpleAlert('Info','No hay archivos para descargar');
  }

  openBrowser(id:number){
    let url= "http://192.168.88.245:9000"+this.routesDetails[id].file;
    let browser= new InAppBrowser(url, "_system", "location=true");
  }

}
