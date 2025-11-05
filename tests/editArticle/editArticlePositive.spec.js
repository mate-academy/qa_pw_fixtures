import { test } from '../_fixtures/fixtures';
import { createNewArticle }from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.describe ('with tags', () => {
  test.beforeEach(async ({ 
    page, 
    user,
    homePage,
    createArticlePage,
    articleWithOneTag,
    viewArticlePage
  }) => {
    await signUpUser(page, user);
    await createNewArticle(
      { homePage, createArticlePage, viewArticlePage },
      articleWithOneTag);
  });
  
  test('Edit the article title for the existing article', 
    async ({
      viewArticlePage, 
      editArticlePage, 
      articleWithTwoTags,
      articleWithOneTag }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTitleField(articleWithTwoTags.title);
    await editArticlePage.clickUpdateArticleButton();
    
    await viewArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  });
  
  test(
    'Edit the article description for the existing article', 
    async ({
      viewArticlePage, 
      editArticlePage, 
      articleWithOneTag,
      articleWithTwoTags
    }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillDescriptionField(articleWithTwoTags.description);
    await editArticlePage.clickUpdateArticleButton();
    
    await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
    await viewArticlePage
    .assertArticleDescriptionIsVisible(articleWithTwoTags.description);
    await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  });
  
  test('Edit the article text for the existing article', 
    async ({viewArticlePage, 
      editArticlePage,
      articleWithOneTag,
      articleWithTwoTags
    }) => {
   
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTextField(articleWithTwoTags.text);
    await editArticlePage.clickUpdateArticleButton();
    
    await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithTwoTags.text);
  });
  
  test('Add the tag for the existing article with tags', 
    async ({
      viewArticlePage, 
      editArticlePage,
      articleWithOneTag,
      articleWithTwoTags
    }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillInTags(articleWithTwoTags.tags);
    await editArticlePage.clickUpdateArticleButton();
    
    const generaltags =  [
      ...articleWithOneTag.tags, 
      ...articleWithTwoTags.tags
    ];
    await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
    await viewArticlePage.assertCorrectTagsAreVisible(generaltags);
  });
});

test.describe ('without tags', () => {
  test.beforeEach(async ({ 
    page, 
    user,
    homePage,
    createArticlePage,
    articleWithoutTags,
    viewArticlePage
  }) => {
    await signUpUser(page, user);
    await createNewArticle(
      { homePage, createArticlePage, viewArticlePage },
      articleWithoutTags);
  });
  
  test('Add the tag for the existing article without tags', 
    async ({
      viewArticlePage, 
      editArticlePage,
      articleWithoutTags,
      articleWithTwoTags }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillInTags(articleWithTwoTags.tags);
    await editArticlePage.clickUpdateArticleButton();
    
    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
    await viewArticlePage.assertCorrectTagsAreVisible(articleWithTwoTags.tags);
  });
})


