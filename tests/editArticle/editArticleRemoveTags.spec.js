import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { updateArticle } from '../../src/ui/actions/article/updateArticle';

let newArticle;

test.beforeEach(async ({ page, user, article, homePage }) => {
  newArticle = article(1);

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, newArticle);
});

test('Update article required fields, remove tags', async ({
  page,
  profilePage,
  article,
  user,
}) => {
  /*
    Edit the article title for the existing article
    Edit the article description for the existing article
    Edit the article text for the existing article
    Add the tag for the existing article without tags
  */

  newArticle = await article(0);
  await updateArticle(page, newArticle, 0);

  await profilePage.open(user.username);
  await profilePage.assertArticleTitleContainsText(newArticle.title);
  await profilePage.assertArticleDescriptionContainsText(
    newArticle.description,
  );
  await profilePage.assertTagsAreVisible(newArticle.tags);
});
