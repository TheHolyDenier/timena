import { ProjectDto } from '~/models/projects/project.dto';

export class UserDto {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  passwordHash: string;
  accessToken?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  projects?: ProjectDto[];

  constructor(data: Partial<UserDto>) {
    if (data) Object.assign(this, data);
  }
}
