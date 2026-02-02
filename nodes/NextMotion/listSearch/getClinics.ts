import { createListSearch } from '../shared/listSearchFactory';
import type { Clinic } from '../shared/types';

export const getClinics = createListSearch<Clinic>({
	url: '/open_api/v4/clinics',
	requiresClinicId: false,
	supportsPagination: false,
	nameFormatter: (clinic) => clinic.name,
});
