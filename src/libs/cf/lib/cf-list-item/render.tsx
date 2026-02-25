import { ContentfulLivePreview } from "@contentful/live-preview";

import { CfBaseComponent, CfImageProps, CfRichText } from "@aces/types";
import { generateId } from "@aces/utils";
import { palette, shape } from "@aces/theme";
import { Box, Col, Container, FlexBox, H5, Row } from "@aces/ui";
import { CfImageCover, CfRichTextRender } from "@aces/cf";

export interface CfListItemProps extends CfBaseComponent {
  headline: string;
  bodyCopy: CfRichText;
  listCopy?: CfRichText;
  columns: string;
  media: CfImageProps;
}

export const CfListItem = ({
  internalTitle,
  headline,
  bodyCopy,
  listCopy,
  columns,
  media,
  preview,
  __typename,
  id,
  lang,
}: CfListItemProps) => {
  return (
    <Box
      id={generateId(internalTitle)}
      data-component={__typename}
      marginY={{ xs: 15, md: 20 }}
    >
      <Container>
        <FlexBox
          style={{ borderTop: `1px solid ${palette.border.light}` }}
          paddingTop={{ xs: 12, md: 20 }}
        >
          <Row columnSpacing={32} rowSpacing={8}>
            <Col size={{ xs: 12, md: 7 }}>
              <FlexBox flexDirection={"column"} gap={8}>
                <H5
                  marginTop={5}
                  {...ContentfulLivePreview.getProps({
                    entryId: id,
                    fieldId: "headline",
                    locale: lang,
                  })}
                >
                  {headline}
                </H5>
                <CfRichTextRender
                  lang={lang}
                  preview={preview}
                  richTextDocument={bodyCopy.json}
                  {...ContentfulLivePreview.getProps({
                    entryId: id,
                    fieldId: "bodyCopy",
                    locale: lang,
                  })}
                />
                {listCopy && (
                  <CfRichTextRender
                    lang={lang}
                    preview={preview}
                    richTextDocument={listCopy.json}
                    columns={`${columns} auto`}
                    {...ContentfulLivePreview.getProps({
                      entryId: id,
                      fieldId: "listCopy",
                      locale: lang,
                    })}
                  />
                )}
              </FlexBox>
            </Col>
            <Col size={{ xs: 12, md: 5 }}>
              <CfImageCover
                __typename={media.__typename}
                id={media.id}
                image={media.image}
                altText={media.altText}
                internalTitle={media.internalTitle}
                lang={lang}
                preview={preview}
                coverHeight={320}
                borderRadius={shape.borderRadius}
                nested
              />
            </Col>
          </Row>
        </FlexBox>
      </Container>
    </Box>
  );
};
