import { test } from '../_fixtures/fixtures';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../src/ui/pages/HomePage';

let tagRemoved;
let tagLeft;

test.beforeEach(async ({ page, articleWithTwoTags, user, homePage }) => {
  tagRemoved = articleWithTwoTags.tags[0];
  tagLeft = articleWithTwoTags.tags[1];
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithTwoTags);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Remove the tag for the existing article with tags', async ({viewArticlePage, createArticlePage, articleWithTwoTags}) => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.removeTagFromTagList(tagRemoved);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleContainsText(articleWithTwoTags.title);
  await viewArticlePage.reload()
  await viewArticlePage.assertArticleTagsToContainText(tagLeft);
  await viewArticlePage.assertArticleTagsNotToContainText(tagRemoved);
});
