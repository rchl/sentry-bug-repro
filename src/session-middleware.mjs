import expressSession from 'express-session'
import { CustomSessionStore } from './session-store.mjs'

/** @type {import('express-session').CookieOptions} */
const cookieOptions = {
    domain: 'localhost',
    path: '/',
    secure: false,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
};


/** @type {import('express-session').SessionOptions} */
const expressSessionConfig = {
    store: new CustomSessionStore(),
    name: 'sentry-bug-session',
    secret: '123456',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: cookieOptions,
};

export const sessionMiddleware = expressSession(expressSessionConfig);
