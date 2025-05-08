import { ActionResponse } from "@/types/global"
import logger from "../logger";
import errorHandler from "./error";
import { RequestError } from "../http-error";

interface FetchOptions extends RequestInit {
  timeout?: number
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string, 
  Options: FetchOptions = {}
):Promise<ActionResponse<T>> {
  const {
    timeout=5000,
    headers: customHeaders = {},
    ...restOptions
  } = Options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit= {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = {
    ...defaultHeaders,
    ...customHeaders,
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
      const response = await fetch(url, config);

      clearTimeout(id);

      if(!response.ok) {
        throw new RequestError(response.status, `HTTP Error: ${response.statusText}`);
      }

      return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown Error");
  
    if(error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out`);
    }else{
      logger.error(`Error fetching ${url}:${error.message}`);
    }

    return errorHandler(error) as unknown as ActionResponse<T>
  }
}