import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {AttentionRoute} from "../../entity/attention-route";
import {Http} from "@angular/http";
import {RouteInfo} from "../../entity/route-info";
import {InAppBrowser} from "ionic-native"
import {AlertCreator} from "../../providers/alert-creator";
import {ApplicationConfig} from "../../config";
import {OfflineService} from "../../providers/offline-service";
import {MapPage} from "../map/map";

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

  constructor(public navCtrl: NavController, public navParams:NavParams, public http: Http, public alertCreator: AlertCreator, public loadingController: LoadingController, public offlineService:OfflineService) {
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
    let url=ApplicationConfig.getURL('/'+RESTAddress+'?_format=json');
    this.http.get(url).map(res => res.json()).subscribe(response => {
      this.setRoutes(response);
      console.log("la respuesta", this.routesDetails);
    }, err => {
      this.alertCreator.showSimpleAlert("Info","Asegurate de tener conexión a internet, para obtener las rutas más recientes");
      this.getOfflineRoutes(this.attentionRoute.RESTAddres);
      console.log("el error", err)
    });
  }

  setRoutes(data){
    this.routesDetails=data;
    this.loading.dismiss();
    this.checkIfEmptyResponse();
  }

  getOfflineRoutes(RESTAddress){
    let offlineRoutesFile:string =this.getOfflineRoutesFile(RESTAddress);
    this.offlineService.readAsText(offlineRoutesFile).then((data)=>{
      let selectedLocationRoutes=this.getSelectedLocationOfflineRoutes(JSON.parse(data.toString()));
      this.setRoutes(selectedLocationRoutes);
    });
  }

  getOfflineRoutesFile(RESTAddress){
    switch(RESTAddress){
      case 'info_routes_rest':
        return 'infoRoutes.txt';
      case 'health_routes_rest':
        return 'healthRoutes.txt';
      case 'justice_routes_rest':
        return 'justiceRoutes.txt';
      case 'protection_measures_routes_rest':
        return 'protectionRoutes.txt';
    }
  }

  getSelectedLocationOfflineRoutes(data){
    let selectedLocationRoutes=[];
    for(let i=0; i<data.length; i++){
      if(data[i].location==this.location){
        selectedLocationRoutes.push(data[i]);
      }
    }
    return selectedLocationRoutes;
  }

  checkIfEmptyResponse(){
    if(this.routesDetails.length==0){
      this.alertCreator.showSimpleAlert("Info","No hay rutas para mostrar");
    }
  }

  goToMap(id) {
    let place = this.routesDetails[id];
    place.category = this.attentionRoute.RESTAddres.replace("_routes_rest", "");
    if (this.existCoordinateSite(place.latitude, place.longitude)) {
      this.navCtrl.push(MapPage, {
        titlePage: "Test / Tips y Rutas",
        localityServer: "",
        localityLabel: "",
        localityCenter: {
          "name": this.routesDetails[id].location,
          "zoom": 15,
          "lat": this.routesDetails[id].latitude,
          "lng": this.routesDetails[id].longitude
        },
        localityBoundaries: [],
        place: place
      });
    } else {
      this.alertCreator.showSimpleAlert("Info","No hay información disponible para mostrar en el mapa");
    }
  }

  existCoordinateSite(latitude, longitude) {
    return latitude != null && latitude.length > 0 && longitude != null && longitude.length > 0;
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
    let url=ApplicationConfig.getURL(this.routesDetails[id].file);
    let browser= new InAppBrowser(url, "_system", "location=true");
  }

}
