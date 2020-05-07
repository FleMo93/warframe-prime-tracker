import { components, bindingHandlers, Observable, observable } from 'knockout';

interface TabContainer {
  container: Element;
  tabsContent: Array<{
    header: Element;
    content: Element;
  }>;
}

const tabContainer: Array<TabContainer> = [];

bindingHandlers.tabContainer = {
  init: (element): void => {
    tabContainer.push({
      container: element,
      tabsContent: []
    });
  }
}

bindingHandlers.tabContent = {
  init: (element: HTMLElement): void => {
    const tab = tabContainer.find((container) => container.container === element.closest('.tabContainer'));
    if (!tab) { throw Error('TabContent needs a TabContainer'); }
    
    const header = element.previousElementSibling;
    
    if(!header || !header.classList.contains('tabHeader')) {
      throw Error('Tab header not found');
    }
    tab.tabsContent.push({
      content: element,
      header: header
    });

    if (tab.tabsContent.length > 1) {
      element.classList.add('hiddenTabContent');
    } else {
      header.classList.add('activeHeaderTab');
    }



    header.addEventListener('click', () => {
      for (const tabsContent of tab.tabsContent) {
        if (tabsContent.content === element) { continue; }
        tabsContent.content.classList.add('hiddenTabContent');
        tabsContent.header.classList.remove('activeHeaderTab');
      }

      header.classList.add('activeHeaderTab');
      element.classList.remove('hiddenTabContent');
    });
  }
}

export interface TabContentOptions {
  header: string | Observable<string>;
}

class TabContent {
  public header: Observable<string>;

  constructor(data: TabContentOptions) {
    if (typeof data.header === 'string') {
      this.header = observable(data.header);
    } else {
      this.header = data.header;
    }
  }
}

export const registerControl = (tabContainerName: string, tabContentName: string): void => {
  if (components.isRegistered(tabContainerName)) { throw Error(`Component ${tabContainerName} already registered`); }
  if (components.isRegistered(tabContentName)) { throw Error(`Component ${tabContentName} already registered`); }

  components.register(tabContainerName, {
    template: require('../views/tabContainer.html'),
  });
  require('../views/tabContainer.css');


  components.register(tabContentName, {
    template: require('../views/tabContent.html'),
    viewModel: TabContent
  });
  require('../views/tabContent.css');
}