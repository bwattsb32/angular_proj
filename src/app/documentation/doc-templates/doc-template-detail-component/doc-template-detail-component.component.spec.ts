import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTemplateDetailComponentComponent } from './doc-template-detail-component.component';

describe('DocTemplateDetailComponentComponent', () => {
  let component: DocTemplateDetailComponentComponent;
  let fixture: ComponentFixture<DocTemplateDetailComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTemplateDetailComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTemplateDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
