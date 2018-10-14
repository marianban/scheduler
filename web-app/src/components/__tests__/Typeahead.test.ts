import { compareClientsFactory, IItem } from '../TypeaheadField';

it('it should sort items by match', () => {
  const items: [IItem] = [
    { value: 'Marian Ban' },
    { value: 'Annamaria Banova' },
    { value: 'Leonard Ban' }
  ];

  expect(items.sort(compareClientsFactory('xxx'))).toMatchInlineSnapshot(`
Array [
  Object {
    "value": "Annamaria Banova",
  },
  Object {
    "value": "Leonard Ban",
  },
  Object {
    "value": "Marian Ban",
  },
]
`);

  expect(items.sort(compareClientsFactory('Marian'))).toMatchInlineSnapshot(`
Array [
  Object {
    "value": "Marian Ban",
  },
  Object {
    "value": "Annamaria Banova",
  },
  Object {
    "value": "Leonard Ban",
  },
]
`);
});
