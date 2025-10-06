import { test } from '../_fixtures/fixtures';

test.describe('View Article', () => {
  test(
    'Published article displays correct content',
    async ({ viewArticlePage, articleWithOneTag, logger }) => {
      logger.info(`Viewing article: ${articleWithOneTag.title}`);

      await viewArticlePage.assertArticleTitleIsVisible(
        articleWithOneTag.title
      );
      await viewArticlePage.assertArticleTextIsVisible(
        articleWithOneTag.body
      );
    }
  );
});
