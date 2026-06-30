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
  }) => {
    originalArticle = articleWithoutTags;

    await signUpUser(page, user);
    await createNewArticle(page, originalArticle);
    await viewArticlePage.assertArticleTitleIsVisible(originalArticle.title);
  });

  test('Edit the title for the existing article', async ({ 
    page,
    articleWithOneTag,
    viewArticlePage,
  }) => {

    const newTitle = articleWithOneTag.title;

    await editExistingArticleTitle(page, newTitle);
    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  });
});
