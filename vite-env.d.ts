/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_URL: string;

  // Socket URL

  readonly REACT_APP_SOCKETURL: string;

  // API URL

  readonly API_END_POINT: string;

  // Current URL

  readonly REACT_APP_CURURL: string;

  // Firebase

  readonly REACT_APP_FAPIKEY: string;
  readonly REACT_APP_AUTHDOM: string;
  readonly REACT_APP_PROJECTID: string;
  readonly REACT_APP_SB: string;
  readonly REACT_APP_MSID: string;
  readonly REACT_APP_APPID: string;
  readonly REACT_APP_MID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
