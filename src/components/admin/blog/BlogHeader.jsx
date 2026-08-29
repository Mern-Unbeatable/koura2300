import {
  ADMIN_BLOG_ADD_BUTTON_CLASS,
  ADMIN_BLOG_HEADER_CLASS,
  ADMIN_BLOG_HEADER_TEXT_CLASS,
  ADMIN_BLOG_SUBTITLE_CLASS,
  ADMIN_BLOG_TITLE_CLASS,
} from './blogData';

const BlogHeader = ({ title, postsCountLabel, addButtonLabel, onAddBlog }) => (
  <header className={ADMIN_BLOG_HEADER_CLASS}>
    <div className={ADMIN_BLOG_HEADER_TEXT_CLASS}>
      <h1 className={ADMIN_BLOG_TITLE_CLASS}>{title}</h1>
      <p className={ADMIN_BLOG_SUBTITLE_CLASS}>{postsCountLabel}</p>
    </div>

    <button type="button" className={ADMIN_BLOG_ADD_BUTTON_CLASS} onClick={onAddBlog}>
      {addButtonLabel}
    </button>
  </header>
);

export default BlogHeader;
