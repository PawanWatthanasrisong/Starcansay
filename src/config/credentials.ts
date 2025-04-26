export const getCredentials = () => {
    const base64 = process.env.GOOGLE_CREDENTIALS_BASE64;
    if (!base64) {
      throw new Error('GOOGLE_CREDENTIALS_BASE64 is not set.');
    }
    const credentials = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
    return credentials;
}; 