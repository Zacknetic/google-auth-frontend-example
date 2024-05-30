import { Injectable } from '@angular/core';

export interface Movie {
  title: string;
  description: string;
  isPinned: boolean;
  expanded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movies: Movie[] = [
    { title: 'Consumer Info', description: 'The consumer info is displayed here. Eventually will need to show tabs for "info, accounts, etc"', isPinned: true, expanded: true },
    { title: 'Terminal Status', description: 'Information about the terminal status. We can reuse the "terminal popup" design here', isPinned: false, expanded: true },
    { title: 'Current Transaction', description: 'Information and actionable inputs/buttons will appear here for the current transaction.', isPinned: false, expanded: true },

    // Add more movies as needed
  ];

  getMovies(): Movie[] {
    return this.movies;
  }
}
