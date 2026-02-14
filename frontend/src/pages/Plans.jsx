import { toast } from "sonner";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Plus, Trash2, Save, Edit2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { PlanCard } from '../components/Cards';
import { PlanCreatorForm } from '../components/Forms';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../lib/api';

export default function Plans() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogPlan, setDeleteDialogPlan] = useState(null);

  useEffect(() => {
    if (user) fetchPlans();
    else { setIsLoading(false); setShowAuthAlert(true); }
  }, [user]);

  useEffect(() => {
    if (showAuthAlert) {
      const timer = setTimeout(() => setShowAuthAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showAuthAlert]);

  const fetchPlans = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/plans`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPlans(data);
    } catch (err) { console.error(err); }
    setIsLoading(false);
  };

  const handleCreatePlan = async (formData) => {
    if (!user) { setShowAuthAlert(true); return; }
    setIsCreating(true);
    try {
      const res = await fetch(`${API_BASE}/api/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const newPlan = await res.json();
      setPlans(prev => [newPlan, ...prev]); toast.success("Plan created successfully!");
      setCurrentPlan(newPlan);
      setActiveTab('saved');
    } catch (err) { console.error(err); }
    setIsCreating(false);
  };

  const handleUpdatePlan = async (formData) => {
    if (!editingPlan || !user) return;
    setIsCreating(true);
    try {
      const res = await fetch(`${API_BASE}/api/plans/${editingPlan._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const updated = await res.json();
      setPlans(prev => prev.map(p => p._id === editingPlan._id ? updated : p));
      setEditingPlan(null);
      setActiveTab('saved');
    } catch (err) { console.error(err); }
    setIsCreating(false);
  };

  const handleDeletePlan = async (planId) => {
    try {
      await fetch(`${API_BASE}/api/plans/${planId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlans(prev => prev.filter(p => p._id !== planId));
      if (currentPlan?._id === planId) setCurrentPlan(null);
      setDeleteDialogPlan(null);
    } catch (err) { console.error(err); }
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setActiveTab('create');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1584967918940-a7d51b064268?w=1080)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="relative h-full flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center px-4">
            <h1 className="text-5xl font-bold mb-4 text-white">Plan Your Journey</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">Create detailed travel itineraries with destinations, dates and budgets</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <AnimatePresence mode="wait">
          {showAuthAlert && !user && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Alert>
                <AlertDescription>
                  Please <a href="/login" className="text-blue-600 underline">log in</a> to save your travel plans. Your plans will be stored securely and accessible from any device.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create Plan
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Save className="w-4 h-4" /> Saved Plans ({plans.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card className="max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {editingPlan ? <><Edit2 className="w-5 h-5" /> Edit Travel Plan</> : <><Calendar className="w-5 h-5" /> Create New Travel Plan</>}
                  </CardTitle>
                  <CardDescription>
                    {editingPlan ? 'Update your travel plan details and destinations' : 'Design your perfect trip with destinations, dates and budget'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PlanCreatorForm onSubmit={editingPlan ? handleUpdatePlan : handleCreatePlan} initialData={editingPlan} />
                  {editingPlan && (
                    <Button variant="outline" onClick={() => setEditingPlan(null)} className="mt-4 border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm">
                      Cancel Edit
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {currentPlan && !editingPlan && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="max-w-3xl mx-auto">
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" /> Plan Created!
                    </CardTitle>
                    <CardDescription>Your new travel plan has been saved</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PlanCard plan={currentPlan} />
                    <div className="mt-6 flex gap-3">
                      <button onClick={() => handleEditPlan(currentPlan)}
                        className="flex-1 border border-gray-200 bg-white text-gray-700 py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-50">
                        <Edit2 className="w-4 h-4" /> Edit Plan
                      </button>
                      <button onClick={() => navigate(`/plans/${currentPlan._id}`)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-blue-700">
                        View Plan
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                <p className="mt-4 text-gray-500">Loading your plans...</p>
              </div>
            ) : plans.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No Saved Plans Yet</h3>
                <p className="text-gray-400 mb-6">
                  {user ? 'Start creating your first travel plan to see it here' : 'Log in to save and manage your travel plans'}
                </p>
                <button onClick={() => setActiveTab('create')} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm flex items-center gap-2 mx-auto hover:bg-blue-700">
                  <Plus className="w-4 h-4" /> Create Your First Plan
                </button>
              </motion.div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan, index) => (
                  <motion.div key={plan._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <PlanCard plan={plan} />
                        <div className="mt-4 flex gap-2">
                          <button onClick={() => navigate(`/plans/${plan._id}`)}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-xs flex items-center justify-center gap-1 hover:bg-blue-700">
                            View
                          </button>
                          <button onClick={() => handleEditPlan(plan)}
                            className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-lg text-xs flex items-center justify-center gap-1 hover:bg-gray-50">
                            <Edit2 className="w-3 h-3" /> Edit
                          </button>
                          <button onClick={() => setDeleteDialogPlan(plan)}
                            className="flex-1 border border-red-200 text-red-600 py-2 rounded-lg text-xs flex items-center justify-center gap-1 hover:bg-red-50">
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!deleteDialogPlan} onOpenChange={() => setDeleteDialogPlan(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Travel Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteDialogPlan?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end mt-4">
            <button onClick={() => setDeleteDialogPlan(null)} className="border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={() => handleDeletePlan(deleteDialogPlan?._id)} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700">Delete Plan</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
