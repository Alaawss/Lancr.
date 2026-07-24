import { Database } from './database'

export type User = Database['public']['Tables']['users']['Row']
export type Campaign = Database['public']['Tables']['campaigns']['Row']
export type Benefit = Database['public']['Tables']['benefits']['Row']
export type Signup = Database['public']['Tables']['signups']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type CampaignView = Database['public']['Tables']['campaign_views']['Row']

export interface CampaignWithStats extends Campaign {
  benefits: Benefit[]
  _count: {
    signups: number
    views: number
  }
}

export interface SignupWithReferralCount extends Signup {
  _count: {
    referrals: number
  }
}
