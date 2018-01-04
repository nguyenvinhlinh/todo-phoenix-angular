import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoingTasksComponent } from './doing-tasks.component';

describe('DoingTasksComponent', () => {
  let component: DoingTasksComponent;
  let fixture: ComponentFixture<DoingTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoingTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
