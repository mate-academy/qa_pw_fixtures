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

test('Edit the article title for the existing article', async ({
  viewArticlePage,
  createArticlePage,
  articleWithoutTags,
  logger,
}) => {
  const newTitle = generateNewArticleData(logger).title;

  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.assertTitleFieldHasValue(articleWithoutTags.title);
  await createArticlePage.fillTitleField(newTitle);
  await createArticlePage.clickUpdateArticleButton();
  // Bug: the article page shows the old title until it is reloaded
  await viewArticlePage.reload();

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});
