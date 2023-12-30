
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { JwtCookiePayload, JwtTokenPayload } from '@/graphql/interfaces';

const JWT_COOKIE_NAME = 'jwt_auth_cookie';

class Cookie {
    readonly #cookies: Cookies;

    constructor() {
        this.#cookies = new Cookies();
    }

    setAuthCookie(token: string) {
        const decodedJwt = jwtDecode<JwtTokenPayload>(token);
        const { exp, username } = decodedJwt;
        const cookiePayload = {
            token,
            username,
        };
        this.#cookies.set(JWT_COOKIE_NAME, cookiePayload, {
            expires: new Date(exp * 1000),
            sameSite: 'strict',
        });
        return this.checkAuthCookie();
    }

    getAuthCookie(): JwtCookiePayload {
        return this.#cookies.get(JWT_COOKIE_NAME);
    }

    checkAuthCookie() {
        return this.getAuthCookie() !== undefined;
    }

    removeAuthCookie() {
        this.#cookies.remove(JWT_COOKIE_NAME);
    }
}

export default Cookie;
