import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReposComponent } from './repos.component';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Repo } from '@core/models';
import { GithubService } from '@core/http/github.service';
import { Router } from '@angular/router';

fdescribe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;
  let mockGithubService: GithubService;
  let mockRouter: Router;

  beforeEach(async () => {
    mockGithubService = jasmine.createSpyObj('GithubService', ['searchRepos']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ReposComponent],
      providers: [
        { provide: GithubService, useValue: mockGithubService },
        { provide: Router, useValue: mockRouter },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture = null;
    component = null;
    mockGithubService = null;
    mockRouter = null;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initially display an empty list of repos', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const repoList = debugElement.query(By.css('.repo-list')); // Adjust selector if needed

    expect(repoList).toBeNull(); // Or expect no repos found message
  });
/* 
  it('should search for repos when the search term is at least 2 characters long', fakeAsync(() => {
    const searchTerm = 'angular';
    const mockRepos: Repo[] = [
      { id: 1, name: 'angular/angular' },
      { id: 2, name: 'angular/cli' },
    ];

    mockGithubService.searchRepos.and.returnValue(of(mockRepos));
    component.searchControl.setValue(searchTerm);
    fixture.detectChanges();
    tick(300); // Simulate debounceTime

    expect(mockGithubService.searchRepos).toHaveBeenCalledWith(searchTerm);

    fixture.whenStable().then(() => {
      // Assert presence and content of repos after search
      const debugElement: DebugElement = fixture.debugElement;
      const repoList = debugElement.query(By.css('.repo-list')); // Adjust selector if needed

      expect(repoList).not.toBeNull(); // Or expect number of repos displayed
      // Add assertions for specific repo details if displayed
    });
  })); */

 /*  it('should handle API errors gracefully and display an error message', fakeAsync(() => {
    const error = new Error('API request failed');
    mockGithubService.searchRepos.and.returnValue(throwError(error));
    const searchTerm = 'error-term';

    component.searchControl.setValue(searchTerm);
    fixture.detectChanges();
    tick(300); // Simulate debounceTime

    expect(mockGithubService.searchRepos).toHaveBeenCalledWith(searchTerm);

    fixture.whenStable().then(() => {
      // Assert error message displayed
      const debugElement: DebugElement = fixture.debugElement;
      const errorMessage = debugElement.query(By.css('.error-message')); // Adjust selector if needed

      expect(errorMessage).not.toBeNull();
      // Add assertions for specific error message content
    });
  })); */
});
