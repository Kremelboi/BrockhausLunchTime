import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingTourCard } from './shopping-tour-card';

describe('ShoppingTourCard', () => {
  let component: ShoppingTourCard;
  let fixture: ComponentFixture<ShoppingTourCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingTourCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingTourCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
