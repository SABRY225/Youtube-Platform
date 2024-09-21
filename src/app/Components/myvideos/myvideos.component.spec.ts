import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyvideosComponent } from './myvideos.component';

describe('MyvideosComponent', () => {
  let component: MyvideosComponent;
  let fixture: ComponentFixture<MyvideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyvideosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
