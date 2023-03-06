import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCardPageComponent } from './review-card-page.component';

describe('ReviewCardPageComponent', () => {
  let component: ReviewCardPageComponent;
  let fixture: ComponentFixture<ReviewCardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
