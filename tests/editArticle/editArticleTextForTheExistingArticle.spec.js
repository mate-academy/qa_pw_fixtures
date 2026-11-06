import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

test.beforeEach(
  async ({ page, user, homePage, viewArticlePage, articleWithoutTags }) => {
    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithoutTags);
    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  },
);

test('Edit the article text for the existing article', async ({
  viewArticlePage,
  createArticlePage,
  articleWithoutTags,
  logger,
}) => {
  const newText = generateNewArticleData(logger).text;

  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.assertTextFieldHasValue(articleWithoutTags.text);
  await createArticlePage.fillTextField(newText);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.assertTextFieldHasValue(newText);
});
