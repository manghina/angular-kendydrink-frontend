import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeShippingNavComponent } from './free-shipping-nav.component';

describe('FreeShippingNavComponent', () => {
  let component: FreeShippingNavComponent;
  let fixture: ComponentFixture<FreeShippingNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeShippingNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeShippingNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
