import { Organisation } from "./organisation";

export interface User {
	_id: string;
	currentOrganisation: Organisation;
	currentOrganisationId: string;
	email: string;
	firstName: string;
	lastName: string;
}