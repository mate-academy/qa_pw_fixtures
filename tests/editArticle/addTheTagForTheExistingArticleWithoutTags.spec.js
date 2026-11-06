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

test('Add the tag for the existing article without tags', async ({
  viewArticlePage,
  createArticlePage,
  logger,
}) => {
  await viewArticlePage.clickEditArticleLink();
  const newTags = generateNewArticleData(logger, 3).tags;
  for (const tag of newTags) {
    await createArticlePage.fillTagsField(tag);
  }
  await createArticlePage.clickUpdateArticleButton();
  // Bug: the article page does not show the tags until it is reloaded
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTagsAreVisible(newTags);
});
