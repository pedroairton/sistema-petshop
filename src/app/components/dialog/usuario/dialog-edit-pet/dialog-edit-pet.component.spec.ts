import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPetComponent } from './dialog-edit-pet.component';

describe('DialogEditPetComponent', () => {
  let component: DialogEditPetComponent;
  let fixture: ComponentFixture<DialogEditPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
