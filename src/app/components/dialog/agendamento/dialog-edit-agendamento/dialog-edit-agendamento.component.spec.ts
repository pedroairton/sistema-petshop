import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAgendamentoComponent } from './dialog-edit-agendamento.component';

describe('DialogEditAgendamentoComponent', () => {
  let component: DialogEditAgendamentoComponent;
  let fixture: ComponentFixture<DialogEditAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditAgendamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
