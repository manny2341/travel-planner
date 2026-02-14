export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function calculateTotalBudget(items) {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

export function groupBudgetByCategory(items) {
  return items.reduce((groups, item) => {
    groups[item.category] = (groups[item.category] || 0) + item.amount;
    return groups;
  }, {});
}
