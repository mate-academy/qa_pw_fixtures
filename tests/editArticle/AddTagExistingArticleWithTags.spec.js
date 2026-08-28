import { test } from '../_fixtures/fixtures';

import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

import { createNewArticle } from '../../src/ui/actions/auth/article/createNewArticle';

test.beforeEach(
  async ({ page, viewArticlePage, homePage, logger, articleWithTwoTags }) => {
    const user = generateNewUserData(logger);

    await signUpUser(page, user);

    await homePage.clickNewArticleLink();

    await createNewArticle(page, articleWithTwoTags);

    await viewArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);

    await viewArticlePage.assertArticleTextIsVisible(articleWithTwoTags.text);
  },
);

test('Add the tag for the existing article with tags', async ({
  createArticlePage,
  viewArticlePage,
}) => {
  await createArticlePage.addTagExistingArticleWithoutTags();

  await viewArticlePage.assertArticleTagIsVisible();
});
