export const getAdaptedUrl = (url: string) => {
    const timestamp = new Date().getTime();
    const isProduction = process.env.NODE_ENV === "production";
    const pathDev = ".." + url + "?ts=" + timestamp;
    const pathProduction = `../../assets${url}/index.js?ts=${timestamp}`;
    return isProduction ? pathProduction : pathDev;
};
