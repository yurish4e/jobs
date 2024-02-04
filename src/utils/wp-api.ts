import { ICategories, IPost, IPostPreview } from "@/types";

async function fetchData(query: string) {
    const headers = { 'Content-Type': 'application/json' };
  
    const res = await fetch('http://next.next/graphql', {
      headers,
      method: 'POST',
      body: JSON.stringify({
        query,
      }),
    });
    const json = await res.json();
    
    return json.data;
  }
  
  export async function getPosts() {
    const data = await fetchData(`
      query getPosts{
        posts {
          nodes {
            slug
            title
            excerpt
            aaaSalary
            aaaLocation
            categories {
              nodes {
                databaseId
              }
            }
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      } 	
    `);
    return data.posts.nodes as IPostPreview[];
  }

  export async function getCategories() {
    const data = await fetchData(`
    query getCategories {
      categories {
        nodes {
          databaseId
          name
          count
          slug
        }
      }
    }
    `);
    return data.categories.nodes as ICategories[];
  }

  export async function getPostBySlug(slug: string) {
    const data = await fetchData(`
    query getPostBySlug {
      post(id: "${slug}", idType: SLUG) {
        title
        content
        excerpt
        slug
        aaaSalary
        aaaLocation
        author {
          node {
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        date 
      }
    }
  `);
    return data.post as IPost;
  } 