import { gql } from "@apollo/client";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient, ImageFragment } from "@aces/contentful";

export const ListItemQuery = gql`
  ${ImageFragment}
  query ($id: String!, $preview: Boolean!, $locale: String) {
    listItem(id: $id, preview: $preview, locale: $locale) {
      internalTitle
      headline
      bodyCopy {
        json
      }
      listCopy {
        json
      }
      columns
      media {
        ...Image
      }
      sys {
        id
      }
    }
  }
`;

export const fetchListItemData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: ListItemQuery,
      variables: { id, preview, locale },
    });

    return response.data.listItem;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
