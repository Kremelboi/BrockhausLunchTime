import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingTourFormDialog } from './shopping-tour-form-dialog';

describe('ShoppingTourFormDialog', () => {
  let component: ShoppingTourFormDialog;
  let fixture: ComponentFixture<ShoppingTourFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingTourFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingTourFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
