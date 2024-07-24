import { apiClient } from "../shared";

export async function fetchFrontPage(path: String, version: String, productsPath: String = "/shop") {
    try {
        return await apiClient.catalogueApi(
            `
               #graphql
                query($path: String!, $version: VersionLabel, $productsPath: String!) {
                    catalogue(path: $path, language: "en", version: $version) {
                      meta: component(id: "meta") {
                        content {
                          ... on ContentChunkContent {
                            chunks {
                              id
                              content {
                                ... on SingleLineContent {
                                  text
                                }
                                ... on RichTextContent {
                                  plainText
                                }
                                ... on ImageContent {
                                  firstImage {
                                    variants {
                                      url
                                      key
                                      width
                                      height
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                      grid: component(id: "grid") {
                        content {
                          ... on GridRelationsContent {
                            grids {
                              rows {
                                columns {
                                  layout {
                                    rowspan
                                    colspan
                                  }
                                  item {
                                    name
                                    path
                                    summary: component(id: "summary") {
                                      content {
                                        ... on RichTextContent {
                                          json
                                        }
                                      }
                                    }
                                    topics {
                                      name
                                    }
                                    ... on Product {
                                      variants {
                                        images {
                                          variants {
                                            url
                                            key
                                            width
                                            height
                                          }
                                        }
                                        price
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    products: catalogue(path: $productsPath, language: "en") {
                      children {
                        id
                        topics {
                          name
                        }
                        bundle: component(id: "bundle") {
                          content {
                            ... on BooleanContent {
                              value
                            }
                          }
                        }
                        ... on Product {
                          __typename
                          name
                          path
                          topics {
                            name
                          }
                          defaultVariant {
                            firstImage {
                              variants {
                                url
                                key
                                width
                                height
                              }
                            }
                            priceVariant(identifier: "default") {
                              price
                              currency
                            }
                          }
                        }
                      }
                    }
                  }
                  
            `,
            {
                path,
                version,
                productsPath,
            }
        );
    } catch (error) {
        throw error;
    }
}
