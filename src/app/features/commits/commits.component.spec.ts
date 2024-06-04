import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsComponent } from './commits.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CommitsComponent', () => {
  let component: CommitsComponent;
  let fixture: ComponentFixture<CommitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommitsComponent,RouterTestingModule]
    });
    fixture = TestBed.createComponent(CommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
