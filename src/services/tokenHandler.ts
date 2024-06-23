import axios from 'axios';
import { usePlayerStore } from '@/stores/player'
import { jwtDecode } from 'jwt-decode';




export const RefreshToken = () => {
    const store = usePlayerStore();

    const token = {
        AccessToken: store.player.accessToken,
        RefreshToken: store.player.refreshToken
    }

    console.log(token, "token")

    if (typeof token.AccessToken === 'string' && isTokenExpired(token.AccessToken)) {
        /* LogOut(); */
        return Promise.resolve();
    }

    return axios.post('https://localhost:7299/api/token/refresh', token, {
    }).then((response) => {
        store.player.accessToken = response.data.accessToken;
        store.player.refreshToken = response.data.refreshToken;

        console.log(response.data, "response.data")

        localStorage.setItem('UserObject', JSON.stringify(store.player));


    }).catch((error) => {
        console.error(error)
        /* LogOut(); */
    });

}

export const isTokenExpired = (token: string) => {
    try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        const expirationDate = new Date(exp * 1000).getTime();
        const currentDate = Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), new Date().getUTCHours(), new Date().getUTCMinutes(), new Date().getUTCSeconds());

        return expirationDate < currentDate;

    } catch (error) {
        console.error('Invalid token', error);
        return true;
    }
}

let refreshTimeoutId: number | null | undefined = null;


export const scheduleTokenRefresh = () => {
    const store = usePlayerStore();

    if (store.player.accessToken) {
        const isExpired = isTokenExpired(store.player.accessToken);
        if (!isExpired) {

            const decodedToken = jwtDecode(store.player.accessToken);
            const expiresIn = decodedToken && decodedToken.exp ? decodedToken.exp * 1000 - Date.now() : 0;

            const { exp } = JSON.parse(atob(store.player.accessToken.split('.')[1]));

            const expirationDate = new Date(exp * 1000);
            const refreshTime = expirationDate.getTime() - Date.now() - 2 * 60 * 1000; // 2 minutes before expiration

            console.log('Token will be refreshed in', refreshTime, 'ms')
            console.log('Token will expire at', expiresIn)

            // Clear any existing timeout
            if (refreshTimeoutId) {
                clearTimeout(refreshTimeoutId);
            }

            if (refreshTime > 0) {
                // Set up the timeout
                refreshTimeoutId = setTimeout(() => {
                    RefreshToken().then(() => {
                        // Schedule the next refresh
                        scheduleTokenRefresh();
                    });
                }, refreshTime);
            } else {
                RefreshToken().then(() => {
                    // Schedule the next refresh
                    scheduleTokenRefresh();
                }); // If the token is already expired or will expire in less than 2 minutes, refresh it immediately
            }
        } else {
            console.error('Token is already expired.');
        }
    } else {
        console.error('No access token found.');
    }
}