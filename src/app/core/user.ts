export interface Roles {
    player?: boolean;
    dungeonMaster?: boolean;
    admin?: boolean;
}

export interface Campaign {
    campaignId?: any;
}

export interface UserModel {
    uid?: string;
    email?: string;
    roles?: Roles;
    campaigns?: Campaign;
    displayName?: string;
    photoURL?: string;
}
