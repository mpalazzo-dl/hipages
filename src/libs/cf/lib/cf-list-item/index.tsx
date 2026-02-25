import type { CfFetchById } from "@aces/types";

import { CfListItem } from "./render";
import { fetchListItemData } from "./services";
import { ListItemSkeleton } from "./skeleton";

export interface CfListItemServerProps extends CfFetchById {}

export const CfListItemServer = async ({
  id,
  preview,
  lang,
}: CfListItemServerProps) => {
  let data;

  try {
    data = await fetchListItemData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <ListItemSkeleton />;
  }

  if (!data) {
    return <ListItemSkeleton />;
  }

  return (
    <CfListItem
      internalTitle={data.internalTitle}
      headline={data.headline}
      bodyCopy={data.bodyCopy}
      listCopy={data.listCopy}
      columns={data.columns}
      media={data.media}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
