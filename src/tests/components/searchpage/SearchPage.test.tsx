import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Store } from 'redux';

import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../../store/configureStore';

import MockApi from '../../api/mockApi';

import { setSeriesApi } from '../../../actions/seriesActions';
import { ISerieApi } from '../../../api/SerieApi';
import SearchPage from '../../../components/searchpage/SearchPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore();
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <SearchPage seriesApi={new MockApi(0)} />
      </Provider>
    </MemoryRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});

configure({ adapter: new Adapter() });

describe("SearchPage", () => {


  let mockSeriesApi: ISerieApi;
  let store: Store;

  beforeEach(() => {

    mockSeriesApi = new MockApi(0);
    mockSeriesApi.searchSeries = jest.fn().mockImplementation(mockSeriesApi.searchSeries);
    mockSeriesApi.getSeries = jest.fn().mockImplementation(mockSeriesApi.getSeries);

    store = configureStore();
    store.dispatch(setSeriesApi(mockSeriesApi));
  });

  it('gets search results from seriesApi', () => {

    const searchterm = "exportaciones"

    mount(
      <MemoryRouter
        initialEntries={['/search/?q=' + searchterm]}
        initialIndex={0}>
        <Provider store={store}>
          <SearchPage seriesApi={mockSeriesApi} />
        </Provider>
      </MemoryRouter>
    );

    expect(mockSeriesApi.searchSeries).toHaveBeenCalledWith(searchterm, 0, 10);
  });


  it('gets search results from seriesApi with limit and offset parameters', () => {

    const searchterm = "exportaciones"

    mount(
      <MemoryRouter
        initialEntries={['/search/?offset=10&limit=5&q=' + searchterm]}
        initialIndex={0}>
        <Provider store={store}>
          <SearchPage seriesApi={mockSeriesApi} />
        </Provider>
      </MemoryRouter>
    );

    expect(mockSeriesApi.searchSeries).toHaveBeenCalledWith(searchterm, 10, 5);
  });
});