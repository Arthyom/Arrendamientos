import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionButton, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionBody, NgbAccordionCollapse } from '@ng-bootstrap/ng-bootstrap';
import { ICommonCustomForm } from '../../../../models/Interfaces/ICommonFormCustom';
import { ICommonFormGroup } from '../../../../models/Interfaces/ICommonFormGroup';

@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [
    NgbAccordionButton,
		NgbAccordionDirective,
		NgbAccordionItem,
		NgbAccordionHeader,
		NgbAccordionToggle,
		NgbAccordionBody,
		NgbAccordionCollapse,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    CommonModule
  ],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss'
})
export class CreateUpdateComponent {


    formGroupZ :  FormGroup;



   private _fb = inject(FormBuilder);

   s: ICommonCustomForm = {
    groups:{

      infoBase:{
        label:'Info. Basica',
        controlls: {
          nombre:{ type:"text", label: "Nombre", control: new FormControl() },
          apellidoPaterno: {type:'number', label:'Apellido Paterno', control: new FormControl()},
          apellidoMaterno: {type:'text', label:'Apellido Materno', control: new FormControl()},
          direccion:{type:'text', label:'Direccion', control: new FormControl()},
          municipio:{type:'text', label:'Municipio', control: new FormControl()},
          colonia:{type:'text', label:'Colonia', control: new FormControl()},
          cp:{type:'text', label:'Codigo Postal', control: new FormControl()},
          telefono:{type:'phone', label:'Telefono ', control: new FormControl()},
        }
      },

      infoAdicional:{
        label:'Info. Adicional',
        controlls:{
          alias: {type:'text', label:'Alias', control: new FormControl()},
          propiedadId: {type:'select', label:'Propiedad', control: new FormControl()},

        }
      },

      infoOpcional:{
        label:'Info. Opcional',
        controlls:{
          email: {type:'text', label:'Email', control: new FormControl()},
          curp: {type:'text', label:'CURP', control: new FormControl()},
          rfc: {type:'text', label:'RFC', control: new FormControl()}
        }
      }
    }
   }


  constructor(  ) {

    this.formGroupZ = this._fb.group({
        basic:  this._fb.group({
            nombre: [, Validators.required],
            apellido: ['', Validators.required],

          }),

        second: this._fb.group({
            propiedad: ['', Validators.required],
          }),

        optional : this._fb.group({
            curp: ['', Validators.required],
          })

    });



  }

  getValue(input: any){
    return input as string;
  }


    get groupOfGroups(){
    return Object.keys( this.formGroupZ.controls );
  }

  getKeys( source:any,  ){
        return Object.keys( source.controls );
  }



  getValues( source: FormGroup ){
      return source.controls
  }

  getGroup(key:string){
    return this.formGroupZ.get(key) as FormGroup;
  }

   getGroupArr(key:string){
    return this.formGroupZ.get(key) as FormArray;
  }

  currentFormControlIsValid( section: string, field: any){
    const control = this.formGroupZ.controls[section].get(field);
    return  control?.valid || !control?.touched ? '' : 'is-invalid';
  }
}
