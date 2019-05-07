import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellcastingComponent } from './spellcasting.component';

describe('SpellcastingComponent', () => {
  let component: SpellcastingComponent;
  let fixture: ComponentFixture<SpellcastingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellcastingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellcastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
