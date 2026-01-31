import { JsonPipe, CommonModule, Location } from '@angular/common';
import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  NgbAccordionButton,
  NgbAccordionDirective,
  NgbAccordionItem,
  NgbAccordionHeader,
  NgbAccordionToggle,
  NgbAccordionBody,
  NgbAccordionCollapse,
  NgbScrollSpy,
} from '@ng-bootstrap/ng-bootstrap';
import { ICommonCustomForm } from '../../models/Interfaces/ICommonFormCustom';
import { ActivatedRoute, Router } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { CustomInputComponent } from '../../../shared/custom-input/custom-input.component';
import { EnumCommonFormControllType } from '../../models/Interfaces/ECommonFormControllType';
import { Arrendatario } from '../../models/Entities/arrendatario';
import { MapperFormValues } from '../../models/Mappers/MapperFormValues';
import { InfiniteLoaderService } from '../../../shared/services/infinite-loader-service';
import { ServiceArrDataRequester } from '../services/service-arr-data-requester';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
  standalone: true,
  imports: [
    NgbScrollSpy,
    NgbAccordionButton,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionToggle,
    NgbAccordionBody,
    NgbAccordionCollapse,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonIcon,
    CustomInputComponent,
  ],
})
export class CustomFormComponent implements OnInit {
  t = EnumCommonFormControllType;
  inputSchema = input.required<ICommonCustomForm>();
  url = input.required<string>();
  outputSchema = output<any>();
  private _fb = inject(FormBuilder);
  private _formTemplate: any = {};
  private _inf = inject(InfiniteLoaderService);
  location = inject(Location);
  generalFormGroup: FormGroup;
  private _service = inject(ServiceArrDataRequester);
  private _router = inject(ActivatedRoute);

  constructor() {
    this.generalFormGroup = this._fb.group({});
  }

  ngOnInit() {
    const sortedObject = Object.fromEntries(
      Object.entries(this.inputSchema().groups).sort(([keyA,vA], [keyB,vB]) =>

        // (vA?.order || 0) > (vB?.order ||0)
        (vA?.order || 0) > (vB?.order ||0) ? -1 : 1

      ),
    );

    for (const groupItemKey in sortedObject) {
      const controll = this.inputSchema().groups[groupItemKey].controlls;
      const controllObject: any = {};
      for (const controlKey in controll)
        controllObject[controlKey] = controll[controlKey].control;

      this._formTemplate[groupItemKey] = this._fb.group(controllObject);
    }

    this.generalFormGroup = this._fb.group(this._formTemplate);
  }

  currentFormControlIsValid(section: string, field: any) {
    const control = this.generalFormGroup.controls[section].get(field);
    return control?.valid || !control?.touched ? '' : 'is-invalid';
  }

  async submitForm() {
    try {
      const mapped = MapperFormValues.fromObject<Arrendatario>(
        this.generalFormGroup.value,
      );
      this._inf.showLoader.set(true);
      const s = await firstValueFrom(
        await this._service.put<Arrendatario>(this.url(), mapped),
      );
    } catch (error) {
    } finally {
      this._inf.showLoader.set(false);
      this.location.back();
    }
  }
}
