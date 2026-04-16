import { Component, input, OnInit, output, signal } from '@angular/core';
import { ServiceArrDataRequester } from '../../../../shared/services/service-arr-data-requester';
import { Arrendatario } from '../../../../models/Entities/arrendatario';
import { firstValueFrom } from 'rxjs';
import { InfiniteLoaderService } from '../../../../../shared/services/infinite-loader-service';
import { IonIcon } from "@ionic/angular/standalone";
import { Interior } from '../../../../models/Entities/interior';
import { environment } from '../../../../../environments/environment.development';

@Component({
  standalone: true,
  selector: 'app-arrendatario-select',
  templateUrl: './app-arrendatario-select.component.html',
  styleUrls: ['./app-arrendatario-select.component.scss'],
  imports: [IonIcon],
})
export class AppArrendatarioSelectComponent  implements OnInit {

  arrendatarios  : Arrendatario[] = [];
  interior = input<Interior | undefined>();
  controlClose = output<boolean>();
  selectedArrendatario = signal<Arrendatario | undefined>(undefined);
  constructor(
    public _inf: InfiniteLoaderService,
    private _serviceArrDataRequester: ServiceArrDataRequester
  ) { }

  async ngOnInit() {
    this._inf.showLoader.set(true);
    this.arrendatarios = await firstValueFrom(await this._serviceArrDataRequester.getAll<Arrendatario>('Arrendatarios'));
    this._inf.showLoader.set(false);
  }

  onChange($event: any) {
    const id = $event.target.value;
    const selected = this.arrendatarios.find(x => x.id == id);
    this.selectedArrendatario.set(selected);
  }

  async ok(){
    this.interior()!.arrendatario = this.selectedArrendatario();
    this.interior()!.propiedad!.interiores = undefined;
    this.interior()!.typeProperty = Number( this.interior()!.typeProperty );
    debugger
    this._inf.showLoader.set(true);
    const response = await firstValueFrom(
      await this._serviceArrDataRequester._httpCliente.request<Interior>(
        'patch',
        environment.backEndBaseUrl + '/Interiores/' + this.interior()!.id,
        {body: this.interior()!}
      )
    );
    this._inf.showLoader.set(false);

    if(response){
      this.controlClose.emit(false);
    }
  }


}
