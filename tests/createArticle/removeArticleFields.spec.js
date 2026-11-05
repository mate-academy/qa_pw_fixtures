import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { removeArticleField } from '../../src/ui/actions/article/removeArticleField';

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

  test('Remove an article title for the existing article', async ({
    viewArticlePage,
    createArticlePage,
  }) => {
    await removeArticleField('title', viewArticlePage, createArticlePage);
  });

  test('Remove an article description for the existing article', async ({
    viewArticlePage,
    createArticlePage,
  }) => {
    await removeArticleField('description', viewArticlePage, createArticlePage);
  });

  test('Remove the article text for the existing article', async ({
    viewArticlePage,
    createArticlePage,
  }) => {
    await removeArticleField('text', viewArticlePage, createArticlePage);
  });
});
