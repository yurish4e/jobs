interface INode {
  databaseId: string;
}
export interface IPostPreview {
    slug: string;
    title: string;
    excerpt: string;
    aaaSalary: string;
    aaaLocation: string;
    categories: {
      nodes: INode[]; 
    }
    author: {
      node: {
        slug:string;
      }
    }
    featuredImage: {
      node: {
        sourceUrl: string;
      }
    }
    date: string;
  }
  
  export interface IPost extends IPostPreview {
    content: string;
  }

  export interface ICategories {
    databaseId: string,
    name: string,
    count: number,
    slug: string
  }