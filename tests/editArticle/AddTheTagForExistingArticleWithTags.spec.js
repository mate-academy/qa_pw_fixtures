import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

const newTag = faker.string.alpha(5);

test.beforeEach(async ({ homePage, user, articleWithTwoTags, page }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithTwoTags);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Add the tag to the article with tags', async ({createArticlePage, viewArticlePage, articleWithTwoTags}) => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTagsField(newTag);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleToContainText(articleWithTwoTags.title);
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTagsToContainText(newTag);

  for (const tag of articleWithTwoTags.tags) {
    await viewArticlePage.assertArticleTagsToContainText(tag);
  }
});
