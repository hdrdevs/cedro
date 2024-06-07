export function UID(): string {
    return "w-uid-" + Date.now().toString(36) + "-" + Math.random().toString(36);
}
