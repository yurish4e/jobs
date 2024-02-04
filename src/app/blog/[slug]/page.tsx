import { IPost } from '@/types';
import { getPostBySlug } from '@/utils/wp-api';
import Link from 'next/link';
import React from 'react';
interface IPostProps {
  params: IPost;
}
export default async function BlogPost({ params }: IPostProps) {
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);
  return (
    <>
      {post && (
        <article className="article">
          <Link href='/blog'>	&larr; Back</Link>
          <h1>{post.title}</h1>
          <div className="post__bar post__bar-open">
            <span>Город: {post?.aaaLocation}</span>
            <span>Зарплата: ${post?.aaaSalary}</span>
            <span>Компания: <Link href={`/companies/${post.author.node.slug}`}>{post.author.node.slug}</Link></span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      )}
    </>
  );
}
