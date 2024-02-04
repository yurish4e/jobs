import { ICategories, IPost, IPostPreview } from '@/types';
import { getCategories, getPostBySlug, getPosts } from '@/utils/wp-api';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
interface IPostProps {
    params: IPost;
}
export default async function CategoryPaget({ params }:IPostProps ) {
  const category = params?.slug as string;
  const posts: IPostPreview[] = await getPosts();
  const categories: ICategories[] = await getCategories();
  const idOfCategory = categories.find(el=>el.slug===category)?.databaseId;
  console.log(idOfCategory);

  const filteredPosts = posts.filter(post=>post.categories.nodes[0].databaseId===idOfCategory);
  return ( 
    <>
     <h2>Categories:</h2>
      <div className="filters">
        <Link href={`/blog`} className={`link`}>All</Link>
        {categories.filter(cat=>cat.count>0).map((cat) => (
          <Link href={`/categories/${cat.slug}`} className={`link ${cat.slug===category?'link-active':''}`} key={cat.databaseId}>
          {cat.name}: {cat.count}
        </Link>
        ))}
      </div>
      <h1>{category}</h1>
      <div className="posts">

      {filteredPosts.map((post) => (
          <div className="post" key={post.slug}>
            <img src={post?.featuredImage?.node.sourceUrl} alt="" />
            <Link className="post__link" href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </div>
        ))}
        </div>
    </>
  )
}
