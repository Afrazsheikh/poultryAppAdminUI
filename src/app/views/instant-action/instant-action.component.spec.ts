import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantActionComponent } from './instant-action.component';

describe('InstantActionComponent', () => {
  let component: InstantActionComponent;
  let fixture: ComponentFixture<InstantActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstantActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
