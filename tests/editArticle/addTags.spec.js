import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { test } from '../_fixtures/fixtures';

test.beforeEach(async ({ user, page, homePage }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
});

test.describe('Add the tag for the existing article', () => {
  test('Add the tag for the existing article without tags', async ({
    createArticlePage,
    editArticlePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await createNewArticle({
      article: articleWithoutTags,
      createArticlePage,
      viewArticlePage,
    });
    await editArticlePage.clickEditArticle();
    await editArticlePage.editArticleField('tagsField', 'new');
    await viewArticlePage.assertTagsAreVisible(['new']);
  });

  test('Add the tag for the existing article with tags', async ({
    createArticlePage,
    editArticlePage,
    viewArticlePage,
    articleWithTwoTags,
  }) => {
    await createNewArticle({
      article: articleWithTwoTags,
      createArticlePage,
      viewArticlePage,
    });
    await editArticlePage.clickEditArticle();
    await editArticlePage.editArticleField('tagsField', 'new');
    await viewArticlePage.assertTagsAreVisible([
      ...articleWithTwoTags.tags,
      'new',
    ]);
  });
});
