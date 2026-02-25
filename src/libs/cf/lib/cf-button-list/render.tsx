import { ContentfulLivePreview } from "@contentful/live-preview";

import { CfBaseComponent } from "@aces/types";
import { generateId } from "@aces/utils";
import { palette } from "@aces/theme";
import { Button, FlexBox } from "@aces/ui";

import { buttonStyles, ButtonStyleType } from "../cf-button";
import { CfButtonListing, CfButtonProps } from "../cf-button/render";

export interface CfButtonListProps extends CfBaseComponent {
  buttonStyle: ButtonStyleType;
  buttonsCollection: {
    items: CfButtonProps[];
  };
}

export const CfButtonList = ({
  internalTitle,
  buttonStyle,
  buttonsCollection,
  __typename,
  id,
  lang,
  preview,
}: CfButtonListProps) => {
  const style = buttonStyles[buttonStyle];

  if (!Button || !style) return null;

  const variantStyles =
    style.variant === "outlined"
      ? {
          border: "2px solid",
          borderRadius: "20px",
        }
      : {};

  const colorStyles =
    style.color === "primary"
      ? {
          borderColor: palette.primary.main,
        }
      : {};

  return (
    <FlexBox
      id={generateId(internalTitle)}
      data-component={__typename}
      style={{
        position: "relative",
        flexDirection: "column",
        overflow: "hidden",
        ...variantStyles,
        ...colorStyles,
      }}
      {...ContentfulLivePreview.getProps({
        entryId: id,
        fieldId: "buttons",
        locale: lang,
      })}
    >
      {buttonsCollection.items.map((button) => {
        return (
          <CfButtonListing
            key={generateId(button.internalTitle)}
            internalTitle={button.internalTitle}
            link={button.link}
            title={button.title}
            rightIcon={button.rightIcon}
            __typename={button.__typename}
            id={button.id}
            style={style}
            lang={lang}
            preview={preview}
          />
        );
      })}
    </FlexBox>
  );
};
