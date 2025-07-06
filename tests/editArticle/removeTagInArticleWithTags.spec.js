import { expect } from '@playwright/test';
import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

test('Remove an article tag for the existing article with tag', 
  async ({ page, logger, user, editArticlePage }) => {

  const article = generateNewArticleData(logger, 1); // with 1 tag
  const initialTag = article.tags[0];

  // Sign up and create article
  await signUpUser(page, user);
  const articleSlug = await createNewArticle(page, article);

  // Open the edit page and remove the tag
  await editArticlePage.open(articleSlug);

  // eslint-disable-next-line max-len
  const tagToRemove = page.locator(`.tag-list .tag-default:has-text("${initialTag}")`);
  const removeButton = tagToRemove.locator('xpath=..//i'); 
  await removeButton.click();
  await editArticlePage.clickUpdateArticleButton();

  // Assert the tag is no longer visible
  await expect(page.locator('ul.tag-list')).not.toContainText(initialTag);
});
