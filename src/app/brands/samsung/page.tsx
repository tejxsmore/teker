import { neon } from '@neondatabase/serverless';
import PhoneCard from '@/components/card/PhoneCard';

async function getData() {
  const sql = neon(process.env.DATABASE_URL as string);
  const response = await sql`SELECT * FROM phonedetails WHERE brand_id=2`;
  return response;
}

export default async function Samsung(){
    const data = await getData();
    // console.log(data)

    return <div className='p-5'>
        <div className='space-y-5'>
          {data.map((phone)=>(
            <PhoneCard 
              key={phone.phone_id} 
              id={phone.phone_id} 
              brand={"Samsung"} 
              name={phone.model}
              price={phone.price}
          />
          ))}
        </div>
    </div>
}