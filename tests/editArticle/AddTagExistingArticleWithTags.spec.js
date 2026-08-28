import { test } from '../_fixtures/fixtures';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/auth/article/createNewArticle';

let article;

test.beforeEach(async ({ page, viewArticlePage, homePage, logger }) => {
  article = generateNewArticleData(logger);

  article.tags = ['playwright', 'testing'];

  const user = generateNewUserData(logger);

  await signUpUser(page, user);

  await homePage.clickNewArticleLink(logger);

  await createNewArticle(page, article);

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});

test('Add the tag for the existing article with tags', async ({
  page,
  createArticlePage,
  viewArticlePage,
}) => {
  await createArticlePage.addTagExistingArticleWithoutTags();
  await viewArticlePage.assertArticleTagIsVisible();
});
