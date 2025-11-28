import { AbilityBuilder, createMongoAbility } from '@casl/ability';
// Role definitions
export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    MANAGER: 'manager',
    USER: 'user',
    GUEST: 'guest',
};
// Create ability based on user and their roles
export function createAbilityForUser(user, roles = []) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
    // Super admin can do everything
    if (roles.some(role => role.name === ROLES.SUPER_ADMIN)) {
        can('manage', 'all');
        return build();
    }
    // Admin permissions
    if (roles.some(role => role.name === ROLES.ADMIN)) {
        can('manage', 'User');
        can('manage', 'Post');
        can('manage', 'Comment');
        can('read', 'Setting');
    }
    // Manager permissions
    if (roles.some(role => role.name === ROLES.MANAGER)) {
        can('create', 'Post');
        can('read', 'Post');
        can('update', 'Post', { userId: user.id });
        can('delete', 'Post', { userId: user.id });
        can('read', 'User');
        can('update', 'User', { id: user.id });
    }
    // Regular user permissions
    if (roles.some(role => role.name === ROLES.USER)) {
        can('read', 'Post');
        can('create', 'Comment');
        can('update', 'Comment', { userId: user.id });
        can('delete', 'Comment', { userId: user.id });
        can('read', 'User', { id: user.id });
        can('update', 'User', { id: user.id });
    }
    // Guest permissions (very limited)
    if (roles.some(role => role.name === ROLES.GUEST)) {
        can('read', 'Post');
    }
    return build();
}
// Helper function to check if user can perform an action
export function canUserPerform(ability, action, subject, resource) {
    return ability.can(action, subject, resource);
}
// Helper function to check if user cannot perform an action
export function cannotUserPerform(ability, action, subject, resource) {
    return ability.cannot(action, subject, resource);
}
// Get all permissions for a user
export function getUserPermissions(user, roles) {
    const allPermissions = [];
    for (const role of roles) {
        allPermissions.push(...role.permissions);
    }
    return allPermissions;
}
// Check if user has a specific role
export function hasRole(roles, roleName) {
    return roles.some(role => role.name === roleName);
}
// Create a permission object
export function createPermission(action, subject, conditions, fields) {
    return {
        action,
        subject,
        conditions,
        fields,
    };
}
// Default role definitions for basic permissions
export const DEFAULT_ROLES = {
    [ROLES.SUPER_ADMIN]: {
        name: ROLES.SUPER_ADMIN,
        permissions: [
            createPermission('manage', 'all'),
        ],
    },
    [ROLES.ADMIN]: {
        name: ROLES.ADMIN,
        permissions: [
            createPermission('manage', 'User'),
            createPermission('manage', 'Post'),
            createPermission('manage', 'Comment'),
            createPermission('read', 'Setting'),
        ],
    },
    [ROLES.MANAGER]: {
        name: ROLES.MANAGER,
        permissions: [
            createPermission('create', 'Post'),
            createPermission('read', 'Post'),
            createPermission('update', 'Post'),
            createPermission('delete', 'Post'),
            createPermission('read', 'User'),
            createPermission('update', 'User'),
        ],
    },
    [ROLES.USER]: {
        name: ROLES.USER,
        permissions: [
            createPermission('read', 'Post'),
            createPermission('create', 'Comment'),
            createPermission('update', 'Comment'),
            createPermission('delete', 'Comment'),
            createPermission('read', 'User'),
            createPermission('update', 'User'),
        ],
    },
    [ROLES.GUEST]: {
        name: ROLES.GUEST,
        permissions: [
            createPermission('read', 'Post'),
        ],
    },
};
// Utility to get rules from ability (useful for debugging)
export function getAbilityRules(ability) {
    return ability.rules;
}
// Export the ability builder for advanced use cases
export { AbilityBuilder, createMongoAbility };
//# sourceMappingURL=index.js.map