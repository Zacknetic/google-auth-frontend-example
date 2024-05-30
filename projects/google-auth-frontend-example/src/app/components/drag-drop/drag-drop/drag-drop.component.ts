import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { MoviesService, Movie } from '../../../services/movies.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
  standalone: true,
  imports: [CdkDrag, CdkDragHandle, CdkDropList, CdkAccordionModule, NgIf, NgForOf], // Make sure all directives are imported here
  providers: [MoviesService]
})
export class DragDropComponent {
  movies: Movie[];
  doneMovies: Movie[] = [];
  isDragging: boolean = false;

  constructor(private moviesService: MoviesService) {
    this.movies = this.moviesService.getMovies();
  }

  toggleAccordion(event: MouseEvent, movie: Movie) {
    if (!this.isDragging) {
      movie.expanded = !movie.expanded;
    }
    this.isDragging = false;
  }

  pinItem(event: MouseEvent, movie: Movie) {
    event.stopPropagation();
    movie.isPinned = !movie.isPinned;
  }

  drop(event: CdkDragDrop<Movie[]>) {
    this.isDragging = true;
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
