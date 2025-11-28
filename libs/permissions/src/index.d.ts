import { AbilityBuilder, PureAbility, createMongoAbility } from '@casl/ability';
import type { User, Role, Permission } from '@testwelbi/types';
export type Action = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subject = 'User' | 'Post' | 'Comment' | 'Setting' | 'all';
export type AppAbility = PureAbility<[Action, Subject]>;
export interface PermissionConditions {
    userId?: string;
    organizationId?: string;
    departmentId?: string;
    [key: string]: unknown;
}
export declare const ROLES: {
    readonly SUPER_ADMIN: "super_admin";
    readonly ADMIN: "admin";
    readonly MANAGER: "manager";
    readonly USER: "user";
    readonly GUEST: "guest";
};
export type RoleType = typeof ROLES[keyof typeof ROLES];
export declare function createAbilityForUser(user: User, roles?: Role[]): AppAbility;
export declare function canUserPerform(ability: AppAbility, action: Action, subject: Subject, resource?: any): boolean;
export declare function cannotUserPerform(ability: AppAbility, action: Action, subject: Subject, resource?: any): boolean;
export declare function getUserPermissions(user: User, roles: Role[]): Permission[];
export declare function hasRole(roles: Role[], roleName: RoleType): boolean;
export declare function createPermission(action: Action, subject: Subject, conditions?: PermissionConditions, fields?: string[]): Permission;
export declare const DEFAULT_ROLES: Record<RoleType, {
    name: string;
    permissions: Permission[];
}>;
export declare function getAbilityRules(ability: AppAbility): import("@casl/ability").SubjectRawRule<Action, import("@casl/ability").ExtractSubjectType<Subject>, unknown>[];
export { AbilityBuilder, createMongoAbility };
//# sourceMappingURL=index.d.ts.map