import ArticleCard from '../../home/ArticleCard';
import {
  ADMIN_BLOG_ACTIONS_CLASS,
  ADMIN_BLOG_DELETE_BUTTON_CLASS,
  ADMIN_BLOG_EDIT_BUTTON_CLASS,
} from './blogData';
import { formatArticleReadingMeta } from './blogUtils';

const BlogPostCard = ({ copy, post, onEditPost, onDeletePost }) => (
  <ArticleCard
    article={post}
    readingMeta={formatArticleReadingMeta(post.readTimeLabel, post.author)}
    testId={`blog-post-card-${post.id}`}
    actions={
      <div className={ADMIN_BLOG_ACTIONS_CLASS}>
        <button
          type="button"
          className={ADMIN_BLOG_EDIT_BUTTON_CLASS}
          aria-label={copy.editLabel(post.title)}
          onClick={() => onEditPost(post.id)}
        >
          {copy.edit}
        </button>
        <button
          type="button"
          className={ADMIN_BLOG_DELETE_BUTTON_CLASS}
          aria-label={copy.deleteLabel(post.title)}
          onClick={() => onDeletePost(post.id)}
        >
          {copy.delete}
        </button>
      </div>
    }
  />
);

export default BlogPostCard;
