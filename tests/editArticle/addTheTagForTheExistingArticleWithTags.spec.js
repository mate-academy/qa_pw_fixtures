import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

test.beforeEach(
  async ({ page, user, homePage, viewArticlePage, articleWithTwoTags }) => {
    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithTwoTags);
    await viewArticlePage.assertArticleTagsAreVisible(articleWithTwoTags.tags);
  },
);

test('Add the tag for the existing article with tags', async ({
  viewArticlePage,
  createArticlePage,
  articleWithTwoTags,
  logger,
}) => {
  await viewArticlePage.clickEditArticleLink();
  const newTags = generateNewArticleData(logger, 1).tags;
  for (const tag of newTags) {
    await createArticlePage.fillTagsField(tag);
  }
  await createArticlePage.clickUpdateArticleButton();
  // Bug: the article page does not show the tags until it is reloaded
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTagsAreVisible([
    ...articleWithTwoTags.tags,
    ...newTags,
  ]);
});
