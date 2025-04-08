import { auth, currentUser } from '@clerk/nextjs/server'

export default async function Profile() {
  const { userId } = await auth()

  if (!userId) {
    return <div className='p-5 min-h-screen'>
        <p className=''>Please login to view this page</p>
    </div>
  }

  const user = await currentUser()
  const userFullName = user?.fullName
  const userEmail = user?.emailAddresses[0].emailAddress

  return <div className='p-5 space-y-5'>
    <h2 className='text-lg font-normal'>Welcome! {userFullName}</h2>
    <p>Email : {userEmail}</p>
  </div>
}