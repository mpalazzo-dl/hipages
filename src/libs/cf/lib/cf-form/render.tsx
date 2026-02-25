"use client";

import { ContentfulLivePreview } from "@contentful/live-preview";

import { CfBaseComponent, CfImageProps } from "@aces/types";
import { generateId } from "@aces/utils";
import { useMediaQuery } from "@aces/hooks";
import {
  componentSpacing,
  containerPadding,
  palette,
  shape,
  spacing,
} from "@aces/theme";
import {
  Box,
  Card,
  Col,
  Container,
  FlexBox,
  H2,
  Image,
  Row,
  Text,
} from "@aces/ui";
import { PardotForm, PardotFormProps } from "@aces/features";

export interface CfFormProps extends CfBaseComponent {
  form: PardotFormProps;
  headline?: string;
  subhead?: string;
  media?: CfImageProps;
}

export const CfForm = ({
  internalTitle,
  form,
  headline,
  subhead,
  media,
  __typename,
  id,
  lang,
}: CfFormProps) => {
  const { isSmallerThanMd, isLargerThanMd } = useMediaQuery();

  return (
    <Box
      id={generateId(internalTitle)}
      data-component={__typename}
      style={{
        backgroundColor: palette.primary.main,
      }}
    >
      <Container nested={isSmallerThanMd}>
        <Row columnSpacing={35}>
          <Col
            size={{ xs: 12, md: 6 }}
            style={{
              position: "relative",
            }}
          >
            <Container nested={isLargerThanMd}>
              <FlexBox
                position="relative"
                marginBottom={{
                  xs: media
                    ? `calc(${media.image.height}px - ${media.image.height / 4}px)`
                    : "",
                  md: media ? `calc(${media.image.height}px - 100px)` : "",
                }}
                paddingTop={componentSpacing.lg}
                paddingRight={{ xs: 0, md: 8 }}
                style={{ zIndex: 2 }}
              >
                {headline && (
                  <H2
                    color={palette.primary.contrastText}
                    marginBottom={12}
                    {...ContentfulLivePreview.getProps({
                      entryId: id,
                      fieldId: "headline",
                      locale: lang,
                    })}
                  >
                    {headline}
                  </H2>
                )}
              </FlexBox>
              {media && (
                <Image
                  url={media.image.url}
                  alt={media.altText}
                  width={media.image.width}
                  height={media.image.height}
                  responsive={true}
                  style={{
                    paddingRight: isSmallerThanMd
                      ? containerPadding.xs * spacing
                      : 0,
                    paddingLeft: isSmallerThanMd
                      ? containerPadding.xs * spacing
                      : 0,
                    position: "absolute",
                    left: "50%",
                    right: 0,
                    bottom: 0,
                    objectFit: "cover",
                    maxWidth: isSmallerThanMd
                      ? media.image.width - 100
                      : media.image.width,
                    transform: "translateX(-50%)",
                  }}
                />
              )}
            </Container>
          </Col>

          <Col size={{ xs: 12, md: 6 }}>
            <Box
              paddingY={{ xs: 0, md: componentSpacing.lg }}
              style={{ height: "100%" }}
            >
              <Card borderRadius={isLargerThanMd ? shape.borderRadius : 0}>
                <FlexBox
                  width={"100%"}
                  flexDirection={{ xs: "column", md: "row" }}
                >
                  <Box
                    paddingY={{ xs: 12, md: 8 }}
                    paddingX={{ xs: 8, md: 6 }}
                    style={{ flex: 1 }}
                  >
                    {subhead && (
                      <Text
                        marginBottom={2}
                        {...ContentfulLivePreview.getProps({
                          entryId: id,
                          fieldId: "subhead",
                          locale: lang,
                        })}
                      >
                        {subhead}
                      </Text>
                    )}
                    <Box
                      {...ContentfulLivePreview.getProps({
                        entryId: id,
                        fieldId: "form",
                        locale: lang,
                      })}
                    >
                      {"pardotFormUrl" in form ? (
                        <PardotForm
                          internalTitle={form.internalTitle}
                          pardotFormUrl={form.pardotFormUrl}
                          height={{ xs: "740px", md: "740px" }}
                        />
                      ) : null}
                    </Box>
                  </Box>
                </FlexBox>
              </Card>
            </Box>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};
