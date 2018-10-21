import { compareClientsFactory, IItem } from '../TypeaheadField';

const items: IItem[] = [
  { value: 'Marian Ban' },
  { value: 'Annamaria Banova' },
  { value: 'Leonard Ban' }
];

it('sorts items alphabetically in case of no match', () => {
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
});

it('sorts items alphabetically and puts matching item first', () => {
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

it('sort items alphabetically and puts matching (case insensitive) item first', () => {
  expect(items.sort(compareClientsFactory('marian'))).toMatchInlineSnapshot(`
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
