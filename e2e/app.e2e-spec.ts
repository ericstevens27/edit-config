import { EditConfigPage } from './app.po';

describe('edit-config App', () => {
  let page: EditConfigPage;

  beforeEach(() => {
    page = new EditConfigPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
