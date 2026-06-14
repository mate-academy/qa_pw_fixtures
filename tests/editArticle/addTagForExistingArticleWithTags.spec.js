import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
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

test('Add the tag for the existing article with tags', async ({
  viewArticlePage,
  createArticlePage,
  editArticlePage,
}) => {
  const tag = faker.lorem.word();
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTagField(tag);
  await editArticlePage.clickEditArticleButton();
  await viewArticlePage.clickUserProfile();

  await viewArticlePage.assertArticleTagIsVisible(tag);
});
