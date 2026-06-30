import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/auth/createNewArticle';
import { editExistingArticleText } from '../../src/ui/actions/auth/editExistingArticle';

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

  test('Edit the text for the existing article', async ({ 
    page,
    articleWithOneTag,
    viewArticlePage,
  }) => {

    const newText = articleWithOneTag.text; 
    await editExistingArticleText(page, newText);
    await viewArticlePage.assertArticleTextIsVisible(newText);
  });
});
