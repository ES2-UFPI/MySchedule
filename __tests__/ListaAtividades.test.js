import React from 'react';

import renderer from 'react-test-renderer';
import ListaAtividade from '../src/components/ListaAtividades';

test('renders correctly', () => {
  const tree = renderer.create(<ListaAtividade />).toJSON();
  expect(tree).toMatchSnapshot();
});