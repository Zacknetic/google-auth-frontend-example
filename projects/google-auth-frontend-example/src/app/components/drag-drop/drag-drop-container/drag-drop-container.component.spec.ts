import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropContainerComponent } from './drag-drop-container.component';

describe('DragDropContainerComponent', () => {
  let component: DragDropContainerComponent;
  let fixture: ComponentFixture<DragDropContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragDropContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragDropContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
