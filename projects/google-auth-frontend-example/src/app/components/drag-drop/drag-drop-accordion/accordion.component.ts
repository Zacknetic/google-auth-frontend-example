import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
	selector: 'app-accordion',
	standalone: true,
	imports: [NgIf, CdkDrag, CdkDragHandle],
	templateUrl: './accordion.component.html',
	styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
	@Input() item: any;
	@ViewChild('pinButton') pinButton!: ElementRef;
	@ViewChild('titleBar') titleBar!: ElementRef;

	ngAfterViewInit() {
		this.pinButton.nativeElement.addEventListener(
			'click',
			this.pinItem.bind(this),
			true
		);

		this.titleBar.nativeElement.addEventListener(
			'click',
			this.toggleExpanded.bind(this)
		);
	}

	toggleExpanded(event: MouseEvent): void {
		event.stopPropagation();
		if (this.item.isPinned) return;
		this.item.expanded = !this.item.expanded;
		console.log('expand toggled', this.item.expanded);
	}

	pinItem(event: MouseEvent) {
		event.stopPropagation();
		this.item.isPinned = !this.item.isPinned;
		console.log('item pinned', this.item.isPinned);
	}
}
