import { ReactElement } from 'react';

export type TServiceForCarousel = {
  image: string;
  title: string;
  description: string;
  route: string;
  icon: ReactElement;
  color: string;
};

export type TCategoryForCarousel = {
  title: string;
  route: string;
  icon: string;
};

export type TUserContext = {
  _id: string;
  full_name: string;
  profile_photo: string;
  genotype: string;
  blood_group: string;
  gender: string;
};

export type TChatFormat = {
  role: string;
  message: string;
  date: string;
  photo_url: string;
};
