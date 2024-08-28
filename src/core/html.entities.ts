const decode = (str: string): string => {
    return str
        .replaceAll("&amp;", "&")
        .replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">")
        .replaceAll("&quot;", '"')
        .replaceAll("&#x2F;", "/")
        .replaceAll("&#45;", "-")
        .replaceAll("&#39;", "'");
};

export { decode };
