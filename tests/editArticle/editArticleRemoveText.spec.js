import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { updateArticle } from '../../src/ui/actions/article/updateArticle';
import { TEXT_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let newArticle;

test.beforeEach(async ({ page, user, article, homePage }) => {
  newArticle = await article(5);

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, newArticle);
});

test('Update article required fields, remove text', async ({
  page,
  article,
  createArticlePage,
}) => {
  /*
    Edit the article title for the existing article
    Edit the article description for the existing article
    Edit the article text for the existing article
    Remove an article text for the existing article
  */

  newArticle = await article(0, 'text');
  await updateArticle(page, newArticle);

  await createArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});
