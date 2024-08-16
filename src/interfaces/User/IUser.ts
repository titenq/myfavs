interface IUser {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  createdAt: Date;
}

export default IUser;
