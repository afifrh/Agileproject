import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRdvComponent } from './user-rdv.component';

describe('UserRdvComponent', () => {
  let component: UserRdvComponent;
  let fixture: ComponentFixture<UserRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
