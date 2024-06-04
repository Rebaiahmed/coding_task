import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '@core/http/github.service';
import { Commit } from '@core/models/commit';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';

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
  repoId='';


  constructor(private route: ActivatedRoute, private githubService: GithubService) { }


  ngOnInit(): void {
    this.handleRouteChanges();
    this.setupSearchControl();
  }

  handleRouteChanges(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const repoId = params.get('repoId');
        this.repoId=repoId;
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
      switchMap(query => this.githubService.getCommitsByRepoId( this.repoId,query)),
      catchError(error => {
        return [];
      })
    ).subscribe((commits)=>{
      this.commits=commits;
    })
  }

}
