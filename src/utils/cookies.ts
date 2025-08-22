export function setCookie(name:string, path:string ="/", value:string, minutes:number): void {
    const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; path=${path}; expires=${expires}`;
}

export function getCookie(name:string): string | null | undefined {
  if (typeof window !== "undefined") {
      const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return value;
    }
    return null;  
  }
}

export function deleteCookie(name:string, path:string = "/"): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}
 