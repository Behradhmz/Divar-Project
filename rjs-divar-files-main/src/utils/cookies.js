const setCookies = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken} max-age=${
    1 * 24 * 60 * 60
  }`;
  document.cookie = `refreshToken=${tokens.refreshToken}`;
};

const getCookie = (cookieName) => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName)
    ?.split("=")[1];
};

const deleteCookies = () => {
  // دریافت تمام کوکی‌ها
  const cookies = document.cookie.split(";");

  // پاک کردن هر کوکی
  cookies.forEach(cookie => {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=; max-age=0; path=/;`;
  });
};

export { setCookies, getCookie , deleteCookies };
