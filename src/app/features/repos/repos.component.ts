import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from 'src/app/core/http/github.service';
import { Repo } from '@core/models/repo';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable, debounceTime, distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent {

  repos: Repo[]=[]
  searchControl = new FormControl('');
  destroyRef = inject(DestroyRef);

  constructor(private githubService: GithubService,private router: Router) {}

  ngOnInit(): void {
    this. fetchData();
    this.setupSearchControl();
  }

  fetchData(): void {
    this.githubService.searchRepos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((repos) => (this.repos = repos));
  }


  setupSearchControl(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(query => query.length >= 2),
      tap(query => console.log(`Searching for: ${query}`)),
      switchMap(query => this.githubService.searchRepos(query)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((results) => {
      this.repos =results;
    })
  }

  trackByRepoId(index: number, repo: Repo): number {
    return +repo.id; // Convert id to a number
  }
  
  viewCommits(repo: Repo): void {
   this.router.navigate(['/commits', { repoId: repo.id }]);
  }
  

}
