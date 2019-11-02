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
  Updates?: Update[];
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
  Updates?: Update[];
}

export interface Project {
  ProjectId?: number;
  Name?: string;
  Description?: string;
  Version?: string;
  Public?: number;
  URL?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  UserId?: number;
  Creator?: User;
  Contributors?: Contributor[];
  Bugs?: Bug[];
}

export interface Update {
  UpdateId?: number;
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
