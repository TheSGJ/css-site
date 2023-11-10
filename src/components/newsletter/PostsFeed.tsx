import { prisma } from "@/lib/db";
import PostCard from "@/components/newsletter/newsletter-post/PostCard";
import PaginationButtons from "../ui/pagination-buttons";

interface PostsFeedProps {
  currentPage: number;
}

export default async function PostsFeed({ currentPage }: PostsFeedProps) {
  const postsPerPage = 5;
  const totalPages = Math.ceil((await prisma.post.count()) / postsPerPage);
  const posts = await prisma.post.findMany({
    skip: (currentPage - 1) * postsPerPage,
    take: postsPerPage,
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentPage={currentPage} />
      ))}
      <PaginationButtons href={"/newsletter"} currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
