import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/auth/createNewArticle';
import { editExistingArticleDescription } from '../../src/ui/actions/auth/editExistingArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

// let user;

test.describe('Article Management', () => {
  let originalArticle;

  test.beforeEach(async ({ 
    page,
    user,
    articleWithoutTags,
   }) => {
    originalArticle = articleWithoutTags;
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);

    await createNewArticle(page, originalArticle);
    await viewArticlePage.assertArticleTitleIsVisible(originalArticle.title);
  });

  test('Edit the description for the existing article', async ({ 
    page,
    articleWithOneTag,
  }) => {
    // const profilePage = new ProfilePage(page);

    const newDescription = articleWithOneTag.description;
    await editExistingArticleDescription(page, newDescription);

    // await profilePage.clickProfileLink(user.username);
    // await profilePage.assertArticleDescriptionIsVisible(newDescription);
  });
});
