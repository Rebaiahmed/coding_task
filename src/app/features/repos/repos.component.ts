import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from 'src/app/core/http/github.service';
import { Repo } from 'src/app/core/repo';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable, debounceTime, distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent {

  repos$: Observable<Repo[]>;
  searchControl = new FormControl('');

  constructor(private githubService: GithubService,private router: Router) {}

  ngOnInit(): void {
    this.setupSearchControl();
  }

  setupSearchControl(): void {
    this.repos$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(query => query.length >= 2),
      tap(query => console.log(`Searching for: ${query}`)),
      switchMap(query => this.githubService.searchRepos(query).pipe(
        tap(data => console.log(`Received data: ${data}`))
      )),
      //takeUntil(this.destroy$)
    );
  }

  trackByRepoId(index: number, repo: Repo): number {
    return repo.id;
  }

  searchRepos(): void {
   /*  const query = this.searchControl.value;
    this.githubService.searchRepos(query).subscribe(data => {
      this.repos = data.items;
      this.filteredRepos = data.items;
    }); */
  }

  viewCommits(repo: Repo): void {
    //this.router.navigate(['/commits', { repoId: repo.id }]);
  }
  

}
