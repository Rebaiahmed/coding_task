export interface Repo {
    id: string;
    name: string;
    owner: {
      login: string;
      avatar_url: string;
    };
    created_at: string;
    issues?: Issue[];
  }
  
  export interface Issue {
    title: string;
  }
  
