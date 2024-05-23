export interface Members {
	data: WelcomeDatum[];
}

 interface WelcomeDatum {
	id:         number;
	attributes: PurpleAttributes;
}

 interface PurpleAttributes {
	name:        string;
	biography: string;
	email:       string;
	createdAt:   Date;
	updatedAt:   Date;
	publishedAt: Date;
	locale:      string;
	image:       Image;
	categories:  Categories;
}

 interface Categories {
	data: CategoriesDatum[];
}

 interface CategoriesDatum {
	id:         number;
	attributes: FluffyAttributes;
}

 interface FluffyAttributes {
	slug: Slug;
	name: Name;
}

 type Name = 'Academic' | 'External ' | 'Internal';

 type Slug = 'academic' | 'external' | 'internal';

 interface Image {
	data: Data;
}

 interface Data {
	id:         number;
	attributes: DataAttributes;
}

 interface DataAttributes {
	url:             string;
	alternativeText: null;
}
