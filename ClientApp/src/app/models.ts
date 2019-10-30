export interface User {
  UserId?: number;
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Password?: string;
  Confirm?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Created?: Bug[];
  Comments?: Comment[];
}

export interface Bug {
  BugId?: number;
  Subject?: string;
  Description?: string;
  Priority?: string;
  Status?: string;
  DueDate?: Date;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  UserId?: number;
  Creator?: User;
  ProjectId?: number;
  Project?: Project;
  Comments?: Comment[];
}

export interface Project {
  ProjectId?: number;
  Name?: string;
  Description?: string;
  Status?: string;
  Public?: number;
  URL?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  UserId?: number;
  Creator?: User;
  Contributors?: Contributor[];
  Bugs?: Bug[];
}

export interface Comment {
  CommentId?: number;
  Status?: string;
  Message?: string;
  BugId?: number;
  UserId?: number;
  CreatedAt?: Date;
  Bug?: Bug;
  User?: User;
}

export interface Contributor {
  ContributorId?: number;
  ProjectId?: number;
  Project?: Project;
  UserId?: number;
  User?: User;
  Authorized?: number;
}
