import { test} from '../_fixtures/fixtures';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { faker } from '@faker-js/faker';

const newText = faker.lorem.sentence();

test.beforeEach(async ({ page, homePage, articleWithoutTags, user }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article text for the existing article', async ({ viewArticlePage, createArticlePage, articleWithoutTags}) => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTextField(newText);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleContainsText(articleWithoutTags.title);
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTextIsVisible(newText);
});

test.afterEach(async ({ page }) => {
  await page.close();
});