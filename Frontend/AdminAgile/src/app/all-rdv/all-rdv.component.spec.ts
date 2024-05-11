import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRdvComponent } from './all-rdv.component';

describe('AllRdvComponent', () => {
  let component: AllRdvComponent;
  let fixture: ComponentFixture<AllRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
