import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

const newTag = faker.string.alpha(5);

test.beforeEach(async ({ user, articleWithoutTags, page, homePage }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithoutTags);
});

test('Add the tag to the article without tags', async ({
  viewArticlePage,
  createArticlePage,
  articleWithoutTags,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTagsField(newTag);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleContainsText(
    articleWithoutTags.title
  );
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTagsToContainText(newTag);
});

test.afterEach(async ({ page }) => {
  await page.close();
});