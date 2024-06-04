import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, identity, map, tap, throwError } from 'rxjs';
import { environment } from '@environment/environment';
import { Repo } from '@core/models';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  searchRepos(query?: string, language?: string, stars?: number): Observable<any> {
    let params = '';
    if (query) params += `q=${query}`;
    if (language) params += `+language:${language}`;
    if (stars) params += `+stars:>=${stars}`;
    const endpoint = params ? `${environment.apiUrl}/search/repositories?${params}` : `${environment.apiUrl}/repositories`;
    return this.http.get(endpoint).pipe(
      tap(console.log),
      // Conditionally apply map based on search term
      query ? map((response) => response.items) : identity, // Use identity operator for non-search cases
      catchError(error => {
        return throwError('Error fetching repositories. Please try again later.');
      })
    );
  }

 

  getCommitsByRepoId(repoId: string, searchText?: string): Observable<any> {
    let endpoint = `${environment.apiUrl}/repositories/${repoId}/commits`;
    if (searchText) {
      // Construct search parameters based on GitHub API documentation
      endpoint += `?q=${searchText}`;
    }
    return this.http.get(endpoint).pipe(
      catchError(error => {
        return throwError('Error fetching commits. Please try again later.');
      })
    );
  }
  
}
