import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedOrderComponent } from './declined-order.component';

describe('DeclinedOrderComponent', () => {
  let component: DeclinedOrderComponent;
  let fixture: ComponentFixture<DeclinedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclinedOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
