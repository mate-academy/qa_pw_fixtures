import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Edit article description for existing article', async ({
  user,
  viewArticlePage,
  editArticlePage,
  profilePage,
}) => {
  const description = faker.lorem.sentence(4);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.editDescriptionField(description);
  await editArticlePage.clickUpdateArticleButton();
  await profilePage.openProfilePage(user.username);
  await profilePage.assertArticleDescriptionIsVisible(description);
});
