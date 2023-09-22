import { CampaignDto } from '~/domain/campaigns/campaign.dto';

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

  campaigns?: CampaignDto[];
  // PlayerOnCampaign?: PlayerOnCampaign[];

  constructor(data: Partial<UserDto>) {
    if (data) Object.assign(this, data);
  }
}
