import { test } from '../_fixtures/fixtures';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/auth/article/createNewArticle';

let article;

test.beforeEach(async ({ page, homePage, viewArticlePage, logger }) => {
  article = generateNewArticleData(logger);
  // article.tags = ['playwright', 'testing'];

  const user = generateNewUserData(logger);

  await signUpUser(page, user);
  await homePage.clickNewArticleLink(logger);

  await createNewArticle(page, article);

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});

test('Added the article tags', async ({ viewArticlePage, editArticlePage }) => {
  await editArticlePage.addTagExistingArticleWithoutTags();

  await viewArticlePage.assertArticleTagIsVisible();
});
