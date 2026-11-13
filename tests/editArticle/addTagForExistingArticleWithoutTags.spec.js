import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { test } from '../_fixtures/fixtures';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Add the tag for the existing article without tags', async ({
  articleWithoutTags,
  editArticlePage,
  viewArticlePage,
}) => {
  const tag = faker.lorem.words();

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTagsField(tag);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.waitFor();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleTagListIsVisible(tag);
});
