export function setCookie(cookieName, cookieValue, cookieDays) {
    var d = new Date();
    d.setTime(d.getTime() + (cookieDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();

    document.cookie = cookieName + "=" + cookieValue + "; " + expires + "; path=/ ; Secure";
}