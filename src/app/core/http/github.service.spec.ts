import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { environment } from '@environment/environment';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    // Verify there are no outstanding requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchRepos', () => {

    it('should return searched repositories with query parameter', fakeAsync(() => {
      const query = 'angular';
      const expectedUrl = `${environment.apiUrl}/search/repositories?q=${query}`;
      const mockResponse = { items: [{ id: 1, name: 'angular/angular' }] };

      service.searchRepos(query).subscribe();

      const request = httpMock.expectOne(expectedUrl);
      expect(request.request.method).toBe('GET');

      request.flush(mockResponse);
    }));

    it('should return searched repositories with all parameters', fakeAsync(() => {
      const query = 'react';
      const language = 'javascript';
      const stars = 10000;
      const expectedUrl = `${environment.apiUrl}/search/repositories?q=${query}+language:${language}+stars:>=${stars}`;
      const mockResponse = { items: [{ id: 2, name: 'facebook/react' }] };

      service.searchRepos(query, language, stars).subscribe();

      const request = httpMock.expectOne(expectedUrl);
      expect(request.request.method).toBe('GET');

      request.flush(mockResponse);
    }));

    // ... existing error handling tests ...
  });

  describe('getCommitsByRepoId', () => {
    // ... existing getCommitsByRepoId tests ...

    it('should return commits for a repo ID', fakeAsync(() => {
      const repoId = '12345';
      const expectedUrl = `${environment.apiUrl}/repositories/${repoId}/commits`;
      const mockCommits = [{ sha: 'abc123', message: 'Fix a bug' }];

      service.getCommitsByRepoId(repoId).subscribe();

      const request = httpMock.expectOne(expectedUrl);
      expect(request.request.method).toBe('GET');

      request.flush(mockCommits);
    }));

    // ... existing error handling tests ...
  });
 
});
