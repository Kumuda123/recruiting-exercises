const inventoryAllocator = require('../src/inventoryAllocator.js');

describe('Undefined inputs', () => {
  it('Undefined Order', () => {
    const items = undefined;
    const warehouses = [{ "name": "owd", "inventory": { "apple": 10 } }];
    const expected = [];
    expect(inventoryAllocator.cheapestShipment(items, warehouses)).toStrictEqual(expected);
  });

  it('Undefined Inventory', () => {
    const items = { "apple": 1 };
    const warehouses = undefined;
    const expected = [];
    expect(inventoryAllocator.cheapestShipment(items, warehouses)).toStrictEqual(expected);
  });

  it('Undefined Order and Inventory', () => {
    const items = undefined;
    const warehouses = undefined;
    const expected = [];
    expect(inventoryAllocator.cheapestShipment(items, warehouses)).toStrictEqual(expected);
  });
});

describe('Empty inputs', () => {
  it('Empty Order', () => {
    const items = {};
    const warehouses = [{ "name": "owd", "inventory": { "apple": 10 } }];
    const expected = [];
    expect(inventoryAllocator.cheapestShipment(items, warehouses)).toStrictEqual(expected);
  });

  it('Empty Inventory', () => {
    const items = { "apple": 1 };
    const warehouses = [];
    const expected = [];
    expect(inventoryAllocator.cheapestShipment(items, warehouses)).toStrictEqual(expected);
  });

  it('Empty Order and Inventory', () => {
    const items = {};
    const warehouses = [];
    const expected = [];
    expect(inventoryAllocator.cheapestShipment(items, warehouses)).toStrictEqual(expected);
  });
});

describe('Other test cases', () => {
  it('Exact inventory match!', () => {
    const items = { "apple": 1 };
    const warehouses = [{ "name": "owd", "inventory": { "apple": 1 } }];
    const expected = [{ "owd": { "apple": 1 }}];
    expect(inventoryAllocator.cheapestShipment(items, warehouses)).toStrictEqual(expected);
  });

  it('Not enough inventory', () => {
    const items = { "apple": 1 };
    const warehouses = [{ "name": "owd", "inventory": { "apple": 0 } }];
    const expected = [];
    expect(inventoryAllocator.cheapestShipment(items, warehouses)).toStrictEqual(expected);
  });

  it('Order not found', () => {
    const items = { "apple": 1 };
    const warehouses = [{ "name": "owd", "inventory": { "mango": 10 } }];
    const expected = [];
    expect(inventoryAllocator.cheapestShipment(items, warehouses)).toStrictEqual(expected);
  });

  it('Multiple items', () => {
    const items = { "apple": 5, "mango":5 };
    const warehouses = [{ "name": "owd", "inventory": { "mango": 10, "apple":10 } }];
    const expected = [{ "owd": { "apple": 5, "mango": 5 }}];
    expect(inventoryAllocator.cheapestShipment(items, warehouses)).toStrictEqual(expected);
  });

  it('Split between warehouses', () => {
    const items = { "apple": 10 };
    const warehouses = [{ "name": "owd", "inventory": { "apple": 5 } }, { "name": "dm", "inventory": { "apple": 5 }}];
    const expected = [{ "owd": { "apple": 5 }}, { "dm": { "apple": 5 } }];
    expect(inventoryAllocator.cheapestShipment(items, warehouses)).toStrictEqual(expected);
  });

  it('Split between multiple warehouses', () => {
    const items = { "apple": 10, "mango": 5 };
    const warehouses = [{ "name": "owd", "inventory": { "mango": 5} }, { "name": "dm", "inventory": { "apple": 5 }}];
    const expected = [{ "owd": { "mango":5 }}, { "dm": { "apple": 5 } }];
    expect(inventoryAllocator.cheapestShipment(items, warehouses)).toStrictEqual(expected);
  });
});
