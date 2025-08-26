interface EnvConfig {
    jwtSecret: string,
    appName?: string
}

export const EnvConfig: EnvConfig = {
    jwtSecret: process.env.JWT_SECRET || 'test@123',
}