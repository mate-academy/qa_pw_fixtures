import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article description for the existing article', async ({
  viewArticlePage,
  createArticlePage,
  userProfilePage,
  articleWithoutTags,
}) => {
  const updatedDescription = faker.lorem.sentence();

  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.fillDescriptionField(updatedDescription);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.waitFor();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.clickUserProfileButton();

  await userProfilePage.assertArticleDescriptionContainsText(
    updatedDescription,
  );
});
