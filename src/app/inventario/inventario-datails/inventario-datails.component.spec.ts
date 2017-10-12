import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioDatailsComponent } from './inventario-datails.component';

describe('InventarioDatailsComponent', () => {
  let component: InventarioDatailsComponent;
  let fixture: ComponentFixture<InventarioDatailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioDatailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
