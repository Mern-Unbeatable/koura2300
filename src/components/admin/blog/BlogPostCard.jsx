import {
  ADMIN_BLOG_ACTIONS_CLASS,
  ADMIN_BLOG_CARD_BODY_CLASS,
  ADMIN_BLOG_CARD_CLASS,
  ADMIN_BLOG_CARD_COPY_CLASS,
  ADMIN_BLOG_CARD_EXCERPT_CLASS,
  ADMIN_BLOG_CARD_TITLE_CLASS,
  ADMIN_BLOG_DELETE_BUTTON_CLASS,
  ADMIN_BLOG_EDIT_BUTTON_CLASS,
  ADMIN_BLOG_META_CLASS,
  ADMIN_BLOG_META_DIVIDER_CLASS,
  ADMIN_BLOG_THUMB_CLASS,
  ADMIN_BLOG_THUMB_HEIGHT_PX,
  ADMIN_BLOG_THUMB_WIDTH_PX,
} from './blogData';

const BlogPostCard = ({ copy, post, onEditPost, onDeletePost }) => (
  <article
    data-testid={`blog-post-card-${post.id}`}
    className={ADMIN_BLOG_CARD_CLASS}
  >
    <img
      src={post.image}
      alt={post.imageAlt}
      width={ADMIN_BLOG_THUMB_WIDTH_PX}
      height={ADMIN_BLOG_THUMB_HEIGHT_PX}
      className={ADMIN_BLOG_THUMB_CLASS}
    />

    <div className={ADMIN_BLOG_CARD_BODY_CLASS}>
      <div className={ADMIN_BLOG_CARD_COPY_CLASS}>
        <h2 className={ADMIN_BLOG_CARD_TITLE_CLASS}>{post.title}</h2>
        <p className={ADMIN_BLOG_CARD_EXCERPT_CLASS}>{post.excerpt}</p>
      </div>

      <div className={ADMIN_BLOG_META_CLASS}>
        <span>{post.readTimeLabel}</span>
        <span className={ADMIN_BLOG_META_DIVIDER_CLASS} aria-hidden="true" />
        <span>{post.author}</span>
      </div>

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
    </div>
  </article>
);

export default BlogPostCard;
