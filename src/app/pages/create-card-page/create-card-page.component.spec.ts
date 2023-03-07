import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardPageComponent } from './create-card-page.component';

describe('CreateCardPageComponent', () => {
  let component: CreateCardPageComponent;
  let fixture: ComponentFixture<CreateCardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
