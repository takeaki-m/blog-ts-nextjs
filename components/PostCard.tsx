import Link from 'next/link';

// TODO imageが不要だから消す
const PostCard = ({ post }) => {
  return (
    <Link href={`post/${post.slug}`}>
      <div className="px-2 py-4 border rouded-lg">
        <h1 className="font-bold text-lg">{post.frontMatter.title}</h1>
        <span>{post.frontMatter.date}</span>
      </div>
    </Link>
  );
}

export default PostCard;

