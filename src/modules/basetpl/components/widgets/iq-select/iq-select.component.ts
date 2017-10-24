import { Component} from '@angular/core';
import { flyIn } from 'animations/fly-in';
import { environment } from 'environments/environment';

@Component({
  templateUrl: './iq-select.component.html',
  animations: [
    flyIn
  ]
})

export class IqSelectDemoComponent {

  bindData: string;
  
  optionApi: string = environment.server + 'classes/Work';

  constructor(){}

  dealData(data){
    console.log(data);
    return data.results.map(item=>[item.objectId, item.name]);
  }

}
