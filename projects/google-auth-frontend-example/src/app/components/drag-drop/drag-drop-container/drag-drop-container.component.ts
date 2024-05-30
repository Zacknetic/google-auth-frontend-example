import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgIf, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccordionComponent } from '../drag-drop-accordion/accordion.component';

@Component({
  selector: 'app-drag-drop-container',
  standalone: true,
  imports: [CdkDropList, CdkDrag, NgIf, NgFor, AccordionComponent, CdkDragPlaceholder],
  templateUrl: './drag-drop-container.component.html',
  styleUrl: './drag-drop-container.component.scss'
})
export class DragDropContainerComponent {
  @Input() items: any[] = []; // Generic type to be replaced by actual type if necessary
  @Input() listId: string = '';
  @Input() connectedLists: string[] = []; // This is to know which lists are connected
  isDragging: boolean = false;

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }


  
}
