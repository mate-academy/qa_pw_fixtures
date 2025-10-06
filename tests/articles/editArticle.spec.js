import { test } from '../_fixtures/fixtures';

test.describe('Edit Article', () => {
  test(
    'Article fields are visible and correct in edit view',
    async ({ editArticlePage, articleWithoutTags, logger }) => {
      logger.info(
        `Checking article in edit mode: ${articleWithoutTags.title}`
      );

      await editArticlePage.assertArticleTitle(articleWithoutTags.title);
      await editArticlePage.assertArticleText(articleWithoutTags.body);
    }
  );
});
