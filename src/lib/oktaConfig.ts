export const oktaConfig = {
    clientId: '0oa9jexcchcBJtiZc5d7',
    issuer: 'https://dev-49936801.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}