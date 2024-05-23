export interface EventsData {
	events: Events;
}

export interface FluffyAttributes {
	name:           string;
	createdAt:      Date;
	updatedAt:      Date;
	publishedAt:    Date;
	locale:         string;
	slug:           string;
	localizations?: Events;
}

export interface CategoriesDatum {
	id:         number;
	attributes: FluffyAttributes;
}

export interface Categories {
	data: CategoriesDatum[];
}

export interface PurpleAttributes {
	title:          string;
	date:           Date;
	contactNumber:  string;
	contactEmail:   string;
	description:    string;
	createdAt:      Date;
	updatedAt:      Date;
	publishedAt:    Date;
	locale:         string;
	slug:           string;
	images:         Images;
	location:       Location;
	divisions:      Division[];
	series:         Series[];
	sponsors:       Sponsor[];
	categories:     Categories;
	localizations?: Events;
}

export interface EventsDatum {
	id:         number;
	attributes: PurpleAttributes;
}

export interface Events {
	data: EventsDatum[];
}

export interface Division {
	id:           number;
	divisionName: string;
}

export interface Images {
	data: ImagesDatum[];
}

export interface ImagesDatum {
	id:         number;
	attributes: TentacledAttributes;
}

export interface TentacledAttributes {
	alternativeText: null;
	url:             string;
}

export interface Location {
	id:            number;
	locationName:  string;
	googleMapLink: string;
}

export interface Series {
	id:         number;
	seriesName: string;
}

export interface Sponsor {
	id:          number;
	sponsorName: string;
}
