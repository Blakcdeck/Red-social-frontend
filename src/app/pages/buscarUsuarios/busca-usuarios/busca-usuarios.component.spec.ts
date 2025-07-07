import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaUsuariosComponent } from './busca-usuarios.component';

describe('BuscaUsuariosComponent', () => {
  let component: BuscaUsuariosComponent;
  let fixture: ComponentFixture<BuscaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
