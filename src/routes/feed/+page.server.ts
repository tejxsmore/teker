// src/routes/feed/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Mock data for now - replace with actual database queries
	const feedPosts = [
		{
			id: '1',
			user: {
				id: 'user1',
				name: 'John Doe',
				image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
				isVerified: true
			},
			images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
			content: 'Just got the new iPhone 15 Pro! The camera quality is absolutely stunning 📱✨',
			productId: 'prod1',
			product: {
				id: 'prod1',
				name: 'iPhone 15 Pro',
				thumbnailImage: 'https://images.unsplash.com/photo-1696446702426-b0648e3143e6?w=400&q=80'
			},
			likeCount: 1247,
			commentCount: 89,
			shareCount: 34,
			isLiked: false,
			isSaved: false,
			createdAt: new Date('2024-01-09T10:30:00'),
			type: 'review'
		},
		{
			id: '2',
			user: {
				id: 'user2',
				name: 'Sarah Wilson',
				image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
				isVerified: false
			},
			images: [
				'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80',
				'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80'
			],
			content: 'MacBook Air M3 unboxing! This thing is a beast 💻🚀 #Apple #MacBook #Tech',
			productId: 'prod2',
			product: {
				id: 'prod2',
				name: 'MacBook Air M3',
				thumbnailImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80'
			},
			likeCount: 892,
			commentCount: 45,
			shareCount: 21,
			isLiked: true,
			isSaved: true,
			createdAt: new Date('2024-01-09T08:15:00'),
			type: 'unboxing'
		},
		{
			id: '3',
			user: {
				id: 'user3',
				name: 'Mike Chen',
				image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
				isVerified: true
			},
			images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'],
			content: 'Gaming setup complete! What do you think? 🎮⚡',
			likeCount: 2341,
			commentCount: 156,
			shareCount: 67,
			isLiked: false,
			isSaved: false,
			createdAt: new Date('2024-01-08T19:45:00'),
			type: 'photo'
		},
		{
			id: '4',
			user: {
				id: 'user4',
				name: 'Emma Davis',
				image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
				isVerified: true
			},
			images: [
				'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80',
				'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80'
			],
			content:
				'Wireless earbuds comparison: Sony vs AirPods Pro vs Samsung. Full review coming soon! 🎧',
			likeCount: 567,
			commentCount: 92,
			shareCount: 28,
			isLiked: true,
			isSaved: false,
			createdAt: new Date('2024-01-08T14:20:00'),
			type: 'comparison'
		}
	];

	return {
		posts: feedPosts
	};
};
