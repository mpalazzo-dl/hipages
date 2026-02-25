import type { CfFetchById } from "@aces/types";

import { CfButtonList } from "./render";
import { fetchButtonListData } from "./services";
import { ButtonListSkeleton } from "./skeleton";

export interface CfButtonListServerProps extends CfFetchById {}

export const CfButtonListServer = async ({
  id,
  preview,
  lang,
}: CfButtonListServerProps) => {
  let data;

  try {
    data = await fetchButtonListData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <ButtonListSkeleton />;
  }

  if (!data) {
    return <ButtonListSkeleton />;
  }

  return (
    <CfButtonList
      internalTitle={data.internalTitle}
      buttonStyle={data.buttonStyle}
      buttonsCollection={data.buttonsCollection}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
