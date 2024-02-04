import { ICategories, IPostPreview } from '@/types';
import { getCategories, getPosts } from '@/utils/wp-api';
import Link from 'next/link';
import React from 'react';
// опишем явно какие пропсы ожидаем в Home
interface IHomeProps {
  posts: IPostPreview[];
}

export default async function BlogList() {
  const posts: IPostPreview[] = await getPosts();
  const categories: ICategories[] = await getCategories();
  // const categories = posts.map(post=>post.categories[0])
  console.log(posts[0]);
  return (
    <main> 
      <h2>Categories:</h2>
      <div className="filters">
      <Link href={`/blog`} className={`link link-active`}>All</Link>
        {categories.filter(cat=>cat.count>0).map((category) => (
          <Link href={`/categories/${category.slug}`} className="link" key={category.databaseId}>
            {category.name}: {category.count}
          </Link>
        ))}
      </div>  
      <h1>All</h1>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.slug}>
            <img src={post?.featuredImage?.node.sourceUrl} alt="" />
            <Link className="post__link" href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
            <div className="post__bar">
              <span>{post?.aaaLocation}</span>
              <span>${post?.aaaSalary}</span>
            </div>
            <div dangerouslySetInnerHTML={{__html: post?.excerpt}} />
            <Link className="post__link-bot" href={`/blog/${post.slug}`}>
              Read more
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
