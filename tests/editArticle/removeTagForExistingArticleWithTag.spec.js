import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(
  async ({
    page,
    user,
    logger,
    homePage,
    createArticlePage,
    articleWithOneTag,
  }) => {
    await signUpUser(page, user, logger);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithOneTag.title);
    await createArticlePage.fillDescriptionField(articleWithOneTag.description);
    await createArticlePage.fillTextField(articleWithOneTag.text);
    await createArticlePage.fillTagField(articleWithOneTag.tags[0]);
    await createArticlePage.clickPublishArticleButton();
  },
);

test('Remove an article tag for the existing article with tag', async ({
  viewArticlePage,
  createArticlePage,
  editArticlePage,
  articleWithOneTag,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTagField('');
  await editArticlePage.clickEditArticleButton();
  await viewArticlePage.clickUserProfile();

  await viewArticlePage.assertArticleTagIsNotVisible(articleWithOneTag.tags[0]);
});
