import { test } from '../_fixtures/fixtures';
import { createNewArticle } from '../../src/ui/actions/auth/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test('Add the tag for the existing article without tags', async ({
  page,
  homePage,
  editArticlePage,
  viewArticlePage,
  articleWithoutTags,
  user,
}) => {
  const newTag = faker.lorem.word();

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithoutTags);

  await editArticlePage.open();
  await editArticlePage.editTagField(newTag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await viewArticlePage.assertArticleTagIsVisible(newTag);
});
