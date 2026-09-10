import styles from '@src/pages/articles/styles/article.module.scss';

function ArticleAnimation({ src, poster, alt, title, width, height }) {
  return (
    <figure className={styles.articleFigure}>
      <video src={src} poster={poster} aria-label={alt} width={width} height={height} controls muted loop playsInline preload="none" />
      {title && <figcaption>{title}</figcaption>}
    </figure>
  );
}

export default ArticleAnimation;
