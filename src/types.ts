export type UserType = {
	_id: string;
	username: string;
	email: string;
	phone?: number;
	avatar?: string;
	gender?: string;
	accessToken: string;
	wishlistIds: string[];
	cart: UserCartItemType[];
	shippingAddresses: ShippingInfoType[];
};

type UserCartItemType = {
	_id: string;
	quantity: number;
	productId: string;
};

export interface MyReviewType {
	numRating: number;
	comment: string;
	postedAt: string;
	productId: ProductType;
}

export type ShippingInfoType = {
	_id?: string;
	name: string;
	locality: string;
	address: string;
	city: string;
	state: StateType;
	pincode: number;
	phone: number;
	alternatePhone?: number;
	addressType: string;
};

export type StateType = {
	id: string;
	name: string;
};

export type BillboardType = {
	_id: string;
	title: string;
	brand: string;
	category: ChildCategoryType;
	parentCategory: ParentCategoryType;
	imageUrl: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

export type ProductType = {
	_id: string;
	title: string;
	description: string;
	brand: string;
	price: number;
	stock: number;
	discount: number;
	images: ImageType[];
	numRating?: number;
	category: ChildCategoryType;
	color?: ColorType;
	unit?: UnitType;
	reviews: ReviewType[];
	featured: boolean;
	createdAt: string;
	updatedAt: string;
};

export type ImageType = {
	_id: string;
	url: string;
};

export type ReviewType = {
	_id: string;
	userId: UserType;
	numRating: number;
	comment: string;
	postedAt: string;
};

export type ChildCategoryType = {
	_id: string;
	name: string;
	parentCategory: ParentCategoryType;
	createdAt: string;
	updatedAt: string;
};

export type ParentCategoryType = {
	_id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
};

export type ColorType = {
	_id: string;
	name: string;
	value: string;
	createdAt: string;
	updatedAt: string;
};

export type UnitType = {
	_id: string;
	name: string;
	value: string;
	shortHand?: string;
	createdAt: string;
	updatedAt: string;
};

export type OrderItemType = {
	_id: string;
	quantity: number;
	productId: ProductType;
	price: number;
	discount: number;
};

export type OrderType = {
	_id: string;
	shippingInfo: ShippingInfoType;
	orderItems: OrderItemType[];
	userId: UserType;
	paymentInfo: string;
	paidAt?: string;
	shippingPrice: number;
	orderStatus: string;
	orderedAt: string;
	deliveredAt?: string;
};

export type CartItemType = {
	_id: string;
	quantity: number;
	productId: ProductType;
};
