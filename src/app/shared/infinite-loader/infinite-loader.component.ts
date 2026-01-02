import { Component, ElementRef, inject, OnInit, TemplateRef, viewChild, signal, AfterViewInit, input, effect } from '@angular/core';
import { ValueChangeEvent } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-infinite-loader',
  templateUrl: './infinite-loader.component.html',
  styleUrls: ['./infinite-loader.component.scss'],
})
export class InfiniteLoaderComponent  implements  OnInit{

  	private modalService = inject(NgbModal);
    private contentIntiniteLoader  = viewChild<ElementRef<any>>('contentIntiniteLoader')
    showModal = input(true)

    hiddeModal = effect( ()=>{
      if(!this.showModal())
            this.modalService.dismissAll();
    });

    oppendOrShow = effect( ()=>{
      if(this.showModal())
        this._showRun();
    });

    private _showRun = () =>{
      this.modalService.open( this.contentIntiniteLoader(), {  backdrop: 'static', centered: true });
    }


  constructor() {
  }

  ngOnInit(): void {
    this._showRun();
  }







}
