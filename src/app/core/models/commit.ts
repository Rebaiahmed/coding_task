export interface Commit {
    sha: string;
    commit: {
      author: {
        name: string;
        date: string;
      };
      message: string;
    };
    html_url: string;
    author: {
      login: string;
      avatar_url: string;
    };
  }
  
