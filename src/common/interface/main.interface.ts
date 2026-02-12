
export enum Role {
    SUPERADMIN = 'SUPERADMIN',
    SCHOOL_ADMIN = 'SCHOOL_ADMIN',
}

export interface JwtPayloadI {
    userId: string;
    email: string;
    userRole: Role;
    schoolId?: string;
}
