import { Component } from '@angular/core';
import { ShoppingItemsService } from '../services/shopping-items.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public item:string = "";

  constructor(
    private shoppingItemServices:ShoppingItemsService,
    private alertCtrl:AlertController
  ) {}

  addItem(){

    if(!this.shoppingItemServices.existsItem(this.item)){
      this.shoppingItemServices.addItem(this.item);
      this.item = "";
      console.log(this.shoppingItemServices.items);
      this.alertSuccess();
    }else{
     this.alertError();
    }
  }

  async alertSuccess(){
    const alert = await this.alertCtrl.create({
        header:"Éxito",
        message:"Item añadido.",
        buttons:["Ok"]
    });
    await alert.present();
  }

  async alertError(){
    const alert = await this.alertCtrl.create({
        header:"Error",
        message:"El item ya existe",
        buttons:["Ok"]
    });
    await alert.present();
  }


}
