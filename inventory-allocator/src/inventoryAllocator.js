class inventoryAllocator {
  static cheapestShipment(order, warehouses) {
    if((!warehouses || !order) || (JSON.stringify(order) === '{}'))
      return [];
    let remaining = Number.MAX_VALUE;
    const shipments = [];
    for(let i = 0; i < warehouses.length && remaining !== 0; i ++ ){
      const finalOrder = {};
      const inventory = warehouses[i].inventory;
      Object.keys(inventory).map((item) => {
        if(order[item]) {
          if(inventory[item] >= order[item]) {
            finalOrder[item] = order[item];
            inventory[item] -= order[item];
            order[item] = 0;
          } else if (inventory[item] < order[item] && inventory[item] !== 0) {
            finalOrder[item] ? finalOrder[item] += inventory[item]: finalOrder[item] = inventory[item];
            order[item] -= inventory[item];
            inventory[item] -= order[item];
          }
        }
      });
      if(Object.entries(finalOrder).length) shipments.push({[warehouses[i].name]: finalOrder});
    }
    return shipments;
  };
}

module.exports = inventoryAllocator;
