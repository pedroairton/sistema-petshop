import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAtendimentosPetComponent } from './dialog-atendimentos-pet.component';

describe('DialogAtendimentosPetComponent', () => {
  let component: DialogAtendimentosPetComponent;
  let fixture: ComponentFixture<DialogAtendimentosPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAtendimentosPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAtendimentosPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
