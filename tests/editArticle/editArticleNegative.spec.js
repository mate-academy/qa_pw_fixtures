import { test } from '../_fixtures/fixtures';
import {
  TITLE_CANNOT_BE_BLANK,
  DESCRIPTION_CANNOT_BE_BLANK,
  BODY_CANNOT_BE_BLANK
} from '../../src/ui/constants/articleErrorMessages';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.describe('without tags', () => {
  test.beforeEach(async ({ 
    page, 
    user,
    articleWithoutTags, 
    homePage, 
    createArticlePage, 
    viewArticlePage }) => {
    await signUpUser(page, user);
    await createNewArticle(
      { homePage, createArticlePage, viewArticlePage },
      articleWithoutTags);
  });
  
  test(
    'Remove an article title for the existing article', 
    async ({editArticlePage, viewArticlePage}) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTitleField('');
    await editArticlePage.clickUpdateArticleButton();
  
    await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_BLANK);
  });
  
  test(
    'Remove an article description for the existing article', 
    async ({editArticlePage, viewArticlePage}) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillDescriptionField('');
    await editArticlePage.clickUpdateArticleButton();
  
    await editArticlePage
      .assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_BLANK);
  
  });
  
  test(
    'Remove the article text for the existing article', 
    async ({ editArticlePage, viewArticlePage }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTextField('');
    await editArticlePage.clickUpdateArticleButton();
  
    await editArticlePage
    .assertErrorMessageContainsText(BODY_CANNOT_BE_BLANK);
  });
})

test.describe('withtags', () => {
  test.beforeEach(async ({ 
    page, 
    user,
    articleWithTwoTags, 
    homePage, 
    createArticlePage, 
    viewArticlePage }) => {
    await signUpUser(page, user);
    await createNewArticle(
      { homePage, createArticlePage, viewArticlePage },
      articleWithTwoTags);
  });
  
  test(
    'Remove an article tag for the existing article with tag', 
    async ({
      editArticlePage, 
      articleWithTwoTags,
      viewArticlePage
    }) => {
 
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.deleteTags(articleWithTwoTags.tags[0]);
    await editArticlePage.clickUpdateArticleButton();
    
    await viewArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithTwoTags.text);
    await viewArticlePage
      .assertCorrectTagsIsNotVisible(articleWithTwoTags.tags[0]);
  });
  
})
