import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessProductComponent } from './less-product.component';

describe('LessProductComponent', () => {
  let component: LessProductComponent;
  let fixture: ComponentFixture<LessProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
