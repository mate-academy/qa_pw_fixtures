import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/auth/createNewArticle';
import { editExistingArticleDescription } from '../../src/ui/actions/auth/editExistingArticle';


test.describe('Article Management', () => {
  let originalArticle;

  test.beforeEach(async ({ 
    page,
    user,
    articleWithoutTags,
    viewArticlePage
   }) => {
    originalArticle = articleWithoutTags;

    await signUpUser(page, user);

    await createNewArticle(page, originalArticle);
    await viewArticlePage.assertArticleTitleIsVisible(originalArticle.title);
  });

  test('Edit the description for the existing article', async ({ 
    page,
    articleWithOneTag,
  }) => {

    const newDescription = articleWithOneTag.description;
    await editExistingArticleDescription(page, newDescription);
  });
});
