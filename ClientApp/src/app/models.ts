export interface User {
  UserId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Password?: string;
  Confirm?: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Assigned?: Bug[];
  Created?: Bug[];
  Comments?: Comment[];
}

export interface Bug {
  BugId: number;
  Subject: string;
  Description: string;
  Priority: string;
  Status: string;
  DueDate: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  UserId: number;
  Creator: User;
  ProjectId: number;
  Project: Project;
  Assigned?: User[];
  Comments?: Comment[];
}

export interface Project {
  ProjectId: number;
  Name: string;
}

export interface Comment {
  CommentId: number;
  Status: string;
  Message: string;
  BugId: number;
  UserId: number;
  CreatedAt: Date;
  Bug?: Bug;
  User?: User;
}
