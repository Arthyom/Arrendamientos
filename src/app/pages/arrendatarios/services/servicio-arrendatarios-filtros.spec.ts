import { TestBed } from '@angular/core/testing';

import { ServicioArrendatariosFiltros } from './servicio-arrendatarios-filtros';

describe('ServicioArrendatariosFiltros', () => {
  let service: ServicioArrendatariosFiltros;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioArrendatariosFiltros);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
