import { test } from '../_fixtures/fixtures';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

// let article;

test.beforeEach(async ({ page, user }) => {
  // article = generateNewArticleData(logger);

  await signUpUser(page, user);
});

test('Creat an article with required fields', async ({ 
  createArticlePage,
  viewArticlePage,
  articleWithoutTags,
  homePage,
}) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(articleWithoutTags.title);
  await createArticlePage.fillDescriptionField(articleWithoutTags.description);
  await createArticlePage.fillTextField(articleWithoutTags.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});
