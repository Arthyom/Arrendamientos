import { Component, effect, ElementRef, inject, input, OnInit, viewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent  {

  private modalService = inject(NgbModal);
  private modalRef? : NgbModalRef


    private contentIntiniteLoader  = viewChild<ElementRef<any>>('contentModalContainer')
    showModal = input(false)

    hiddeModal = effect( ()=>{
      if(!this.showModal())
           this.modalRef?.close()
    });

    oppendOrShow = effect( ()=>{
      if(this.showModal())
        this._showRun();
    });

    private _showRun = () =>{
      this.modalRef= this.modalService
      .open( this.contentIntiniteLoader(), {  backdrop: 'static', centered: true });
    }


  constructor() {
  }


}
