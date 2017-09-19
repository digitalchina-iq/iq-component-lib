import { IqComponentLibPage } from './app.po';

describe('iq-component-lib App', () => {
  let page: IqComponentLibPage;

  beforeEach(() => {
    page = new IqComponentLibPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
