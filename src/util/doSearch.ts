// Utility function for search

import {
	ProviderId,
	NewProviderId,
	Scraper,
	SearchError,
	SearchOptions,
} from "../scrapers/types";
import * as scrapers from "../scrapers";
import { getProviderName } from "../routers/manga-page";
import { ScraperResponse } from "../types";

export async function doSearch(
	//provider = NewProviderId,
	provider: ProviderId,
	query = "",
	
	searchOptions: Partial<SearchOptions> = {}
): Promise<ScraperResponse[] | SearchError> {
	// Get and verify scraper
	const scraper: Scraper | undefined = scrapers[getProviderName(provider)];
	if (!scraper) {
		return null;
	}

	// Get search results
	const searchResults = await scraper.search(query, {
		...searchOptions,
		resultCount: 50,
	});

	// Give back results
	return searchResults || []; // Return empty array if there's a falsy response
}
