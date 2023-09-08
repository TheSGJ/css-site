import { formatShortenedTimeDistance } from "@/lib/utils";
import Link from "next/link";
import MarkDownView from "@/components/views/MarkDownView";

interface PostProps {
  post: any;
  currentPage?: number;
}

function Post({ post, currentPage }: PostProps) {
  return (
    <Link
      key={post.id}
      href={`/newsletter/${post.id}${currentPage ? `?page=${currentPage}` : ""}`}
      className="flex flex-col gap-2 p-6 w-full bg-card hover:bg-gray-200 dark:hover:bg-card/50 text-card-foreground rounded-md transition-colors duration-300 border border-border">
      <div>
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <span className="text-sm font-medium text-muted-foreground mb-2">
          {post.author?.name ?? "CSS Team"} ● {formatShortenedTimeDistance(post.createdAt)}
        </span>
      </div>
      <MarkDownView
        className="prose dark:prose-invert max-w-none w-full break-words"
        markdown={post.content}
      />
    </Link>
  );
}

export default Post;
