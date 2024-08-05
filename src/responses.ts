import fetch from "node-fetch";

import { API_KEY, BASE_URL, MAX_PAGES } from "./constants";
import {
  getCampaignResponsesOptsSchema,
  getCampaignResponsesResponseSchema,
  type FormItem,
} from "./schema";
import logger from "./debug";
import { z } from "zod";

export type GetCampaignResponsesOpts = z.infer<
  typeof getCampaignResponsesOptsSchema
>;

export const getCampaignResponses = async (
  campaignId: string,
  opts?: GetCampaignResponsesOpts
) => {
  if (!API_KEY) throw new Error("IK12 API Key not set");

  const route = "campaigns";
  const campaignRoute = "responses";
  const url = `${BASE_URL}/${route}/${campaignId}/${campaignRoute}`;
  const searchParams = new URLSearchParams({});
  const maxPages = MAX_PAGES ? parseInt(MAX_PAGES) : 20;
  if (opts?.status) searchParams.set("statusGroup", opts.status);
  if (opts?.firstSubmittedAtStart)
    searchParams.set("firstSubmittedAtStart", opts.firstSubmittedAtStart);
  if (opts?.firstSubmittedAtEnd)
    searchParams.set("firstSubmittedAtEnd", opts.firstSubmittedAtEnd);
  if (opts?.lastSubmittedAtStart)
    searchParams.set("lastSubmittedAtStart", opts.lastSubmittedAtStart);
  if (opts?.lastSubmittedAtEnd)
    searchParams.set("lastSubmittedAtEnd", opts.lastSubmittedAtEnd);
  if (opts?.completedAtStart)
    searchParams.set("completedAtStart", opts.completedAtStart);
  if (opts?.completedAtEnd)
    searchParams.set("completedAtEnd", opts.completedAtEnd);

  let page = 1;
  let nextPageAvailable = false;
  let data: FormItem[] = [];

  do {
    if (opts?.page ?? page > 1) {
      searchParams.set("page", opts?.page?.toString() ?? page.toString());
    }
    const fetchUrl = `${url}?${searchParams.toString()}`;
    const response = await fetch(fetchUrl, {
      headers: {
        "X-Authorization": API_KEY,
      },
    });
    const responseJson = await response.json();
    logger.log("Response retrieved from IK12 API", searchParams);
    logger.verbose("Response JSON", responseJson);

    const parsedResponse =
      getCampaignResponsesResponseSchema.safeParse(responseJson);
    if (!parsedResponse.success) {
      throw new Error(
        "IK12 API response schema invalid" + parsedResponse.error
      );
    }
    if (!parsedResponse.data) {
      throw new Error("IK12 API response data invalid");
    }
    data = [...data, ...parsedResponse.data.data];

    nextPageAvailable = false;
    if (parsedResponse.data.meta?.pagination) {
      const currentPage = parsedResponse.data.meta.pagination.currentPage;
      const totalPages = Math.min(
        parsedResponse.data.meta.pagination.totalPages,
        maxPages
      );
      if (
        !opts?.page &&
        opts?.retrieveAllPages &&
        currentPage < totalPages &&
        page < totalPages
      ) {
        nextPageAvailable = true;
        page++;
      }
    }
  } while (nextPageAvailable);

  return data;
};
