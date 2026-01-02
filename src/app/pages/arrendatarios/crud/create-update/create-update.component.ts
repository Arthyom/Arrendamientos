import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionButton, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionBody, NgbAccordionCollapse } from '@ng-bootstrap/ng-bootstrap';

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

   formGroup :  FormGroup;

    formGroupG :  FormGroup;

    formGroupZ :  FormGroup;



   private _fb = inject(FormBuilder);


  constructor(  ) {

    this.formGroup = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellidoPaterno: new FormControl('', Validators.required),
      apellidoMaterno: new FormControl('', Validators.required),
      alias: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      municipio: new FormControl('', Validators.required),
      colonia: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [ Validators.email]),
    })

    this.formGroupZ = this._fb.group({
        basic:  this._fb.group({
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],

          }),

        second: this._fb.group({
            propiedad: ['', Validators.required],
          }),

        optional : this._fb.group({
            curp: ['', Validators.required],
          })
        // basic : this._fb.array([

        // ])
    });

    this.formGroupG = this._fb.group({
      items: this._fb.array([
        //  this._fb.control('', Validators.required),
        //  this._fb.control('', Validators.required)

        this._fb.group({
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],

          }),

          this._fb.group({
            propiedad: ['', Validators.required],
          }),

          this._fb.group({
            curp: ['', Validators.required],
          })


        // {
          // infoBasic: this._fb.group({
          //   nombre: ['', Validators.required],
          // }),
          // infoAdicional: this._fb.group({
          //   propiedad: ['', Validators.required],
          // }),
          // infoOpcional: this._fb.group({
          //   curpo: ['', Validators.required],
          // })
          // name: ['', Validators.required]


        // }
      ])
    });


  }

  get form(){
    return this.formGroup.controls;
  }

  get items(){
    return this.formGroupG.get('items') as FormArray;
  }

    get groupOfGroups(){
    return Object.keys( this.formGroupZ.controls );
  }

  getKeys( source:any,  ){
        return Object.keys( source.controls );

  }

  getGroup(key:string){
    return this.formGroupZ.get(key) as FormGroup;
  }

   getGroupArr(key:string){
    return this.formGroupZ.get(key) as FormArray;
  }

  formControlIsValid(controlName: string): string {
    const control = this.formGroup.get(controlName);
    return  control?.valid || !control?.touched ? '' : 'is-invalid';
  }
}
