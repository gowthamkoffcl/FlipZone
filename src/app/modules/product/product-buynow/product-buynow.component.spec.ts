import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBuynowComponent } from './product-buynow.component';

describe('ProductBuynowComponent', () => {
  let component: ProductBuynowComponent;
  let fixture: ComponentFixture<ProductBuynowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBuynowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBuynowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
