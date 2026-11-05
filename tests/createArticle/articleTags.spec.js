import { test } from '../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.describe('Article tags', () => {
  test.beforeEach(async ({ page, logger, user }) => {
    await signUpUser(page, user, logger);
  });
  test('Add tag to existing article without tags', async ({
    page,
    logger,
    editArticlePage,
    createArticlePage,
    articleWithoutTags,
    homePage,
    viewArticlePage,
  }) => {
    const newTags = generateNewArticleData(logger, 3).tags;
    await createNewArticle(
      articleWithoutTags,
      homePage,
      createArticlePage,
      viewArticlePage,
    );

    await editArticlePage.clickEditArticleButton();

    for (const tag of newTags) {
      await createArticlePage.fillTagField(tag);
    }
    await createArticlePage.clickUpdateArticleButton();
    await expect(page).toHaveURL(/article/);
    await page.reload();

    await editArticlePage.assertTagsVisible([
      ...articleWithoutTags.tags,
      ...newTags,
    ]);
  });

  test('Add tag to existing article with tags', async ({
    page,
    logger,
    articleWithOneTag,
    editArticlePage,
    createArticlePage,
    homePage,
    viewArticlePage,
  }) => {
    const newTags = generateNewArticleData(logger, 3).tags;
    await createNewArticle(
      articleWithOneTag,
      homePage,
      createArticlePage,
      viewArticlePage,
    );

    await editArticlePage.clickEditArticleButton();

    for (const tag of newTags) {
      await createArticlePage.fillTagField(tag);
    }
    await createArticlePage.clickUpdateArticleButton();
    await expect(page).toHaveURL(/article/);
    await page.reload();

    await editArticlePage.assertTagsVisible([
      ...articleWithOneTag.tags,
      ...newTags,
    ]);
  });
});
