import React from "react";

import { defaultLocale, getLocale, Locale } from "@aces/i18n";
import { RouteDirectory } from "@aces/types";
import { palette, typography } from "@aces/theme";
import { Box, Breadcrumbs, Container, InlineBox, Link } from "@aces/ui";

const buildBreadcrumbs = (pageData: any) => {
  const breadcrumbs: Array<{ title: string; slug: string; url: string }> = [];

  const parentPages: Array<{ title: string; slug: string }> = [];
  let currentParent = pageData.parentPage;

  while (currentParent) {
    parentPages.unshift({
      title: currentParent.title,
      slug: currentParent.slug,
    });
    currentParent = currentParent.parentPage;
  }

  let currentPath = "";

  for (const parent of parentPages) {
    currentPath += `/${parent.slug}`;
    breadcrumbs.push({
      title: parent.title,
      slug: parent.slug,
      url: currentPath,
    });
  }

  currentPath += `/${pageData.slug}`;
  breadcrumbs.push({
    title: pageData.title,
    slug: pageData.slug,
    url: currentPath,
  });

  return breadcrumbs;
};

interface PageBreadcrumb {
  children: React.ReactNode;
  disable?: boolean;
}

const PageBreadcrumb = ({ children, disable }: PageBreadcrumb) => {
  return (
    <InlineBox
      style={{
        fontSize: typography.caption2.fontSize,
        color: disable ? palette.grey[500] : palette.primary.main,
        pointerEvents: disable ? "none" : "cursor",
        "& a": {
          textDecoration: disable ? "none" : "underline",
        },
      }}
    >
      {children}
    </InlineBox>
  );
};

export interface PageBreadcrumbsProps {
  showHome?: boolean;
  lang: Locale;
  pageResponse?: any;
}

export const PagesBreadcrumbs = async ({
  showHome = true,
  lang = defaultLocale,
  pageResponse,
}: PageBreadcrumbsProps) => {
  const t = await getLocale(lang, "common");

  if (!pageResponse) {
    return (
      <Breadcrumbs>
        {showHome && (
          <PageBreadcrumb>
            <Link href={RouteDirectory.Homepage}>{t.breadcrumbs.home}</Link>
          </PageBreadcrumb>
        )}
        <PageBreadcrumb disable>
          <Link href={RouteDirectory.Articles} aria-current="page">
            {t.breadcrumbs.articles}
          </Link>
        </PageBreadcrumb>
      </Breadcrumbs>
    );
  }

  const breadcrumbs = buildBreadcrumbs(pageResponse);

  return (
    <Container>
      <Box marginY={8}>
        <Breadcrumbs>
          {showHome && (
            <PageBreadcrumb>
              <Link href={RouteDirectory.Homepage}>{t.breadcrumbs.home}</Link>
            </PageBreadcrumb>
          )}
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <PageBreadcrumb key={breadcrumb.slug} disable={isLast}>
                <Link
                  href={breadcrumb.url}
                  aria-current={isLast ? "page" : undefined}
                >
                  {breadcrumb.title}
                </Link>
              </PageBreadcrumb>
            );
          })}
        </Breadcrumbs>
      </Box>
    </Container>
  );
};

export const ArticlesPageBreadcrumbs = async ({
  showHome = true,
  lang = defaultLocale,
}: PageBreadcrumbsProps) => {
  const t = await getLocale(lang, "common");

  return (
    <Breadcrumbs>
      {showHome && (
        <PageBreadcrumb>
          <Link href={RouteDirectory.Homepage}>{t.breadcrumbs.home}</Link>
        </PageBreadcrumb>
      )}
      <PageBreadcrumb disable>
        <Link href={RouteDirectory.Articles} aria-current="page">
          {t.breadcrumbs.articles}
        </Link>
      </PageBreadcrumb>
    </Breadcrumbs>
  );
};

interface ArticlePageBreadcrumbsProps extends PageBreadcrumbsProps {
  article: {
    slug: string;
    title: string;
  };
}

export const ArticlePageBreadcrumbs = async ({
  article,
  showHome = true,
  lang = defaultLocale,
}: ArticlePageBreadcrumbsProps) => {
  const t = await getLocale(lang, "common");

  return (
    <Breadcrumbs marginY={7}>
      {showHome && (
        <PageBreadcrumb>
          <Link href={RouteDirectory.Homepage}>{t.breadcrumbs.home}</Link>
        </PageBreadcrumb>
      )}
      <PageBreadcrumb>
        <Link href={RouteDirectory.Articles} aria-current="page">
          {t.breadcrumbs.articles}
        </Link>
      </PageBreadcrumb>
      <PageBreadcrumb disable>
        <Link href={`${RouteDirectory.Articles}/${article.slug}`}>
          {article.title}
        </Link>
      </PageBreadcrumb>
    </Breadcrumbs>
  );
};

export const SearchPageBreadcrumbs = async ({
  showHome = true,
  lang = defaultLocale,
}: PageBreadcrumbsProps) => {
  const t = await getLocale(lang, "common");

  return (
    <Breadcrumbs>
      {showHome && (
        <PageBreadcrumb>
          <Link href={RouteDirectory.Homepage}>{t.breadcrumbs.home}</Link>
        </PageBreadcrumb>
      )}
      <PageBreadcrumb disable>
        <Link href={RouteDirectory.Search} aria-current="page">
          {t.breadcrumbs.search}
        </Link>
      </PageBreadcrumb>
    </Breadcrumbs>
  );
};
