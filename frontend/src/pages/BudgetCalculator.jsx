import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, PieChart, AlertCircle, Plus, Trash2 } from "lucide-react";
import { BudgetCalculatorForm } from "../components/Forms";
import { BudgetCategoryCard } from "../components/Cards";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { formatPrice, calculateTotalBudget, groupBudgetByCategory } from "../lib/budget";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../lib/api";
import { toast } from "sonner";

const categoryColors = {
  flights: "#0077b6", accommodation: "#00b4d8",
  food: "#f77f00", activities: "#28a745",
  transportation: "#6f42c1", other: "#888"
};

const categoryLabels = {
  flights: "Flights", accommodation: "Accommodation",
  food: "Food & Dining", activities: "Activities",
  transportation: "Transportation", other: "Other Expenses"
};

export default function BudgetCalculator() {
  const { user, token } = useAuth();
  const [budgetItems, setBudgetItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && token) fetchItems();
    else setIsLoading(false);
  }, [user, token]);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/budget`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setBudgetItems(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
    setIsLoading(false);
  };

  const handleAddItem = async (item) => {
    if (!user || !token) { toast.error("Please sign in to save budget items"); return; }
    try {
      const res = await fetch(`${API_BASE}/api/budget`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: item.name, amount: item.amount, category: item.category })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add item");
      setBudgetItems(prev => [...prev, data]);
      setShowForm(false);
    } catch (err) {
      toast.error(err.message || "Failed to add item");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await fetch(`${API_BASE}/api/budget/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setBudgetItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      toast.error("Failed to delete item");
    }
  };

  const handleClearAll = async () => {
    if (!budgetItems.length) return;
    try {
      await fetch(`${API_BASE}/api/budget`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setBudgetItems([]);
    } catch (err) {
      toast.error("Failed to clear items");
    }
  };

  const totalBudget = useMemo(() => calculateTotalBudget(budgetItems), [budgetItems]);
  const categoryTotals = useMemo(() => groupBudgetByCategory(budgetItems), [budgetItems]);

  const categoryData = useMemo(() => Object.entries(categoryTotals).map(([category, amount]) => ({
    category, amount,
    percentage: totalBudget > 0 ? (amount / totalBudget) * 100 : 0
  })), [categoryTotals, totalBudget]);

  const recommendations = useMemo(() => {
    const recs = [];
    const flightPercent = categoryTotals.flights ? (categoryTotals.flights / totalBudget) * 100 : 0;
    const accommodationPercent = categoryTotals.accommodation ? (categoryTotals.accommodation / totalBudget) * 100 : 0;
    const foodPercent = categoryTotals.food ? (categoryTotals.food / totalBudget) * 100 : 0;

    if (flightPercent > 40) recs.push("Consider booking flights earlier or looking for budget airlines to reduce costs.");
    if (accommodationPercent > 35) recs.push("Accommodation is taking a large portion. Consider hostels or vacation rentals.");
    if (foodPercent < 15 && totalBudget > 0) recs.push("You may want to allocate more budget for food and dining experiences.");
    if (totalBudget < 1000) recs.push("For international travel, consider increasing your budget for a comfortable trip.");
    if (recs.length === 0) recs.push("Your budget allocation looks balanced. Great planning!");
    return recs;
  }, [categoryTotals, totalBudget]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1649209979970-f01d950cc5ed?w=1080)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="relative h-full flex flex-col justify-center container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl font-bold mb-4 text-white">Budget Calculator</h1>
            <p className="text-xl text-blue-100 max-w-2xl">Plan your travel expenses and track your budget by category</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {!user ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💰</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-3">Sign in to track your budget</h2>
            <p className="text-gray-400 mb-6">Your budget items are saved to your account and accessible on any device.</p>
            <a href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-block">Sign In</a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2"><Wallet className="w-5 h-5" />Total Budget</CardTitle>
                        <CardDescription>Track all your travel expenses</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {budgetItems.length > 0 && (
                          <Button variant="outline" size="sm" onClick={handleClearAll} className="text-red-600 border-red-200 hover:bg-red-50">
                            Clear All
                          </Button>
                        )}
                        <Button onClick={() => setShowForm(!showForm)} size="sm">
                          <Plus className="w-4 h-4 mr-2" />Add Expense
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-blue-600 mb-6">{formatPrice(totalBudget)}</div>
                    {showForm && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6">
                        <BudgetCalculatorForm onAddItem={handleAddItem} />
                      </motion.div>
                    )}
                    {isLoading ? (
                      <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                      </div>
                    ) : budgetItems.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <PieChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No expenses added yet</p>
                        <p className="text-sm">Start by adding your first budget item</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold mb-4">All Expenses ({budgetItems.length})</h3>
                        {[...budgetItems].reverse().map(item => (
                          <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border bg-gray-50">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">{categoryLabels[item.category] || item.category}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <p className="font-semibold">{formatPrice(item.amount)}</p>
                              <button onClick={() => handleDeleteItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {categoryData.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><PieChart className="w-5 h-5" />Category Breakdown</CardTitle>
                      <CardDescription>Expense distribution by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {categoryData.map(data => (
                          <BudgetCategoryCard key={data.category} category={data.category} amount={data.amount} percentage={data.percentage} />
                        ))}
                      </div>
                      <div className="mt-8">
                        <h4 className="text-sm font-medium mb-4">Visual Distribution</h4>
                        <div className="h-8 rounded-full overflow-hidden flex">
                          {categoryData.map(data => (
                            <div key={data.category} style={{ width: `${data.percentage}%`, backgroundColor: categoryColors[data.category] }}
                              className="transition-all duration-300" title={`${categoryLabels[data.category]}: ${data.percentage.toFixed(1)}%`} />
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-4 mt-4">
                          {categoryData.map(data => (
                            <div key={data.category} className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[data.category] }} />
                              <span className="text-sm text-gray-500">{categoryLabels[data.category]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5" />Budget Summary</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b"><span className="text-gray-500">Total Items</span><span className="font-semibold">{budgetItems.length}</span></div>
                    <div className="flex justify-between items-center pb-4 border-b"><span className="text-gray-500">Categories</span><span className="font-semibold">{Object.keys(categoryTotals).length}</span></div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <span className="text-gray-500">Average per Item</span>
                      <span className="font-semibold">{budgetItems.length > 0 ? formatPrice(totalBudget / budgetItems.length) : formatPrice(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Largest Category</span>
                      <span className="font-semibold">{categoryData.length > 0 ? categoryLabels[categoryData.reduce((max, curr) => curr.amount > max.amount ? curr : max).category] : "N/A"}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><AlertCircle className="w-5 h-5" />Recommendations</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {recommendations.map((rec, i) => (
                      <Alert key={i}><AlertDescription>{rec}</AlertDescription></Alert>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Budget Planning Tips</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Book flights 6+ months in advance for best prices</li>
                      <li>• Allocate 10-15% extra for unexpected expenses</li>
                      <li>• Consider travel insurance in your budget</li>
                      <li>• Track daily spending to stay within limits</li>
                      <li>• Look for package deals to save money</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
