
// Movies tuple
type Movies = [string, string, string];
//Nationality 
type Nationality =
  |"American"
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
  nationality: Nationality
}


function isActress(data: unknown): data is Actress{
  return (
    typeof data === 'object' && data !== null &&
    "id" in data && typeof data.id === 'number' &&
    "name" in data && typeof data.name === 'string' &&
    "birth_year" in data && typeof data.birth_year === 'number' &&
    "death_year" in data && typeof data.death_year === 'number' &&
    "biography" in data && typeof data.biography === 'string' &&
    "image" in data && typeof data.image === "string" &&
    "most_famous_movies" in data &&
     data.most_famous_movies instanceof Array && 
     data.most_famous_movies.length === 3 &&
     data.most_famous_movies.every(m => typeof m === 'string') &&
     "awards" in data && typeof data.awards === 'string' && 
     "nationality" in data && typeof data.nationality === 'string'
  )
}

async function getActress(id: number) : Promise<Actress | null>{
  try{
const response= await fetch(`http://localhost:3333/actresses/${id}`)
const data: unknown = await response.json();
if(!isActress(data)){
  console.log("Dati non validi")
  return null 
  }
  return data;
  } catch(error){
    if(error instanceof Error){
      console.log('Errore nel recupero dati attrice', error.message)
    } else{
      console.log("Errore sconosciuto", error)
    }
    return null
  }
}

async function getAllActresses(): Promise<Actress[]>{
  try{
const response = await fetch(`http://localhost:3333/actresses`)
if(!response.ok){
  throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`)
}
const data: unknown = await response.json()
if(!(data instanceof Array)){
  throw new Error('Dati non validi/Non è un array')
}
const validActresses = data.filter(actress=> isActress(actress));
return validActresses
  }
 catch(error){
    if(error instanceof Error){
      console.log('Errore nel recupero dati attrice', error.message)
    } else{
      console.log("Errore sconosciuto", error)
    }
    return []
  }
}

async function getActresses(ids: number[]): Promise <(Actress|null)[]> {
  try{
    const promises =ids.map(id=>getActress(id))
    const actresses = await Promise.all(promises)
    return actresses
    } catch(error) {
    if(error instanceof Error){
      console.log('Errore nel recupero dati attrice', error.message)
    } else{
      console.log("Errore sconosciuto", error)
    }
    return []
  }
}