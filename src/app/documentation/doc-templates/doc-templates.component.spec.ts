import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTemplatesComponent } from './doc-templates.component';

describe('DocTemplatesComponent', () => {
  let component: DocTemplatesComponent;
  let fixture: ComponentFixture<DocTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
