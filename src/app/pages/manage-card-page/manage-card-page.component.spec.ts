import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCardPageComponent } from './manage-card-page.component';

describe('ManageCardPageComponent', () => {
  let component: ManageCardPageComponent;
  let fixture: ComponentFixture<ManageCardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
