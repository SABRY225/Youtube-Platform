import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarReightComponent } from './sidebar-reight.component';

describe('SidebarReightComponent', () => {
  let component: SidebarReightComponent;
  let fixture: ComponentFixture<SidebarReightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarReightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarReightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
