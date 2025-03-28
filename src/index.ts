import { useMemo } from "react";

const SECRET = "ALVBSLRGIBLSIUHRG395HGO4539RUFSIEVUGNBS4L8HGIWUN";

export const encryptState = (state: Record<string, any>): string => {
  const json = JSON.stringify(state);
  const buffer = new TextEncoder().encode(json);
  return btoa(
    buffer.reduce(
      (data, byte) => data + String.fromCharCode(byte ^ SECRET.charCodeAt(0)),
      ""
    )
  );
};

export const decryptState = (encoded: string): Record<string, any> => {
  const decoded = atob(encoded);
  const decrypted = new TextDecoder().decode(
    Uint8Array.from(decoded, (c) => c.charCodeAt(0) ^ SECRET.charCodeAt(0))
  );
  return JSON.parse(decrypted);
};

export const generateDeepLink = ({
  baseUrl,
  route,
  params,
  state,
}: {
  baseUrl: string;
  route: string;
  params?: Record<string, string>;
  state?: Record<string, any>;
}): string => {
  const url = new URL(`${baseUrl}${route}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  if (state) {
    const encrypted = encryptState(state);
    url.searchParams.set("state", encrypted);
  }

  return url.toString();
};

export const parseDeepLink = (
  searchParams: URLSearchParams
): {
  [key: string]: string | boolean | Record<string, any> | undefined;
  state?: Record<string, any>;
  fallback: boolean;
} => {
  const result: {
    [key: string]: string | boolean | Record<string, any> | undefined;
    state?: Record<string, any>;
    fallback: boolean;
  } = { fallback: false };

  for (const [key, value] of searchParams.entries()) {
    if (key === "state") {
      try {
        result.state = decryptState(value);
      } catch (e) {
        result.state = undefined;
        result.fallback = true;
      }
    } else {
      result[key] = value;
    }
  }

  return result;
};

export const useDeepLink = () => {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return parseDeepLink(params);
  }, [window.location.search]);
};
