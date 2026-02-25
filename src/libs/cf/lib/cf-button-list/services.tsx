import { gql } from "@apollo/client";

import { defaultLocale } from "@aces/i18n";
import { ButtonFragment, cfClient, cfPreviewClient } from "@aces/contentful";

export const ButtonListFragment = gql`
  ${ButtonFragment}

  fragment ButtonList on ButtonList {
    internalTitle
    buttonStyle
    buttonsCollection {
      items {
        ...Button
      }
    }
    sys {
      id
    }
  }
`;

export const ButtonListQuery = gql`
  ${ButtonFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
    buttonList(id: $id, preview: $preview, locale: $locale) {
      ...ButtonList
    }
  }
`;

export const fetchButtonListData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: ButtonListQuery,
      variables: { id, preview, locale },
    });

    return response.data.buttonList;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
