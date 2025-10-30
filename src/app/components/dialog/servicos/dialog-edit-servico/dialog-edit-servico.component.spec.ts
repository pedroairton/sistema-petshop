import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditServicoComponent } from './dialog-edit-servico.component';

describe('DialogEditServicoComponent', () => {
  let component: DialogEditServicoComponent;
  let fixture: ComponentFixture<DialogEditServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
