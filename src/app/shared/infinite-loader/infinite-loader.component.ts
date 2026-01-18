import { Component, ElementRef, inject, OnInit, TemplateRef, viewChild, signal, AfterViewInit, input, effect } from '@angular/core';
import { ValueChangeEvent } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-infinite-loader',
  templateUrl: './infinite-loader.component.html',
  styleUrls: ['./infinite-loader.component.scss'],
})
export class InfiniteLoaderComponent  {

  	private modalService = inject(NgbModal);
    private modalRef? : NgbModalRef

    private contentIntiniteLoader  = viewChild<ElementRef<any>>('contentIntiniteLoader')
    showModal = input(false)

    hiddeModal = effect( ()=>{
      if(!this.showModal())
        this.modalRef?.close()
    });

    oppendOrShow = effect( ()=>{
      if(this.showModal()){
        this._showRun();
      }
    });

    private _showRun = () =>{
      this.modalRef = this.modalService.
      open( this.contentIntiniteLoader(), {  backdrop: 'static', centered: true });
    }


  constructor() {
  }








}
