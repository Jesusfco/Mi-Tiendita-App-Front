import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInventarioComponent } from './new-inventario.component';

describe('NewInventarioComponent', () => {
  let component: NewInventarioComponent;
  let fixture: ComponentFixture<NewInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
