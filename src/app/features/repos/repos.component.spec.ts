import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReposComponent } from './repos.component';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Repo } from '@core/models';
import { GithubService } from '@core/http/github.service';
import { Router } from '@angular/router';
import { MockProvider, MockRender } from 'ng-mocks';

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;
  let mockGithubService: GithubService;
  let mockRouter: Router;

  beforeEach(async () => {
    mockGithubService = jasmine.createSpyObj('GithubService', ['searchRepos']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        //MockProvider(GithubService),
         MockProvider(GithubService, {
          searchRepos: () => of( [
            {
              id: 1,
              name: 'angular/angular',
              full_name: 'angular/angular',
              description: 'One framework. Mobile & desktop.',
              stargazers_count: 81914,
              forks_count: 29634,
              owner: {
                login: 'angular',
                avatar_url: 'https://avatars.githubusercontent.com/u/1316496?v=4', // Example avatar URL
              },
            },
            {
              id: 2,
              name: 'angular/cli',
              full_name: 'angular/cli',
              description: 'CLI tool for Angular',
              stargazers_count: 24821,
              forks_count: 8250,
              owner: {
                login: 'angular',
                avatar_url: 'https://avatars.githubusercontent.com/u/1316496?v=4', // Example avatar URL
              },
            },
          ]),
        }) 
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initially display an empty list of repos', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const repoList = debugElement.query(By.css('.repo-list')); // Adjust selector if needed
    expect(repoList).toBeNull(); // Or expect no repos found message
  });
 
  it('should search for repos when the search term is at least 2 characters long', fakeAsync(() => {
    const searchTerm = 'angular';
    component.searchControl.setValue(searchTerm);
    fixture.detectChanges();
    tick(300); // Simulate debounceTime
    expect(component.repos.length).toEqual(2);
  })); 
});


