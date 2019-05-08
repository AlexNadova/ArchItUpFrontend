import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToUsePageComponent } from './how-to-use-page.component';

describe('HowToUsePageComponent', () => {
  let component: HowToUsePageComponent;
  let fixture: ComponentFixture<HowToUsePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToUsePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToUsePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
