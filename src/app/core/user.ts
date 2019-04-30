export interface Roles {
    player?: boolean;
    dungeonMaster?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    email: string;
    roles?: Roles;
    displayName?: string;
    photoURL?: string;
}
