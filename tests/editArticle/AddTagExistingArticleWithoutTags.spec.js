import { test } from '../_fixtures/fixtures';

import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

import { createNewArticle } from '../../src/ui/actions/auth/article/createNewArticle';

test.beforeEach(
  async ({ page, homePage, viewArticlePage, logger, articleWithoutTags }) => {
    const user = generateNewUserData(logger);

    await signUpUser(page, user);

    await homePage.clickNewArticleLink();

    await createNewArticle(page, articleWithoutTags);

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);

    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  },
);

test('Added the article tags', async ({ viewArticlePage, editArticlePage }) => {
  await editArticlePage.addTagExistingArticleWithoutTags();

  await viewArticlePage.assertArticleTagIsVisible();
});
