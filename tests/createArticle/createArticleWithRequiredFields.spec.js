import { test } from '../_fixtures/fixtures';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

let createArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page, user, logger }) => {
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(logger);

  await signUpUser(page, user);
});

test('Creat an article with required fields', async ({ homePage }) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleToContainText(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});
