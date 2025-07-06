import { test } from '../_fixtures/fixtures';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test('Create an article with required fields (fixture-based)', async ({
  createArticlePage,
  viewArticlePage,
  homePage,
  user,
  logger,
  page,
}) => {
  const article = generateNewArticleData(logger, 1);

  await signUpUser(page, user);

  // Act
  await homePage.clickNewArticleLink();
  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillBodyField(article.text);
  await createArticlePage.clickPublishArticleButton();

  // Assert
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});