import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgendarPetComponent } from './dialog-agendar-pet.component';

describe('DialogAgendarPetComponent', () => {
  let component: DialogAgendarPetComponent;
  let fixture: ComponentFixture<DialogAgendarPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAgendarPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAgendarPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
