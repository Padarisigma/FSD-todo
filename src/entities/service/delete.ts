export default function deleteService(
	data: Array<{ id: number | string }>,
	id: number | string
 ) {
	return data.filter((elem) => elem.id !== id);
 }
 