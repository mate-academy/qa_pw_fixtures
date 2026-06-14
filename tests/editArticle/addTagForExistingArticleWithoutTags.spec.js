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
    articleWithoutTags,
  }) => {
    await signUpUser(page, user, logger);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage.fillDescriptionField(
      articleWithoutTags.description,
    );
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();
  },
);

test('Add the tag for the existing article without tags', async ({
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
