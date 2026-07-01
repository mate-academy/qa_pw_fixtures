import { test } from '../_fixtures/fixtures'
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/auth/createNewArticle';
import { editExistingArticleTitle } from '../../src/ui/actions/auth/editExistingArticle';

test.describe('Article Management', () => {
  let originalArticle;

  test.beforeEach(async ({ 
    page,
    user,
    articleWithoutTags,
    viewArticlePage,
    createArticlePage,
    homePage,
  }) => {
    originalArticle = articleWithoutTags;

    await signUpUser(page, user);
    await homePage.clickNewArticleLink();
    await createNewArticle(createArticlePage, originalArticle);
    await viewArticlePage.assertArticleTitleIsVisible(originalArticle.title);
  });

  test('Edit the title for the existing article', async ({ 
    articleWithOneTag,
    viewArticlePage,
    createArticlePage,
  }) => {

    const newTitle = articleWithOneTag.title;

    await editExistingArticleTitle(
      viewArticlePage, createArticlePage, newTitle
    );
    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  });
});
