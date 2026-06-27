import { Injectable } from '@angular/core';
import { Arrendatario } from '../../../models/Entities/arrendatario';
import { EnumTypeProperty } from '../../../models/Enums/EnumTypeProperty';
import { from, map, Observable, of, scheduled, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicioArrendatariosFiltros {

  private $filteredArrendatarios: Subject<Arrendatario[]> ;

  private toFilter: Arrendatario[] = [];

  filteredValues: Observable<Arrendatario[]>;

  /**
   *
   */
  constructor() {
    this.$filteredArrendatarios = new Subject();
    this.filteredValues = this.$filteredArrendatarios.asObservable();

  }

  setArrendatariosToFilter(arrendatarios: Arrendatario[]) {
    this.toFilter = arrendatarios;
    this.$filteredArrendatarios.next(this.toFilter);
  }

  filterByActives( ){
    this.$filteredArrendatarios.next( this.toFilter.filter( item => !item.deletedAt ));
  }

  filterByInActives(){
    const mapFunction = (arrendatarios: Arrendatario[]) => {
      return arrendatarios.filter( item =>{
        debugger
        if(item.interiores)
          if(item.interiores.length <= 0 )
          return item;
        return
      });
    };

      this.$filteredArrendatarios.next(mapFunction(this.toFilter))
  }

  filterByValidPropertyTypes( ){
    const mapFunction = (arrendatarios: Arrendatario[]) => {
      const filtered = arrendatarios.filter( item =>{
        if(item.interiores){
          if(item.interiores.length >0)
          if(item.interiores[0])
            return   item.interiores[0].typeProperty !== EnumTypeProperty.SinUso || !item.interiores[0].typeProperty;
        }
        return
      });
      debugger
    return filtered;
    };

      this.$filteredArrendatarios.next(mapFunction(this.toFilter))
  }

  filterByPropertyType( filterBy : EnumTypeProperty){
    const filtered = this.toFilter.filter( (item) =>{
      if(item.interiores){
        if(item.interiores.length > 0)
          if(item.interiores[0].typeProperty === filterBy)
            return item
      }
      return
    });

    this.$filteredArrendatarios.next(filtered);
  }

  filterByValidTypes(toFilter: Arrendatario[]): Arrendatario[]{
    return this.toFilter.filter( item => {
      if(item.interiores){
        return item.interiores[0].typeProperty !== EnumTypeProperty.SinUso;
      }
      return[]
    } );
  }

  filterByType(toFilter: Arrendatario[], filterBy: EnumTypeProperty): Arrendatario[]{
    return this.toFilter.filter( item => {
      if(item.interiores){
        return item.interiores[0].typeProperty === filterBy;
      }
      return[]
    } );
  }

}
