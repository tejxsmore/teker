// import { neon } from '@neondatabase/serverless';

// async function getData() {
//   const sql = neon(process.env.DATABASE_URL as string);
//   const response = await sql`SELECT version()`;
//   return response[0].version;
// }

// export default async function Page() {
//   const data = await getData();
//   return <>{data}</>;
// }


export default function Home(){
  return <div className="p-5">
    Home
  </div>
}