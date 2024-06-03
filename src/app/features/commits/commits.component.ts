import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Commit } from '@core/commit';
import { GithubService } from '@core/http/github.service';
import { Observable, catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-commits',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent {

  commits$: Observable<Commit[]>;
  searchControl = new FormControl('');


  constructor(private route: ActivatedRoute, private githubService: GithubService) { }


  ngOnInit(): void {
    this.handleRouteChanges();
    this.setupSearchControl();
  }

  handleRouteChanges(): void {
    this.commits$ = this.route.paramMap.pipe(
      switchMap(params => {
        const repoId = params.get('repoId');
        return this.githubService.getCommitsByRepoId(repoId).pipe(
          catchError(error => {
            console.error('Error fetching commits:', error);
            return [];
          })
        );
      })
    );
  }

  setupSearchControl(): void {
    this.commits$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(query => query.length >= 2),
      tap(query => console.log(`Searching for: ${query}`)),
      switchMap(query => this.githubService.getCommitsByRepoId(query)),
      catchError(error => {
        console.error('Error searching commits:', error);
        return [];
      })
    );
  }

}
