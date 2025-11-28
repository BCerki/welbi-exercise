export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface PaginationInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
}
export interface Connection<T> {
    edges: Array<{
        node: T;
        cursor: string;
    }>;
    pageInfo: PaginationInfo;
}
export type Maybe<T> = T | null | undefined;
export type ID = string;
export type DateTime = string;
export interface AppError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}
export interface DatabaseConfig {
    url: string;
    maxConnections?: number;
    debug?: boolean;
}
export interface ServerConfig {
    port: number;
    host?: string;
    cors?: {
        origin: string | string[];
        credentials?: boolean;
    };
}
export interface AuthConfig {
    jwtSecret: string;
    jwtExpiresIn: string;
    refreshTokenExpiresIn: string;
}
export interface Permission {
    action: string;
    subject: string;
    conditions?: Record<string, unknown>;
    fields?: string[];
}
export interface Role {
    id: string;
    name: string;
    permissions: Permission[];
}
//# sourceMappingURL=index.d.ts.map