import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUsuarioComponent } from './dialog-edit-usuario.component';

describe('DialogEditUsuarioComponent', () => {
  let component: DialogEditUsuarioComponent;
  let fixture: ComponentFixture<DialogEditUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
