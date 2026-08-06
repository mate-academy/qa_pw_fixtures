import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Add article tag for article without tags', async ({
  viewArticlePage,
  editArticlePage,
}) => {
  const tag = faker.lorem.word();

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.addTags(tag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTagIsVisible(tag);
});
