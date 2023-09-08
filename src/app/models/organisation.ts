import { Card } from "./card";
import { User } from "./user";

export interface Organisation {
	_id: string;
  	name: string;
	havePaid: boolean;
	siren: string;
	customerId: string;
	admin: User[];
	adminId: User[];
	cards: Card[];
  	cardId:string;
	users: User[];
  	usersId : string[]
  	accountTypeId: number;
	accountTypeName: string;
	accountUserLimit: number;
}