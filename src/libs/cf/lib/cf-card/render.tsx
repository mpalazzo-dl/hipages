import { ContentfulLivePreview } from "@contentful/live-preview";

import {
  CfAlignment,
  CfBaseComponent,
  CfImageProps,
  CfRichText,
  ImageSize,
} from "@aces/types";
import { generateId } from "@aces/utils";
import { Card, H4 } from "@aces/ui";

import { CfRichTextRender } from "../cf-rich-text-render";

export enum CardTypes {
  Default = "Default",
  Borderless = "Borderless",
}

export interface CfCardProps extends CfBaseComponent {
  cardType: CardTypes;
  alignment: CfAlignment;
  bodyCopy: CfRichText;
  fullHeight?: boolean;
}

export const CfCard = ({
  internalTitle,
  alignment,
  bodyCopy,
  fullHeight,
  cardType,
  __typename,
  id,
  lang,
  preview,
}: CfCardProps) => {
  const isDefault = cardType === "Default";

  return (
    <Card
      id={generateId(internalTitle)}
      data-component={__typename}
      raised={isDefault}
      fullHeight={fullHeight}
    >
      <Card.Content paddingX={6} paddingY={6}>
        <CfRichTextRender
          richTextDocument={bodyCopy.json}
          alignment={alignment}
          lang={lang}
          preview={preview}
          {...ContentfulLivePreview.getProps({
            entryId: id,
            fieldId: "bodyCopy",
            locale: lang,
          })}
        />
      </Card.Content>
    </Card>
  );
};
