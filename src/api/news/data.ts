export interface TGetNewsResponse {
  _id: string
  author: string
  img: string
  title: string
  short_description: string
  description: string
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface ICreateNewsDto {
  _id?: string
  author: string
  img: string
  title: string
  short_description: string
  description: string
}
