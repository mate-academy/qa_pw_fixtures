import { test, expect } from '../_fixtures/fixtures';

test.describe('Create Article', () => {
  test(
    'Create article without tags',
    async ({ createArticlePage, viewArticlePage, articleWithoutTags, logger }) => {
      logger.info(
        `Creating article without tags: ${articleWithoutTags.title}`
      );

      await createArticlePage.fillTitleField(articleWithoutTags.title);
      await createArticlePage.fillDescriptionField(
        articleWithoutTags.description
      );
      await createArticlePage.fillTextField(articleWithoutTags.body);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.assertArticleTitleIsVisible(
        articleWithoutTags.title
      );
      await viewArticlePage.assertArticleTextIsVisible(
        articleWithoutTags.body
      );
    }
  );

  test(
    'Create article with one tag',
    async ({ createArticlePage, viewArticlePage, articleWithOneTag, logger }) => {
      logger.info(
        `Creating article with one tag: ${articleWithOneTag.tags}`
      );

      await createArticlePage.fillTitleField(articleWithOneTag.title);
      await createArticlePage.fillDescriptionField(
        articleWithOneTag.description
      );
      await createArticlePage.fillTextField(articleWithOneTag.body);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.assertArticleTitleIsVisible(
        articleWithOneTag.title
      );
      await viewArticlePage.assertArticleTextIsVisible(
        articleWithOneTag.body
      );
    }
  );

  test(
    'Create article with two tags',
    async ({ createArticlePage, viewArticlePage, articleWithTwoTags, logger }) => {
      logger.info(
        `Creating article with two tags: ${articleWithTwoTags.tags.join(
          ', '
        )}`
      );

      await createArticlePage.fillTitleField(articleWithTwoTags.title);
      await createArticlePage.fillDescriptionField(
        articleWithTwoTags.description
      );
      await createArticlePage.fillTextField(articleWithTwoTags.body);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.assertArticleTitleIsVisible(
        articleWithTwoTags.title
      );
      await viewArticlePage.assertArticleTextIsVisible(
        articleWithTwoTags.body
      );
    }
  );
});
