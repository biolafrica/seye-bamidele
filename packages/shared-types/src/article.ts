import {BaseEntity } from './base';


export interface Article extends BaseEntity {
  date: string;
  title: string;
  excerpt: string;
  image: string;
  image1: string;
  image2: string;
  content: string;
}