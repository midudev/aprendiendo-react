/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BIN_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
