import { HubHonchoPage } from './app.po';

describe('hub-honcho App', function() {
  let page: HubHonchoPage;

  beforeEach(() => {
    page = new HubHonchoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
