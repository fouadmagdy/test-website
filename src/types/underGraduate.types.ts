
export interface UnderGraduate {
	id:         number;
	attributes: DatumAttributes;
}

 interface DatumAttributes {
	title: string;
	slug:  string;
	color: string;
	image: Image;
}

 interface Image {
	data: Data;
}

 interface Data {
	id:         number;
	attributes: DataAttributes;
}

 interface DataAttributes {
	url: string;
	alternativeText:string;
}