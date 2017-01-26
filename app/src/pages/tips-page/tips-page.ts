import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tips-page',
  templateUrl: './tips-page.html'
})
export class TipsPage {

  tipsClass:string = "";
  tipsArrayByCategory: any[];
  categoryTitle:string = "";

  constructor(public navController: NavController, public navParams: NavParams) {
    this.tipsArrayByCategory = [
      {
        title: "Claves para prevenir el acoso",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisl augue, maximus at ligula quis, fringilla suscipit metus. Nunc porttitor feugiat risus, quis dapibus dolor cursus eget.',
      },
      {
        title: "Como sobrellevar una perdida",
        description: 'In euismod vestibulum nisi, sit amet cursus urna efficitur eu. Donec sollicitudin posuere vulputate. Cras consequat mauris vitae magna euismod, eu venenatis tortor molestie. Maecenas gravida posuere convallis. Suspendisse lacinia accumsan ligula eu maximus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer non libero sit amet elit ornare congue.',
      },
      {
        title: "Que hacer en caso de un ataque verbal",
        description: 'Pellentesque aliquam nunc at dolor dapibus, tempor commodo neque laoreet. Nullam dignissim ullamcorper leo nec rutrum. Cras vel viverra orci.',
      },
      {
        title: "Claves para prevenir el acoso",
        description: 'Nullam iaculis a enim feugiat tempor. Aliquam maximus molestie mauris. Pellentesque eu egestas nisi. Cras hendrerit mattis lectus nec tempor. Ut dui eros, finibus quis massa in, tempor sodales nulla. Ut nec augue vel nunc consectetur maximus. Ut eget scelerisque magna, eget hendrerit elit.',
      },
      {
        title: "Como sobrellevar una perdida",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisl augue, maximus at ligula quis, fringilla suscipit metus. Nunc porttitor feugiat risus, quis dapibus dolor cursus eget.',
      }
    ];
  }

  ionViewDidLoad() {
    this.tipsClass = "economic-violence-style";
    this.categoryTitle = "Violencia Económica";
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

}
