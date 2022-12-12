import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirFotosComponent } from './subir-fotos.component';

describe('SubirFotosComponent', () => {
  let component: SubirFotosComponent;
  let fixture: ComponentFixture<SubirFotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirFotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
