import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { TITLE_CANNOT_BE_EMPTY, DESCRIPTION_CANNOT_BE_EMPTY, TEXT_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { test  } from '../_fixtures/fixtures';


test.beforeEach(async ({ 
  page, 
  user, 
  articleWithoutTags, 
  viewArticlePage
}) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
  await viewArticlePage.clickEditArticleButton();
});

test (`Edit an article title`, async ({
  editArticlePage,
  articleWithoutTags,
  viewArticlePage }) => {

  await editArticlePage.editTitleField(articleWithoutTags.title);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
});


test (`Edit an article description`, async ({
  editArticlePage,
  viewArticlePage,
  articleWithoutTags
}) => {

  await editArticlePage.editDescriptionField(articleWithoutTags.description );
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.clickEditArticleButton();
  // eslint-disable-next-line max-len
  await editArticlePage.assertArticleDescriptionIsVisible(articleWithoutTags.description );
});

test (`Edit an article text`, async ({
  editArticlePage,
  viewArticlePage,
  articleWithoutTags
}) => {

  await editArticlePage.editTextField(articleWithoutTags.text);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});

test ('Add the tag for the existing article without tags', async ({
  editArticlePage,
  viewArticlePage,
  articleWithTwoTags
}) => {
  
  await editArticlePage.addTags(articleWithTwoTags.tags);
  await editArticlePage.clickUpdateArticleButton();
  for (const tag of articleWithTwoTags.tags) {
  await viewArticlePage.assertArticleTagIsVisible(tag);
}
});

test.describe('Edit article with tags', () => {

  test.beforeEach(async ({ page, articleWithTwoTags, viewArticlePage }) => {
    
    await createNewArticle(page, articleWithTwoTags);
    await viewArticlePage.clickEditArticleButton();
  });

  test ('Add tag for existing article with tags', async ({
    editArticlePage,
    viewArticlePage,
    articleWithTwoTags,
    articleWithOneTag
  }) => {
    
    await editArticlePage.addTags(articleWithOneTag.tags);
    await editArticlePage.clickUpdateArticleButton();
    for (const tag of [...articleWithTwoTags.tags, ...articleWithOneTag.tags]) {
      await viewArticlePage.assertArticleTagIsVisible(tag);
    }
  });

  test ('Remove tag for existing article with tags', async ({
    editArticlePage,
    viewArticlePage,
    articleWithTwoTags
  }) => {
    const tagToRemove = articleWithTwoTags.tags[0];
    await editArticlePage.removeTag(tagToRemove);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTagIsNotVisible(tagToRemove);
  });
});

  test(`Remove an article title`, async ({ editArticlePage }) => {
  await editArticlePage.clearTitleField();
  await editArticlePage.clickUpdateArticleButtonForError();
  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

  test(`Remove an article description`, async ({ editArticlePage }) => {
  await editArticlePage.clearDescriptionField();
  await editArticlePage.clickUpdateArticleButtonForError();
  // eslint-disable-next-line max-len
  await editArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
});

  test (`Remove an article text`, async ({ editArticlePage }) => {
  await editArticlePage.clearTextField();
  await editArticlePage.clickUpdateArticleButtonForError();
  await editArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});