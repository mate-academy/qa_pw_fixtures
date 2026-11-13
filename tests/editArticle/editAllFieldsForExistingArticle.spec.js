import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit all fields for the existing article without tags', async ({
  viewArticlePage,
  editArticlePage,
  userProfilePage,
}) => {
  const updatedText = faker.lorem.sentences();
  const updatedTitle = faker.lorem.word();
  const updatedDescription = faker.lorem.sentence();
  const tag = faker.lorem.word();

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTextField(updatedText);
  await editArticlePage.fillTitleField(updatedTitle);
  await editArticlePage.fillDescriptionField(updatedDescription);
  await editArticlePage.fillTagsField(tag);

  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.waitFor();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTextIsVisible(updatedText);
  await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
  await viewArticlePage.assertArticleTagListIsVisible(tag);
  await viewArticlePage.clickUserProfileButton();

  await userProfilePage.assertArticleDescriptionContainsText(
    updatedDescription,
  );
});
