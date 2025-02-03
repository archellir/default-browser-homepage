const encode = (str: string) => btoa(encodeURIComponent(str));
const decode = (str: string) => decodeURIComponent(atob(str));
const hash = (str: string) => encode(String(Date.now()) + str);

const verify = (encoded: string, input: string) => {
  try {
    const decoded = decode(encoded);
    return decoded === input;
  } catch {
    return false;
  }
};

const verifyToken = (token: string, password: string) => {
  try {
    const decoded = decode(token);
    return decoded.slice(13) === password;
  } catch {
    return false;
  }
};

export const protect = {
  encode,
  decode,
  hash,
  verify,
  verifyToken
}; 