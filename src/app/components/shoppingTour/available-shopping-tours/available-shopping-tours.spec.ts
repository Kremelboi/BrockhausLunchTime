import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableShoppingTours } from './available-shopping-tours';

describe('AvailableShoppingTours', () => {
  let component: AvailableShoppingTours;
  let fixture: ComponentFixture<AvailableShoppingTours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableShoppingTours]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableShoppingTours);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
