import { ITheme, IThemeManager } from "../interfaces/themes.interface";

export class Theme implements ITheme {
    name: string;
    properties: Map<string, string>;
    constructor(name: string) {
        this.name = name;
        this.properties = new Map<string, string>();
    }

    add(name: string, value: string): ITheme {
        this.properties.set(name, value);
        return this;
    }
}

export const LightTheme = new Theme("light");
export const DarkTheme = new Theme("dark");
export const CedroDarkTheme = new Theme("cedro-dark");

LightTheme.add("--palette-text-primary", "rgba(0, 0, 0, 0.87)")
    .add("--palette-text-secondary", "rgba(0, 0, 0, 0.6)")
    .add("--palette-text-disabled", "rgba(0, 0, 0, 0.38)")
    .add("--palette-background-default", "#ffffff")
    .add("--palette-background-paper", "#ffffff")
    .add("--palette-action-active", "rgba(0, 0, 0, 0.54)")
    .add("--palette-action-disabled", "rgba(0, 0, 0, 0.26)")
    .add("--palette-action-hover", "#f5f5f5")
    .add("--palette-action-selected", "rgba(0, 0, 0, 0.08)")
    .add("--palette-action-disabled-bg", "rgba(0, 0, 0, 0.12)")

    .add("--palette-divider", "rgba(0, 0, 0, 0.12)")

    .add("--palette-link", "#1d79ee")
    .add("--palette-link-hover", "#3393f2")

    /*PRIMARY*/

    .add("--palette-primary-main", "#90caf9")
    .add("--palette-primary-dark", "#42a5f5")
    .add("--palette-primary-light", "#e3f2fd")

    .add("--palette-primary-text-main", "#2a3b49")
    .add("--palette-primary-text-dark", "#133048")
    .add("--palette-primary-text-light", "#43474b")

    /*SECONDARY*/

    .add("--palette-secondary-main", "#ce93d8")
    .add("--palette-secondary-dark", "#ab47bc")
    .add("--palette-secondary-light", "#f3e5f5")

    .add("--palette-secondary-text-main", "#3d2b40")
    .add("--palette-secondary-text-dark", "#e6c8eb")
    .add("--palette-secondary-text-light", "#484348")

    /*ERROR*/

    .add("--palette-error-main", "#f44336")
    .add("--palette-error-dark", "#d32f2f")
    .add("--palette-error-light", "#e57373")

    .add("--palette-error-text-main", "#fbc7c3")
    .add("--palette-error-text-dark", "#f1c1c1")
    .add("--palette-error-text-light", "#432222")

    /*WARNING*/

    .add("--palette-warning-main", "#ffa726")
    .add("--palette-warning-dark", "#ffb74d")
    .add("--palette-warning-light", "#f57c00")

    .add("--palette-warning-text-main", "#4b310b")
    .add("--palette-warning-text-dark", "#4b3616")
    .add("--palette-warning-text-light", "#482400")

    /*INFO*/

    .add("--palette-info-main", "#29b6f6")
    .add("--palette-info-dark", "#4fc3f7")
    .add("--palette-info-light", "#0288d1")

    .add("--palette-info-text-main", "#0c3649")
    .add("--palette-info-text-dark", "#173949")
    .add("--palette-info-text-light", "#b3dbf1")

    /*SUCCESS*/

    .add("--palette-success-main", "#66bb6a")
    .add("--palette-success-dark", "#81c784")
    .add("--palette-success-light", "#388e3c")

    .add("--palette-success-text-main", "#1e371f")
    .add("--palette-success-text-dark", "#263b27")
    .add("--palette-success-text-light", "#c3ddc5");

DarkTheme.add("--palette-text-primary", "#cdd0d3")
    .add("--palette-text-secondary", "#9aa0a6")
    .add("--palette-text-disabled", "rgba(255, 255, 255, 0.5)")

    .add("--palette-background-default", "#121212")
    .add("--palette-background-paper", "#121212")

    .add("--palette-action-active", "#ffffff")
    .add("--palette-action-disabled", "rgba(255, 255, 255, 0.3)")
    .add("--palette-action-hover", "#252525")
    .add("--palette-action-selected", "rgba(255, 255, 255, 0.16)")
    .add("--palette-action-disabled-bg", "rgba(255, 255, 255, 0.12)")

    .add("--palette-divider", "rgba(255, 255, 255, 0.12)")

    .add("--palette-link", "#90caf9")
    .add("--palette-link-hover", "#e3f2fd")

    /*PRIMARY*/
    .add("--palette-primary-main", "#90caf9")
    .add("--palette-primary-dark", "#42a5f5")
    .add("--palette-primary-light", "#e3f2fd")

    .add("--palette-primary-text-main", "#2a3b49")
    .add("--palette-primary-text-dark", "#133048")
    .add("--palette-primary-text-light", "#43474b")

    /*SECONDARY*/

    .add("--palette-secondary-main", "#ce93d8")
    .add("--palette-secondary-dark", "#ab47bc")
    .add("--palette-secondary-light", "#f3e5f5")

    .add("--palette-secondary-text-main", "#3d2b40")
    .add("--palette-secondary-text-dark", "#e6c8eb")
    .add("--palette-secondary-text-light", "#484348")

    /*ERROR*/

    .add("--palette-error-main", "#f44336")
    .add("--palette-error-dark", "#d32f2f")
    .add("--palette-error-light", "#e57373")

    .add("--palette-error-text-main", "#fbc7c3")
    .add("--palette-error-text-dark", "#f1c1c1")
    .add("--palette-error-text-light", "#432222")

    /*WARNING*/

    .add("--palette-warning-main", "#ffa726")
    .add("--palette-warning-dark", "#ffb74d")
    .add("--palette-warning-light", "#f57c00")

    .add("--palette-warning-text-main", "#4b310b")
    .add("--palette-warning-text-dark", "#4b3616")
    .add("--palette-warning-text-light", "#482400")

    /*INFO*/

    .add("--palette-info-main", "#29b6f6")
    .add("--palette-info-dark", "#4fc3f7")
    .add("--palette-info-light", "#0288d1")

    .add("--palette-info-text-main", "#0c3649")
    .add("--palette-info-text-dark", "#173949")
    .add("--palette-info-text-light", "#b3dbf1")

    /*SUCCESS*/

    .add("--palette-success-main", "#66bb6a")
    .add("--palette-success-dark", "#81c784")
    .add("--palette-success-light", "#388e3c")

    .add("--palette-success-text-main", "#1e371f")
    .add("--palette-success-text-dark", "#263b27")
    .add("--palette-success-text-light", "#c3ddc5");

CedroDarkTheme.add("--palette-text-primary", "#d3d0c8")
    .add("--palette-text-secondary", "#a6a29a")
    .add("--palette-text-disabled", "rgba(80, 81, 82, 0.5)")

    .add("--palette-background-default", "#655349")
    .add("--palette-background-paper", "#56473e")

    .add("--palette-action-active", "#655447")
    .add("--palette-action-disabled", "rgba(39, 32, 27, 0.3)")
    .add("--palette-action-hover", "#56473e")
    .add("--palette-action-selected", "rgba(255, 255, 255, 0.16)")
    .add("--palette-action-disabled-bg", "rgba(255, 255, 255, 0.12)")

    .add("--palette-divider", "rgba(255, 255, 255, 0.12)")

    .add("--palette-link", "#ffa500")
    .add("--palette-link-hover", "#c07e06")

    /*PRIMARY*/
    .add("--palette-primary-main", "#f9ca90")
    .add("--palette-primary-dark", "#da9f56")
    .add("--palette-primary-light", "#fcd09a")

    .add("--palette-primary-text-main", "#2a3b49")
    .add("--palette-primary-text-dark", "#133048")
    .add("--palette-primary-text-light", "#43474b")

    /*SECONDARY*/

    .add("--palette-secondary-main", "#ce93d8")
    .add("--palette-secondary-dark", "#ab47bc")
    .add("--palette-secondary-light", "#f3e5f5")

    .add("--palette-secondary-text-main", "#3d2b40")
    .add("--palette-secondary-text-dark", "#e6c8eb")
    .add("--palette-secondary-text-light", "#484348")

    /*ERROR*/

    .add("--palette-error-main", "#9e5656")
    .add("--palette-error-dark", "#d32f2f")
    .add("--palette-error-light", "#e57373")

    .add("--palette-error-text-main", "#fbc7c3")
    .add("--palette-error-text-dark", "#f1c1c1")
    .add("--palette-error-text-light", "#432222")

    /*WARNING*/

    .add("--palette-warning-main", "#ffa726")
    .add("--palette-warning-dark", "#ffb74d")
    .add("--palette-warning-light", "#f57c00")

    .add("--palette-warning-text-main", "#4b310b")
    .add("--palette-warning-text-dark", "#4b3616")
    .add("--palette-warning-text-light", "#482400")

    /*INFO*/

    .add("--palette-info-main", "#29b6f6")
    .add("--palette-info-dark", "#4fc3f7")
    .add("--palette-info-light", "#0288d1")

    .add("--palette-info-text-main", "#0c3649")
    .add("--palette-info-text-dark", "#173949")
    .add("--palette-info-text-light", "#b3dbf1")

    /*SUCCESS*/

    .add("--palette-success-main", "#599062")
    .add("--palette-success-dark", "#81c784")
    .add("--palette-success-light", "#388e3c")

    .add("--palette-success-text-main", "#1e371f")
    .add("--palette-success-text-dark", "#263b27")
    .add("--palette-success-text-light", "#c3ddc5");

export class ThemeManager implements IThemeManager {
    themes: ITheme[];
    current: ITheme | null;

    constructor() {
        this.themes = [];
        this.current = null;
    }

    public toggleTheme(): void {
        if (this.current) {
            if (this.current.name === "dark") {
                this.setTheme("light");
                return;
            } else {
                this.setTheme("dark");
                return;
            }
        }
        this.setTheme("light");
    }

    public load(): void {
        const storageThemeName = localStorage.getItem("papertrade-theme");

        if (storageThemeName) {
            this.setTheme(storageThemeName);
            return;
        }
        this.setTheme("light");
    }

    public add(theme: ITheme): void {
        this.themes.push(theme);
    }

    public get(name: string): ITheme | null {
        for (const theme of this.themes) {
            if (theme.name === name) {
                return theme;
            }
        }
        return null;
    }

    public setTheme(name: string): void {
        this.current = this.get(name);

        if (!this.current) return;

        var root = document.querySelector(":root") as HTMLElement;

        for (const prop of this.current.properties) {
            const [name, value] = prop;
            root.style.setProperty(name, value);
        }

        localStorage.setItem("papertrade-theme", this.current.name);
    }

    public getTheme(): string {
        if (this.current) return this.current.name;
        return "light";
    }
}
