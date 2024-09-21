import { Component } from '@angular/core';
import { ShoppingItemsService } from '../services/shopping-items.service';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public shoppingList:ShoppingItemsService,
    private alertCtrl:AlertController,
    private menuCtrl:MenuController
  ) {}

  async removeItem(item:string){
    const alert = await this.alertCtrl.create({
      header:"Confirmación",
      message:"¿Estas seguro de borrar el item?",
      buttons:[
        {
          text:"Si",
          handler:()=>{
            this.shoppingList.removeItem(item);
          }
        },
        {
          text:"No",
          handler:()=>{
            alert.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  onRenderItem(event:any){
    console.log(event);

    const item = this.shoppingList.items.splice(event.detail.from,1)[0];

    this.shoppingList.items.splice(event.detail.to,0,item);

    event.detail.complete();
    console.log(this.shoppingList.items);
  }

  async removeAll(){

    const alert = await this.alertCtrl.create({
      header:"Confirmación",
      message:"¿Estas seguro de borrar todos los item?",
      buttons:[
        {
          text:"Si",
          handler:()=>{
            this.shoppingList.renmoveAllItems();
            this.menuCtrl.close();
          }
        },
        {
          text:"No",
          handler:()=>{
            alert.dismiss();
          }
        }
      ]
    });

    await alert.present();

  }

}
