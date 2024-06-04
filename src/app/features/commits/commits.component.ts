import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Commit } from '@core/models/commit';
import { GithubService } from '@core/http/github.service';
import { Observable, catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-commits',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent {

  commits: Commit[]= [];
  searchControl = new FormControl('');
  destroyRef = inject(DestroyRef);


  constructor(private route: ActivatedRoute, private githubService: GithubService) { }


  ngOnInit(): void {
    this.handleRouteChanges();
    this.setupSearchControl();
  }

  handleRouteChanges(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const repoId = params.get('repoId');
        console.log('repo id',repoId)
        return this.githubService.getCommitsByRepoId(repoId).pipe(
          catchError(error => {
            console.error('Error fetching commits:', error);
            return [];
          })
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((commits)=>{
      this.commits=commits;
    })
  }

  setupSearchControl(): void {
    this.searchControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(300),
      distinctUntilChanged(),
      filter(query => query.length >= 2),
      tap(query => console.log(`Searching for: ${query}`)),
      switchMap(query => this.githubService.getCommitsByRepoId(query)),
      catchError(error => {
        console.error('Error searching commits:', error);
        return [];
      })
    ).subscribe((commits)=>{
      this.commits=commits;
    })
  }

}
