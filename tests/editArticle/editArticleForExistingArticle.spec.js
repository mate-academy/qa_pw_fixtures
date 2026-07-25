import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';

let profilePage;

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  profilePage = new ProfilePage(page);
});

test('Edit the article title for the existing article', async ({
  page,
  homePage,
  createArticlePage,
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  const newTitle = faker.lorem.words();

  await homePage.clickNewArticleLink();
  await createNewArticle(
    createArticlePage,
    viewArticlePage,
    articleWithoutTags,
  );

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTitleField(newTitle);

  await page.waitForTimeout(2000); // workaround for the issue with the button not being clickable

  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});

test('Edit the article description for the existing article', async ({
  homePage,
  createArticlePage,
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  const newDescription = 'Updated description';

  await homePage.clickNewArticleLink();
  await createNewArticle(
    createArticlePage,
    viewArticlePage,
    articleWithoutTags,
  );

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillDescriptionField(newDescription);
  await editArticlePage.clickUpdateArticleButton();
  await homePage.clickProfileLink();

  await profilePage.assertArticleDescriptionIsVisible(newDescription);
});

test('Edit the article text for the existing article', async ({
  homePage,
  createArticlePage,
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  const newText = 'Updated text';

  await homePage.clickNewArticleLink();
  await createNewArticle(
    createArticlePage,
    viewArticlePage,
    articleWithoutTags,
  );

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTextField(newText);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTextIsVisible(newText);
});
