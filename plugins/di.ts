import { AuthService } from '~/services/auth.service';
import { UserService } from '~/services/user.service';
import { useCampaignService } from '~/services/campaigns.service';
import { useElementService } from '~/services/elements.service';

export const api = {
  auth: new AuthService(),
  user: new UserService(),
  campaign: useCampaignService(),
  element: useElementService()
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api
    }
  };
});
