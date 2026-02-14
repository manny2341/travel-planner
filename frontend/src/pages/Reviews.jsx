import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Filter, Share2 } from 'lucide-react';
import { ReviewCard } from '../components/Cards';
import { ReviewForm } from '../components/Forms';
import { useAuth } from '../context/AuthContext';
import { sampleReviews } from '../data/index';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState(sampleReviews);
  const [ratingFilter, setRatingFilter] = useState('all');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState({});

  const filteredReviews = useMemo(() => {
    if (ratingFilter === 'all') return reviews;
    return reviews.filter(r => r.rating === parseInt(ratingFilter));
  }, [reviews, ratingFilter]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingDistribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => { dist[r.rating]++; });
    return dist;
  }, [reviews]);

  const handleSubmitReview = (reviewData) => {
    const newReview = {
      id: 'review-' + Date.now(),
      userId: user?.id || 'current-user',
      userName: user?.name || 'You',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (user?.name || 'You'),
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      helpful: 0,
      createdAt: new Date().toISOString(),
      verified: false
    };
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
  };

  const handleHelpful = (reviewId) => {
    if (helpfulClicked[reviewId]) return;
    setReviews(reviews.map(r => r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r));
    setHelpfulClicked({ ...helpfulClicked, [reviewId]: true });
  };

  const handleShare = (review, platform) => {
    const url = window.location.href;
    const text = 'Check out this review: "' + review.title + '" - ' + review.rating + ' stars';
    const shareUrls = {
      twitter: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url),
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
      linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url)
    };
    if (shareUrls[platform]) window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    setShareDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1683499265663-d38c13aced63?w=1080)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl font-bold text-white mb-3">Traveler Reviews</h1>
            <p className="text-xl text-blue-100 max-w-2xl">Real experiences from real travelers. Share your journey and help others plan their perfect trip.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-12">
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">{averageRating}</div>
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className={'w-6 h-6 ' + (star <= Math.round(parseFloat(averageRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200')} />
                  ))}
                </div>
                <p className="text-gray-400">Based on {reviews.length} reviews</p>
              </div>
              <div className="space-y-2">
                {[5,4,3,2,1].map(rating => {
                  const count = ratingDistribution[rating];
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium">{rating}</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: percentage + '%' }} transition={{ duration: 0.5, delay: 0.3 }}
                          className="h-full bg-blue-500 rounded-full" />
                      </div>
                      <span className="text-sm text-gray-400 w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {user ? (
            <button onClick={() => setShowReviewForm(true)} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              Write a Review
            </button>
          ) : (
            <p className="text-sm text-gray-400">Sign in to write a review</p>
          )}
        </div>

        {showReviewForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Share Your Experience</h3>
                <button onClick={() => setShowReviewForm(false)} className="text-gray-400 hover:text-gray-600 text-xl">x</button>
              </div>
              <ReviewForm onSubmit={handleSubmitReview} />
            </Card>
          </motion.div>
        )}

        <Separator className="mb-8" />

        <div className="space-y-6">
          {filteredReviews.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-400">No reviews found for the selected rating.</p>
            </Card>
          ) : (
            filteredReviews.map((review, index) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * index }}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <ReviewCard review={review} />
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <button onClick={() => handleHelpful(review.id)}
                      className={'flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-colors ' + (helpfulClicked[review.id] ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50')}>
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </button>
                    <button onClick={() => { setSelectedReview(review); setShareDialogOpen(true); }}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Share Review</DialogTitle>
            <DialogDescription>Share this review on social media</DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold mb-1">{selectedReview.title}</p>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(star => (
                    <span key={star} className={star <= selectedReview.rating ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => handleShare(selectedReview, 'twitter')}
                  className="border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50">
                  X
                </button>
                <button onClick={() => handleShare(selectedReview, 'facebook')}
                  className="border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50">
                  Facebook
                </button>
                <button onClick={() => handleShare(selectedReview, 'linkedin')}
                  className="border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50">
                  LinkedIn
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
