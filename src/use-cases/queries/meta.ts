import { apiClient } from "../shared";

export async function fetchMeta(path: String) {
    try {
        return await apiClient.catalogueApi(
            `
            #graphql
            query Meta($path: String!, $version: VersionLabel) {
              meta: catalogue(path: $path, language: "en", version: $version) {
                meta: component(id: "meta") {
                  content {
                    ... on ContentChunkContent {
                      chunks {
                        id
                        content {
                          ... on SingleLineContent {
                            text
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
              }
            }
            
          `,
            { path }
        );
    } catch (error) {
        throw error;
    }
}
