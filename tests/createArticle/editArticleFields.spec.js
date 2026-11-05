import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';

test.describe('Edit article fields', () => {
  test.beforeEach(
    async ({
      page,
      user,
      articleWithoutTags,
      homePage,
      createArticlePage,
      viewArticlePage,
    }) => {
      await signUpUser(page, user);
      await createNewArticle(
        articleWithoutTags,
        homePage,
        createArticlePage,
        viewArticlePage,
      );
    },
  );

  test('Edit the article title for the existing article', async ({
    page,
    logger,
    viewArticlePage,
    createArticlePage,
  }) => {
    await editArticle(
      page,
      'title',
      viewArticlePage,
      createArticlePage,
      logger,
    );
  });

  test('Edit the article description for the existing article', async ({
    page,
    viewArticlePage,
    createArticlePage,
    logger,
  }) => {
    await editArticle(
      page,
      'description',
      viewArticlePage,
      createArticlePage,
      logger,
    );
  });

  test('Edit the article text for the existing article', async ({
    page,
    viewArticlePage,
    createArticlePage,
    logger,
  }) => {
    await editArticle(page, 'text', viewArticlePage, createArticlePage, logger);
  });
});
