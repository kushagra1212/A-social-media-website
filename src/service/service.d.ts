type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: string | FormData | URLSearchParams | ReadableStream<Uint8Array> | null;
};
