export enum SelectedPage {
  Hero = 'hero',
  About = 'about',
  OurClasses = 'ourclasses',
  ContactUs = 'contactUs',
  TrainingOptions = 'trainingoptions',
  Calendar = 'calendar'
}

export interface AboutType {
  icon: JSX.Element
  title: string
  description: string
}

export interface ClassType {
  name: string
  description?: string
  image: string
}
