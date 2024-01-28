export interface ITheme {
    name: string;
    properties: Map<string, string>;
    add(name: string, value: string): ITheme;
}

export interface IThemeManager {
    themes: ITheme[];
    current: ITheme | null;

    toggleTheme(): void;

    load(): void;
    add(theme: ITheme): void;
    get(name: string): ITheme | null;

    setTheme(name: string): void;
    getTheme(): string;
}
