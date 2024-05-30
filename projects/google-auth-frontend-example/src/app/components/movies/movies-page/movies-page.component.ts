import { Component } from '@angular/core';
import { DragDropContainerComponent } from '../../drag-drop/drag-drop-container/drag-drop-container.component';
import { MoviesService, Movie } from '../../../services/movies.service';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [DragDropContainerComponent],
  providers: [MoviesService],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss'
})
export class MoviesPageComponent {
  leftItems!: Movie[];
  rightItems: Movie[] = [];

  constructor(private moviesService: MoviesService) {
    this.leftItems = this.moviesService.getMovies();
  }
}
