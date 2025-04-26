interface Tag{
  _id:string;
  name:string;
}
interface Author {
  _id: string;
  name: string;
  image: string;
}
interface Questions {
  _id: string;
  title: string;
  description: string;
  tags: Tag[];
  author: Author;
  createAt: Date;
  upvotes: number;
  answers: number;
  views: number;
}