
// Movies tuple
type Movies = [string, string, string];
//Nationality 
type Nationality =
   "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese";



type Person ={
  readonly id: number,
  readonly name: string,
  birth_year: number
  death_year?: number,
  biography: string, 
  image: string //Image url
}

type Actress = Person &{
  most_famous_movies: Movies, 
  awards: string, 
  nationality: string

}
