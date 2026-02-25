import { gql } from "@apollo/client";

import { cfClient, cfPreviewClient } from "@aces/contentful";
import { defaultLocale } from "@aces/i18n";

export const CardQuery = gql`
  query ($id: String!, $preview: Boolean!, $locale: String) {
    card(id: $id, preview: $preview, locale: $locale) {
      internalTitle
      cardType
      alignment
      bodyCopy {
        json
      }
      sys {
        id
      }
    }
  }
`;

export const fetchCardData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: CardQuery,
      variables: { id, preview, locale },
    });

    return response.data.card;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
