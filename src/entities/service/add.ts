import { IUser } from './../table-user/model/types';


export const addUser = (data:IUser[], newUser:IUser) => {
  return (
	 [...data,newUser]
  )
}
