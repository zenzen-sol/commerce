import seoFragment from '../fragments/seo';

const blogFragment = /* GraphQL */ `
  fragment blog on Blog {
    ... on Blog {
      id
      title
      handle
      articles(first: $articles) {
        edges {
          node {
            id
            title
            handle
            excerpt
            content
            contentHtml
            image {
              url
              altText
              width
              height
            }
            seo {
              ...seo
            }
            publishedAt
          }
        }
      }
      seo {
        ...seo
      }
    }
  }
  ${seoFragment}
`;

const articleFragment = /* GraphQL */ `
  fragment article on Article {
    ... on Article {
      id
      title
      handle
      excerpt
      content
      contentHtml
      image {
        url
        altText
        width
        height
      }
      seo {
        ...seo
      }
      publishedAt
    }
  }
  ${seoFragment}
`;

export const getBlogQuery = /* GraphQL */ `
  query getBlog($handle: String!, $articles: Int, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    blogByHandle(handle: $handle) {
      ...blog
    }
  }
  ${blogFragment}
`;

export const getBlogArticleQuery = /* GraphQL */ `
  query getBlogArticle(
    $handle: String!
    $articleHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    blogByHandle(handle: $handle) {
      articleByHandle(handle: $articleHandle) {
        ...article
      }
    }
  }
  ${articleFragment}
`;

export const getBlogsQuery = /* GraphQL */ `
  query getBlogs($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    blogs(first: 100) {
      edges {
        node {
          ...blog
        }
      }
    }
  }
  ${blogFragment}
`;
