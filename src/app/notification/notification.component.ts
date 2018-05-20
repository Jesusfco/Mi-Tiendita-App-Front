import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public showNotifications: boolean = false;
  public notifications = [];
  
  public interval: any;

  constructor() {

    this.interval = setInterval(() => this.checkStorage(), 1000);

   }

  ngOnInit() {
  }

  checkStorage(){

    let request = localStorage.getItem('request');
    if(request == undefined) return;

    let message = {
      title: null,
      description: null,
      type: 1
    };

    let x = JSON.parse(request);


    if(x.status < 250 && x.status >= 200){

        if(x.title != undefined){

          message.title = x.title;
          message.description = x.description;
          message.type = 1;

        }

        else {

          message.title = "¡Exito!";
          message.description = "Datos cargados correctamente";
          message.type = 1;

        }


    }

    else {

      console.log(x);

      if(x.status == 0){
        message.title = "Error de Conexión";
        message.description = "No se ha establecido conexion al servidor";
        message.type = 2;
      }

      else {

        message.title = "Error: " + x.status;
        message.description = x.statusText;
        message.type = 2;

      }

    }

    setTimeout(() => {


      setTimeout(() => {
        if(this.notifications.length > 0) 
        this.notifications.splice(0, 1);
      }, 700);

      document.getElementById('not').classList.add('translate');

    }, 10000);

    this.notifications.push(message);

    setTimeout(() => {

      let element = document.getElementById('not');
      element.classList.remove('translate');

    }, 10);
    
    localStorage.removeItem('request');

  }

  close(){
    document.getElementById('not').classList.add('translate');

    setTimeout(() => {
    
      this.notifications.splice(0, 1);
    }, 700);
    
  }


}
