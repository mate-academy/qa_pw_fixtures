import { test } from '../_fixtures/fixtures';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(
  async ({ page, viewArticlePage, articleWithoutTags, logger }) => {
    const user = generateNewUserData(logger);

    await signUpUser(page, user);
    await createNewArticle(page, articleWithoutTags);
    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  },
);

test('Add tag for existing article without tags', async ({
  page,
  viewArticlePage,
  editArticlePage,
  articleWithOneTag,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.addArticleTagsField(articleWithOneTag.tags[0]);
  //Using articleWithoutTags in beforeEach is required
  //to create an article with 0 tags.
  //Using articleWithOneTag.tags[0] in the test body is intentional
  //to extract a valid generated tag
  //string to fill into the input field,
  //as articleWithoutTags has an empty tags array.
  await editArticlePage.clickUpdateArticleButton();

  await page.waitForURL('**/article/**');
  await page.reload();
});
