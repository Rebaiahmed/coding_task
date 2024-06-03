import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  searchRepos(query: string, language?: string, stars?: number): Observable<any> {
    let params = `q=${query}`;
    if (language) params += `+language:${language}`;
    if (stars) params += `+stars:>=${stars}`;
    return this.http.get(`${environment.apiUrl}/search/repositories?${params}`);
  }

  getCommits(repo: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/repos/${repo}/commits`);
  }

  getCommitsByRepoId(repoId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/repositories/${repoId}/commits`);
  }
}
